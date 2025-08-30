<?php

namespace App\Filament\Clusters\Office\Resources\ContactMessages;

use App\Filament\Clusters\Office\OfficeCluster;
use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\ViewAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use App\Filament\Clusters\Office\Resources\ContactMessages\Pages\ManageContactMessages;
use App\Models\ContactMessage;
use Filament\Forms\Components\Select;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static string | \BackedEnum | null $navigationIcon = Heroicon::OutlinedEnvelope;

    protected static ?string $cluster = OfficeCluster::class;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->hiddenOn('edit')
                    ->required(),
                TextInput::make('email')
                    ->hiddenOn('edit')
                    ->email(),
                TextInput::make('phone')
                    ->hiddenOn('edit')
                    ->tel(),
                TextInput::make('subject')
                    ->hiddenOn('edit')
                    ->columnSpanFull(),
                Textarea::make('message')
                    ->rows(8)
                    ->hiddenOn('edit')
                    ->columnSpanFull(),
                TextInput::make('category'),
                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'Unavailable' => 'Unavailable',
                        'resolved' => 'Resolved',
                        'spam' => 'Spam',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),
                TextInput::make('ip_address')
                    ->hiddenOn('edit'),
                Textarea::make('comment')
                    ->rows(5)
                    ->hiddenOn('view')
                    ->columnSpanFull(),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('phone')
                    ->searchable(),
                TextColumn::make('subject')->limit(30),
                TextColumn::make('category')
                    ->searchable(),
                TextColumn::make('status')
                    ->badge()
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make()->slideOver(),
                EditAction::make()->slideOver()->modalWidth('md'),
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
            'index' => ManageContactMessages::route('/'),
        ];
    }
}
