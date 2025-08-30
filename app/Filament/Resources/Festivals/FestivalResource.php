<?php

namespace App\Filament\Resources\Festivals;

use App\Filament\Resources\Festivals\Pages\CreateFestival;
use App\Filament\Resources\Festivals\Pages\EditFestival;
use App\Filament\Resources\Festivals\Pages\ListFestivals;
use App\Filament\Resources\Festivals\Pages\ViewFestival;
use App\Filament\Resources\Festivals\Schemas\FestivalForm;
use App\Filament\Resources\Festivals\Schemas\FestivalInfolist;
use App\Filament\Resources\Festivals\Tables\FestivalsTable;
use App\Models\Festival;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class FestivalResource extends Resource
{
    protected static ?string $model = Festival::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return FestivalForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return FestivalInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FestivalsTable::configure($table);
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
            'index' => ListFestivals::route('/'),
            'create' => CreateFestival::route('/create'),
            'view' => ViewFestival::route('/{record}'),
            'edit' => EditFestival::route('/{record}/edit'),
        ];
    }
}
