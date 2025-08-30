<?php

namespace App\Filament\Clusters\Settings\Pages;

use Throwable;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Actions\Action;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Group;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Components\Toggle;
use Filament\Forms;
use App\Models\Setting;
use Filament\Forms\Get;
use Filament\Pages\Page;
use App\Services\AppSettings;
use App\Filament\Clusters\Settings\SettingsCluster;
use Illuminate\Support\Facades\App;
use Filament\Notifications\Notification;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Support\Icons\Heroicon;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class AdsBanner extends Page
{
    use InteractsWithForms;

    protected static string | \BackedEnum | null $navigationIcon = Heroicon::ArrowDownOnSquareStack;

    protected string $view = 'filament.clusters.settings.pages.ads-banner';

    protected static ?string $cluster = SettingsCluster::class;

    public array $horizontal_ads = [];
    public array $vertical_ads = [];
    public array $top_ads = [];

    public function mount(): void
    {
        $this->horizontal_ads = AppSettings::get(AppSettings::HORIZONTAL_ADS, []);
        $this->vertical_ads = AppSettings::get(AppSettings::VERTICAL_ADS, []);
        $this->top_ads = AppSettings::get(AppSettings::TOP_ADS, []);
    }

    public function saveHorizontalAds(): void
    {
        $this->saveData(AppSettings::HORIZONTAL_ADS);
    }

    public function saveVerticalAds(): void
    {
        $this->saveData(AppSettings::VERTICAL_ADS);
    }

    public function saveTopAds(): void
    {
        $this->saveData(AppSettings::TOP_ADS);
    }

    protected function saveData(string $key = 'horizontal_ads'): void
    {
        try {
            $settings = Setting::key($key)->first();
            $value = [];

            foreach ($this->{$key} as $ad) {
                if (isset($ad['image']) && is_array($ad['image'])) {
                    $imageFile = reset($ad['image']);

                    if ($imageFile instanceof TemporaryUploadedFile) {
                        $storedPath = $imageFile->store('ads', 'public');
                        $ad['image'] = [$storedPath];
                    }
                } elseif (isset($ad['image']) && is_string($ad['image'])) {
                    // Image is already a string path, keep it as is
                    // This handles cases where the image was previously uploaded
                } else {
                    $ad['image'] = null;
                }

                $value[] = $ad;
            }

            $settings->value = count($value);
            $settings->options = $value;
            $settings->save();

            AppSettings::flushCache();
            Notification::make()
                ->title('Banner saved successfully')
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

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Horizontal Banner Ads')
                    ->description('Choose horizontal banner ads')
                    ->headerActions([
                        Action::make('save-banner-ads')
                            ->icon('heroicon-o-bookmark-square')
                            ->label('Save')
                            ->color('info')
                            ->action('saveHorizontalAds'),
                    ])
                    ->schema([
                        Repeater::make('horizontal_ads')
                            ->schema([
                                FileUpload::make('image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('ads')
                                    ->visibility('public')
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
                                    ->maxSize(2048), // 2MB max
                                TextInput::make('url')
                                    ->url(),
                                Group::make()
                                    ->schema([
                                        TextInput::make('title'),
                                        TextInput::make('index')
                                            ->numeric()
                                            ->default(1),
                                        ToggleButtons::make('position')
                                            ->options([
                                                'before' => 'Before',
                                                'after' => 'After',
                                            ])
                                            ->default('after')
                                            ->inline(),
                                    ])->columns(3),
                                Toggle::make('active')
                                    ->label('Active')
                                    ->default(true),
                            ])
                            ->itemLabel(fn(array $state) => $state['title'] ?? 'Banner Item')
                            ->collapseAllAction(fn(Action $action) => $action->hidden())
                            ->expandAllAction(fn(Action $action) => $action->hidden())
                            ->maxItems(8)
                            ->collapsed()
                            ->hiddenLabel()
                    ]),
                Section::make('Top Ads')
                    ->description('Choose top ads')
                    ->headerActions([
                        Action::make('save-banner-ads')
                            ->icon('heroicon-o-bookmark-square')
                            ->label('Save')
                            ->color('info')
                            ->action('saveTopAds'),
                    ])
                    ->schema([
                        Repeater::make('top_ads')
                            ->schema([
                                FileUpload::make('image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('ads')
                                    ->visibility('public')
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
                                    ->maxSize(2048), // 2MB max
                                Group::make()
                                    ->schema([
                                        Group::make()
                                            ->schema([
                                                TextInput::make('link_title'),
                                                TextInput::make('url')
                                                    ->url()
                                                    ->columnSpan(3),
                                            ])
                                            ->columns(4),
                                        TextInput::make('title')
                                            ->placeholder('Title')
                                            ->hiddenLabel(),
                                        TextInput::make('description')
                                            ->placeholder('Description...')
                                            ->hiddenLabel(),
                                        Toggle::make('active')
                                            ->label('Active')
                                            ->default(true)
                                            ->columnSpanFull(),
                                        Toggle::make('dismissible')
                                            ->label('Dismissible')
                                            ->default(true)
                                            ->columnSpanFull(),
                                    ])->columnSpan(2),
                            ])
                            ->columns(3)
                            ->hiddenLabel()
                            ->maxItems(1)
                    ]),
                Section::make('Vertical Banner Ads')
                    ->description('Choose vertical banner ads for sidebar')
                    ->headerActions([
                        Action::make('save-banner-ads')
                            ->icon('heroicon-o-bookmark-square')
                            ->label('Save')
                            ->color('info')
                            ->action('saveVerticalAds'),
                    ])
                    ->schema([
                        Repeater::make('vertical_ads')
                            ->schema([
                                Group::make()
                                    ->schema([
                                        TextInput::make('title'),
                                        TextInput::make('url')
                                            ->url(),
                                        ToggleButtons::make('target')
                                            ->label('Open in')
                                            ->options([
                                                '_self' => 'Same Tab',
                                                '_blank' => 'New Tab',
                                                '_parent' => 'Parent Tab',
                                                '_top' => 'Top Frame',
                                            ])
                                            ->inline()
                                            ->default('_self'),
                                        Toggle::make('active')
                                            ->label('Active')
                                            ->default(true),
                                    ])->columnSpan(3),
                                FileUpload::make('image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('ads')
                                    ->visibility('public')
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
                                    ->maxSize(2048)
                                    ->hiddenLabel(), // 2MB max                                
                            ])                            
                            ->columns(4)
                            ->maxItems(1)
                            ->collapsible()
                            ->hiddenLabel()
                    ]),
            ]);
    }
}
