<?php

namespace App\Filament\Resources\Articles;

use App\Filament\Resources\Articles\Pages\CreateArticle;
use App\Filament\Resources\Articles\Pages\EditArticle;
use App\Filament\Resources\Articles\Pages\ListArticles;
use App\Filament\Resources\Articles\Pages\ViewArticle;
use App\Filament\Traits\AiDescription;
use App\Models\Article;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ArticleResource extends Resource
{
    use AiDescription;

    protected static ?string $model = Article::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make([
                    'md' => 5,
                ])
                    ->schema([
                        Section::make()
                            ->schema([
                                TextInput::make('title')
                                    ->maxLength(255)
                                    ->live(true)
                                    ->afterStateUpdated(fn (Set $set, Get $get, $state) => $get('slug') ?: $set('slug', Str::slug($state)))
                                    ->required(),
                                TextInput::make('slug')
                                    ->unique(Article::class, 'slug', ignoreRecord: true)
                                    ->maxLength(160)
                                    ->required(),
                                TextInput::make('subtitle')
                                    ->maxLength(255)
                                    ->placeholder('Optional subtitle'),
                                TagsInput::make('tags'),
                                Group::make([
                                    Select::make('category_id')
                                        ->relationship('category', 'title')
                                        ->searchable()
                                        ->preload()
                                        ->required(),
                                    TextInput::make('reading_time')
                                        ->numeric()
                                        ->placeholder('in minutes'),
                                    Toggle::make('is_verified')
                                        ->label('Verified')
                                        ->inline(false)
                                        ->required()
                                        ->hiddenOn('create'),
                                ])->columns(3),
                            ])
                            ->columnSpan(3),
                        Section::make()
                            ->schema([
                                FileUpload::make('featured_image')
                                    ->directory('articles/images')
                                    ->visibility('public')
                                    ->disk('public')
                                    ->nullable()
                                    ->image(),
                                TextInput::make('featured_image_url')
                                    ->label('Image URL')
                                    ->url()
                                    ->nullable(),
                                Textarea::make('excerpt')
                                    ->label('Short Description')
                                    ->hintAction(
                                        Action::make('Generate')
                                            ->icon(Heroicon::ArrowPath)
                                            ->action(function (Get $get, Set $set) {
                                                $description = strip_tags($get('content'));
                                                $set('excerpt', self::makeMetaDescription($description));
                                            })
                                    )
                                    ->maxLength(255)
                                    ->rows(3),
                            ])
                            ->columnSpan(2),
                        Section::make('Content')
                            ->schema([
                                RichEditor::make('content')
                                    ->hiddenLabel()
                                    ->required()
                                    ->fileAttachmentsDirectory('attachments')
                                    ->columnSpanFull(),
                            ])
                            ->compact()
                            ->collapsible()
                            ->columnSpan(5),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('author.name'),
                TextColumn::make('category.title')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_verified')
                    ->boolean(),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
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
                Action::make('Preview')
                    ->icon(Heroicon::ArrowTopRightOnSquare)
                    ->url(fn (Article $record) => route('article.show', $record->slug), true),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
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
            'index' => ListArticles::route('/'),
            'create' => CreateArticle::route('/create'),
            'view' => ViewArticle::route('/{record}'),
            'edit' => EditArticle::route('/{record}/edit'),
        ];
    }
}
