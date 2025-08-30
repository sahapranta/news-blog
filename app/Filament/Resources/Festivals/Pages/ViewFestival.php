<?php

namespace App\Filament\Resources\Festivals\Pages;

use App\Filament\Resources\Festivals\FestivalResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewFestival extends ViewRecord
{
    protected static string $resource = FestivalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
