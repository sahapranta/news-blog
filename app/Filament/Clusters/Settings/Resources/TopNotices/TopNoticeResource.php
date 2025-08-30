<?php

namespace App\Filament\Clusters\Settings\Resources\TopNotices;

use App\Filament\Clusters\Settings\Resources\TopNotices\Pages\ManageTopNotices;
use App\Filament\Clusters\Settings\SettingsCluster;
use App\Models\TopNotice;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class TopNoticeResource extends Resource
{
    protected static ?string $model = TopNotice::class;

    protected static ?string $cluster = SettingsCluster::class;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::BookmarkSquare;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('message')
                    ->required()
                    ->columnSpanFull(),
                Select::make('type')
                    ->options([
                        'success' => 'Success',
                        'info' => 'Info',
                        'warning' => 'Warning',
                        'error' => 'Error',
                    ])
                    ->default('success')
                    ->required(),
                TextInput::make('badge')
                    ->placeholder('NEW | SPECIAL | IMPORTANT'),
                TextInput::make('link_text'),
                TextInput::make('link_url')
                    ->url(),
                DateTimePicker::make('start'),
                DateTimePicker::make('end'),
                TextInput::make('priority')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('dismissible')
                    ->required()
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->hiddenOn('create')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('badge')
                    ->searchable(),
                TextColumn::make('message')
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
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make()
                    ->slideOver()
                    ->modalWidth('lg'),
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
            'index' => ManageTopNotices::route('/'),
        ];
    }
}
