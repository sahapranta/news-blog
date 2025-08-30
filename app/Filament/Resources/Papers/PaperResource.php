<?php

namespace App\Filament\Resources\Papers;

use App\Filament\Resources\Papers\Pages\CreatePaper;
use App\Filament\Resources\Papers\Pages\EditPaper;
use App\Filament\Resources\Papers\Pages\ListPapers;
use App\Models\Paper;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class PaperResource extends Resource
{
    protected static ?string $model = Paper::class;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::Newspaper;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(5)
                    ->schema([
                        Section::make('General')
                            ->schema([
                                TextInput::make('title')
                                    ->live(true)
                                    ->maxLength(255)
                                    ->afterStateUpdated(fn (Set $set, Get $get, $state) => $get('slug') ?: $set('slug', Str::slug($state)))
                                    ->required(),
                                TextInput::make('slug')
                                    ->unique(Paper::class, 'slug', ignoreRecord: true)
                                    ->maxLength(160)
                                    ->required(),
                                Textarea::make('description')
                                    ->columnSpanFull(),
                            ])->columnSpan(3),
                        Section::make('Media')
                            ->schema([
                                TextInput::make('version')
                                    ->placeholder('Version e.g. 1310')
                                    ->hiddenLabel(),
                                FileUpload::make('pdf_url')
                                    ->label('Upload PDF')
                                    ->directory('papers')
                                    ->acceptedFileTypes(['application/pdf'])
                                    ->columnSpanFull(),
                                FileUpload::make('thumbnail')
                                    ->label('Upload Thumbnail')
                                    ->acceptedFileTypes(['jpg', 'jpeg', 'png'])
                                    ->directory('papers')
                                    ->visibility('public')
                                    ->disk('public')
                                    ->columnSpanFull()
                                    ->image(),
                            ])
                            ->columnSpan(2),
                    ]),
                Section::make('Images')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('images')
                            ->hiddenLabel()
                            ->multiple()
                            ->reorderable()
                            ->collection('papers')
                            ->disk('papers')
                            // ->imagePreviewHeight('250')
                            ->panelLayout('grid')
                            ->acceptedFileTypes(['jpg', 'jpeg', 'png'])
                            ->image(),
                    ])
                    ->collapsible(),
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('version')
                    ->searchable(),
                TextColumn::make('download_count')
                    ->numeric()
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
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
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
            'index' => ListPapers::route('/'),
            'create' => CreatePaper::route('/create'),
            'edit' => EditPaper::route('/{record}/edit'),
        ];
    }
}
