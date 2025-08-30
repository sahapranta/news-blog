<?php

namespace App\Filament\Clusters\Office\Resources\ContactMessages\Pages;

use App\Filament\Clusters\Office\Resources\ContactMessages\ContactMessageResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageContactMessages extends ManageRecords
{
    protected static string $resource = ContactMessageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\CreateAction::make(),
        ];
    }
}
