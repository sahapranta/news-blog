<?php

namespace App\Filament\Clusters\Settings\Resources\Settings;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Repeater;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\EditAction;
use App\Filament\Clusters\Settings\Resources\Settings\Pages\ManageSettings;
use Filament\Forms;
use Filament\Tables;
use App\Models\Setting;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use App\Filament\Clusters\Settings\SettingsCluster;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Clusters\Settings\Pages\ManageFrontend;
use App\Filament\Clusters\Settings\Resources\SettingResource\Pages;
use App\Filament\Clusters\Settings\Resources\SettingResource\RelationManagers;

class SettingResource extends Resource
{
    protected static ?string $model = Setting::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationLabel = 'All Settings';

    protected static ?string $cluster = SettingsCluster::class;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->required(),
                TextInput::make('value')
                    ->visible(fn(Get $get) => in_array($get('type'), ['string', 'number', 'boolean']))
                    ->required(fn(Get $get) => in_array($get('type'), ['string', 'number', 'boolean']))
                    ->numeric(fn(Get $get) => $get('type') === 'number'),
                Select::make('type')
                    ->options([
                        'string' => 'String',
                        'number' => 'Number',
                        'boolean' => 'Boolean',
                        'array' => 'Array',
                        'key-value' => 'Key-Value',
                        'tags' => 'Tags',
                    ])
                    ->default('string')
                    ->live()
                    ->required(),
                TextInput::make('description')
                    ->columnSpan(fn(Get $get) => in_array($get('type'), ['array', 'key-value', 'tags']) ? 2 : 1),
                TagsInput::make('options')
                    ->visible(fn(Get $get) => $get('type') === 'tags')
                    ->columnSpanFull(),
                KeyValue::make('options')
                    ->visible(fn(Get $get) => $get('type') === 'key-value')
                    ->columnSpanFull(),
                Repeater::make('options')
                    ->schema([
                        TextInput::make('title')
                            ->prefix('Title')
                            // ->label(false),
                            // ->required()
                            ->hiddenLabel(),
                            TextInput::make('link')
                            ->url()
                            ->prefix('Link')
                            ->hiddenLabel(),
                        Select::make('target')
                            ->options([
                                '_blank' => 'New Tab',
                                '_self' => 'Same Tab',
                                '_parent' => 'Parent Tab',
                                '_top' => 'Top Frame',
                            ])
                            ->default('_self')
                            ->prefix('Target')
                            ->hiddenLabel()
                    ])
                    ->deleteAction(fn(Action $action) => $action->requiresConfirmation())
                    ->visible(fn(Get $get) => $get('type') === 'array')
                    // ->columns(2)
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('key')
                    ->description(fn(Setting $record) => $record->description)
                    ->searchable(),
                TextColumn::make('value'),
                // Tables\Columns\IconColumn::make('is_active')
                //     ->boolean(),
                // Tables\Columns\TextColumn::make('type')
                //     ->searchable(),
                // Tables\Columns\TextColumn::make('description')
                //     ->searchable(),
                // Tables\Columns\TextColumn::make('created_at')
                //     ->dateTime()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),
                // Tables\Columns\TextColumn::make('updated_at')
                //     ->dateTime()
                //     ->sortable()
                //     ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make()
                    ->modalWidth('lg')
                    ->slideOver(),
                // Tables\Actions\DeleteAction::make(),
            ]);
        // ->bulkActions([
        //     Tables\Actions\BulkActionGroup::make([
        //         Tables\Actions\DeleteBulkAction::make(),
        //     ]),
        // ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageSettings::route('/'),
            // 'frontend' => ManageFrontend::route('/frontend'),
        ];
    }
}
