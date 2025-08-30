<?php

namespace App\Filament\Resources\Quotations;

use App\Filament\Resources\Quotations\Pages\ManageQuotations;
use App\Models\Quotation;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\ToggleButtons;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class QuotationResource extends Resource
{
    protected static ?string $model = Quotation::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static string|\UnitEnum|null $navigationGroup = 'Settings';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('author'),
                Textarea::make('body')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('title'),
                TextInput::make('source'),
                ToggleButtons::make('type')
                    ->options([
                        'blue' => 'Blue',
                        'yellow' => 'Yellow',
                        'white' => 'White',
                        'green' => 'Green',
                        'red' => 'Red',
                    ])
                    ->colors([
                        'blue' => 'info',
                        'yellow' => 'warning',
                        'white' => 'gray',
                        'green' => 'success',
                        'red' => 'danger',
                    ])
                    ->inline()
                    ->default('blue')
                    ->required(),
                DateTimePicker::make('start'),
                DateTimePicker::make('end'),
                TextInput::make('priority')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->default(true)
                    ->columnSpanFull()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('author')
                    ->searchable(),
                TextColumn::make('source')
                    ->searchable(),
                TextColumn::make('body')
                    ->searchable(),
                TextColumn::make('type')
                    ->searchable(),
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('start')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('end')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('priority')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_active')
                    ->boolean(),
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
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageQuotations::route('/'),
        ];
    }
}
