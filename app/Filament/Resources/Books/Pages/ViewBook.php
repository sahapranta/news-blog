<?php

namespace App\Filament\Resources\Books\Pages;

use Filament\Actions\EditAction;
use App\Filament\Resources\Books\BookResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewBook extends ViewRecord
{
    protected static string $resource = BookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
