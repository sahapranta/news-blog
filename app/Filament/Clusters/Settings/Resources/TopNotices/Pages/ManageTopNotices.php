<?php

namespace App\Filament\Clusters\Settings\Resources\TopNotices\Pages;

use Filament\Actions\CreateAction;
use App\Filament\Clusters\Settings\Resources\TopNotices\TopNoticeResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageTopNotices extends ManageRecords
{
    protected static string $resource = TopNoticeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->slideOver()
                ->modalWidth('lg'),
        ];
    }
}
