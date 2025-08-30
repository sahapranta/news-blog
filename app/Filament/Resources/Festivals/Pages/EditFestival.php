<?php

namespace App\Filament\Resources\Festivals\Pages;

use App\Filament\Resources\Festivals\FestivalResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditFestival extends EditRecord
{
    protected static string $resource = FestivalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
