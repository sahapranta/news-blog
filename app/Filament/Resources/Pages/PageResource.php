<?php

namespace App\Filament\Resources\Pages;

use App\Filament\Resources\Pages\Pages\CreatePage;
use App\Filament\Resources\Pages\Pages\EditPage;
use App\Filament\Resources\Pages\Pages\ListPages;
use App\Filament\Resources\Pages\Pages\ViewPage;
use App\Models\Page;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->live(true)
                    ->maxLength(255)
                    ->afterStateUpdated(fn (Set $set, Get $get, $state) => $get('slug') ?: $set('slug', Str::slug($state)))
                    ->required(),
                TextInput::make('slug')
                    ->unique(Page::class, 'slug', ignoreRecord: true)
                    ->maxLength(200)
                    ->required(),
                Toggle::make('is_published')
                    ->label('Published')
                    ->default(true)
                    ->inline(false)
                    ->visibleOn('edit')
                    ->columnSpanFull()
                    ->required(),
                RichEditor::make('content')
                    ->fileAttachmentsDirectory('pages')
                    ->fileAttachmentsVisibility('public')
                    ->required()
                    ->columnSpanFull(),
                Section::make('SEO')
                    ->description('Meta tags are used to help search engines understand your content.')
                    ->collapsed()
                    ->schema([
                        TextInput::make('meta_title')->maxLength(160),
                        FileUpload::make('meta_image')
                            ->image(),
                        Textarea::make('meta_description')
                            ->maxLength(200),
                        TagsInput::make('meta_keywords'),
                    ]),
                Section::make('Settings')
                    ->description('Configure the page settings.')
                    ->collapsed()
                    ->schema([
                        KeyValue::make('options')
                            ->reorderable(),
                    ]),
                // Forms\Components\Select::make('user_id')
                //     ->relationship('user', 'name')
                //     ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->url(fn (Page $page) => route('page', $page->slug), true)
                    ->searchable(),
                IconColumn::make('is_published')
                    ->label('Published')
                    ->boolean(),
                TextColumn::make('user.name'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
                Action::make('Preview')
                    ->icon(Heroicon::RocketLaunch)
                    ->url(fn (Page $page) => route('page', $page->slug), true),
            ]);
        // ->toolbarActions([
        //     BulkActionGroup::make([
        //         DeleteBulkAction::make(),
        //     ]),
        // ])
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPages::route('/'),
            'create' => CreatePage::route('/create'),
            'view' => ViewPage::route('/{record}'),
            'edit' => EditPage::route('/{record}/edit'),
        ];
    }
}
