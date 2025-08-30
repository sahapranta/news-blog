<?php

namespace App\Filament\Clusters\Settings\Resources\Settings\Pages;

use App\Filament\Clusters\Settings\Resources\Settings\SettingResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageSettings extends ManageRecords
{
    protected static string $resource = SettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\CreateAction::make(),
        ];
    }
}
