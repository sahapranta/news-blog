<?php

namespace App\Filament\Clusters\Settings\Pages;

use Filament\Schemas\Components\Grid;
use Throwable;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Actions\Action;
use Filament\Forms\Components\Select;
use App\Filament\Clusters\Settings\SettingsCluster;
use App\Models\Article;
use App\Models\Setting;
use App\Services\AppSettings;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Infolists\Components\TextEntry;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;

class ManageTrending extends Page
{
    use InteractsWithForms;

    protected static string | \BackedEnum | null $navigationIcon = Heroicon::ArrowTrendingUp; // 'heroicon-o-document-text'

    protected string $view = 'filament.clusters.settings.pages.manage-trending';

    protected static ?string $cluster = SettingsCluster::class;

    protected static ?string $title = 'Trending News';

    public ?array $trending = [];
    public ?array $popular = [];
    public ?string $featured = '';
    public ?Article $featuredArticle = null;

    public function mount(): void
    {
        $settingKeys = [
            AppSettings::FEATURED_ARTICLE,
            AppSettings::TRENDING_ARTICLES,
            AppSettings::POPULAR_ARTICLES,
        ];

        $settings = Setting::whereIn('key', $settingKeys)->get()->keyBy('key');

        $this->featured = $settings[AppSettings::FEATURED_ARTICLE]->value ?? '';
        $this->trending = $settings[AppSettings::TRENDING_ARTICLES]->options ?? [];
        $this->popular = $settings[AppSettings::POPULAR_ARTICLES]->options ?? [];

        $this->fetchFeaturedArticle();
    }

    protected function fetchFeaturedArticle(): void
    {
        $this->featuredArticle = $this->featured
            ? Article::find($this->featured)
            : null;
    }

    public function listArticles($key = 'trending'): array
    {
        $articles = Article::whereIn('id', $this->{$key})->get();

        if ($articles->isEmpty()) return [];

        $placeholders = [];

        foreach ($articles as $article) {
            $placeholders[] = TextEntry::make('article' . $article->id)
                ->view('filament.featured-article-placeholder', ['article' => $article, 'small' => true]);
        }

        if (count($articles) > 1) {
            return [
                Grid::make([
                    'sm' => 1,
                    'md' => 1,
                    'xl' => 2,
                ])
                    ->schema([
                        ...$placeholders,
                    ])
            ];
        }

        return $placeholders;
    }

    public function saveFeaturedArticle(): void
    {
        try {
            Setting::key(AppSettings::FEATURED_ARTICLE)->update(['value' => $this->featuredArticle->id]);
            Notification::make()
                ->title('Featured article saved')
                ->body('Featured article has been saved.')
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

    public function savePopular(): void
    {
        $this->saveData('popular');
    }

    public function saveTrending(): void
    {
        $this->saveData('trending');
    }

    public function saveData($key = 'trending'): void
    {
        $k = $key === 'trending' ? AppSettings::TRENDING_ARTICLES : AppSettings::POPULAR_ARTICLES;

        try {
            $settings = Setting::key($k)->first();

            $value = [];
            foreach ($this->{$key} as $article) {
                $value[] = $article;
            }
            $settings->value = count($value);
            $settings->options = $value;
            $settings->save();
            Notification::make()
                ->title(ucfirst($key) . ' news saved')
                ->body('The news has been saved.')
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

    public function getDefaultOptions(): array
    {
        if ($this->featuredArticle) {
            return [$this->featuredArticle->id => $this->featuredArticle->title];
        }

        return [];
    }

    public static function getSearchResult(?string $search): array
    {
        return Article::where('title', 'like', "%$search%")
            ->limit(10)
            ->pluck('title', 'id')
            ->toArray();
    }


    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Featured Article')
                    ->description('Choose featured article')
                    ->headerActions([
                        Action::make('save-featured-article')
                            ->icon('heroicon-o-check')
                            ->label('Save')
                            ->color('info')
                            ->action('saveFeaturedArticle'),
                    ])
                    ->schema([
                        Select::make('featured')
                            ->options($this->getDefaultOptions())
                            ->getSearchResultsUsing(fn(string $search): array => self::getSearchResult($search))
                            ->searchable()
                            ->live()
                            ->afterStateUpdated(fn() => $this->fetchFeaturedArticle())
                            ->required()
                            ->hiddenLabel(),
                        TextEntry::make('placeholder')
                            ->view('filament.featured-article-placeholder', ['article' => $this->featuredArticle])
                    ]),
                Section::make('Trending News')
                    ->description('Choose Trending news')
                    ->schema([
                        Select::make('trending')
                            ->options(function ($get) {
                                $selected = collect($get('trending') ?? []);
                                return Article::whereIn('id', $selected)
                                    ->pluck('title', 'id')
                                    ->toArray();
                            })
                            ->getSearchResultsUsing(fn(string $search): array => self::getSearchResult($search))                            
                            ->multiple()
                            ->searchable()
                            ->searchDebounce(750)
                            ->required()
                            ->hiddenLabel(),
                        ...$this->listArticles('trending'),
                    ])
                    ->headerActions([
                        Action::make('add-item')
                            ->icon('heroicon-o-bookmark-square')
                            ->label('Save')
                            ->color('info')
                            ->action('saveTrending'),
                    ]),
                Section::make('Popular News')
                    ->description('Choose popular news')
                    ->schema([
                        Select::make('popular')
                            ->options(function ($get) {
                                $selected = collect($get('popular') ?? []);
                                return Article::whereIn('id', $selected)
                                    ->pluck('title', 'id')
                                    ->toArray();
                            })
                            ->getSearchResultsUsing(fn(string $search): array => self::getSearchResult($search))                            
                            ->multiple()
                            ->searchable()
                            ->searchDebounce(750)
                            ->required()
                            ->hiddenLabel(),
                        ...$this->listArticles('popular'),
                    ])
                    ->headerActions([
                        Action::make('add-item')
                            ->icon('heroicon-o-bookmark-square')
                            ->label('Save')
                            ->color('info')
                            ->action('savePopular'),
                    ]),

            ]);
    }
}
