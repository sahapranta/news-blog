<?php

namespace App\Filament\Resources\Pages\Pages;

use Filament\Actions\EditAction;
use App\Filament\Resources\Pages\PageResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewPage extends ViewRecord
{
    protected static string $resource = PageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
