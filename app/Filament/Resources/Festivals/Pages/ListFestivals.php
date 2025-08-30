<?php

namespace App\Filament\Resources\Festivals\Pages;

use App\Filament\Resources\Festivals\FestivalResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFestivals extends ListRecords
{
    protected static string $resource = FestivalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
