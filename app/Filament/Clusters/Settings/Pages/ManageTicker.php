<?php

namespace App\Filament\Clusters\Settings\Pages;

use App\Filament\Clusters\Settings\SettingsCluster;
use App\Models\Article;
use App\Models\Setting;
use App\Services\AppSettings;
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Throwable;

class ManageTicker extends Page
{
    use InteractsWithForms;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::Ticket;

    protected string $view = 'filament.clusters.settings.pages.manage-ticker';

    protected static ?string $cluster = SettingsCluster::class;

    public ?array $options = [];

    public bool $is_active = false;

    public function mount(): void
    {
        $settings = Setting::key(AppSettings::TICKER_ARTICLES)->first();
        if ($settings) {
            $this->options = $settings->options;
            $this->is_active = $settings->is_active;
        }
    }

    public function saveData(): void
    {
        try {
            $settings = Setting::key(AppSettings::TICKER_ARTICLES)->first();
            $options = [];

            foreach ($this->options as $option) {
                $options[] = $option;
            }

            $settings->options = $options;
            $settings->is_active = $this->is_active;

            $settings->save();
            Notification::make()
                ->title('Ticker news saved')
                ->body('Ticker news has been saved.')
                ->success()
                ->send();
        } catch (Throwable $th) {
            Notification::make()
                ->title('Something went wrong!')
                ->body($th->getMessage())
                ->danger()
                ->send();
        }
    }

    protected function findArticle(string $title): ?Article
    {
        $article = Article::where('title', 'like', "%$title%")->first();

        if (! $article) {
            Notification::make()
                ->title('Article not found')
                ->body("We couldn't find an article with the title <strong>$title</strong>.")
                ->warning()
                ->send();
        }

        return $article;
    }

    public function targets(): array
    {
        return [
            '_blank' => 'New Tab',
            '_self' => 'Same Tab',
            '_parent' => 'Parent Tab',
            '_top' => 'Top Frame',
        ];
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Ticker News')
                    ->description('Add ticker news as title and link')
                    ->headerActions([
                        Action::make('add-item')
                            ->icon('heroicon-o-bookmark-square')
                            ->label('Save')
                            ->color('info')
                            ->action('saveData'),
                    ])
                    ->schema([
                        Toggle::make('is_active')
                            ->label('Enable Ticker'),
                        Repeater::make('options')
                            ->schema([
                                TextInput::make('title')
                                    ->suffixAction(
                                        fn ($state, Set $set) => Action::make('search-article')
                                            ->label('Search')
                                            ->icon('heroicon-o-magnifying-glass')
                                            ->action(function () use ($state, $set) {
                                                $article = $this->findArticle($state);
                                                if ($article) {
                                                    $set('link', route('article.show', ['article' => $article->slug]));
                                                    $set('title', $article->title);
                                                    $set('out', false);
                                                }
                                            })
                                    )
                                    ->inlineLabel()
                                    ->required(),
                                TextInput::make('link')
                                    ->url()
                                    ->inlineLabel(),
                                Toggle::make('out')
                                    ->label('External Link')
                                    ->default(false)
                                    ->inline()
                                    ->live()
                                    ->inlineLabel(),
                                ToggleButtons::make('target')
                                    ->label('Open in')
                                    ->options($this->targets())
                                    ->inline()
                                    ->inlineLabel()
                                    ->visible(fn (Get $get) => $get('out'))
                                    ->default('_self'),
                            ])
                            ->itemLabel(fn (array $state) => $state['title'] ?? 'New Item')
                            ->collapseAllAction(fn (Action $action) => $action->hidden())
                            ->expandAllAction(fn (Action $action) => $action->hidden())
                            ->collapsed()
                            ->truncateItemLabel()
                            ->maxItems(10)
                            ->minItems(1)
                            ->hiddenLabel()
                            ->defaultItems(1)
                            ->deleteAction(fn (Action $action) => $action->requiresConfirmation()),
                    ]),
            ]);
    }
}
