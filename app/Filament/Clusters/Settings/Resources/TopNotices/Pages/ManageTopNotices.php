<?php

namespace App\Filament\Clusters\Settings\Resources\TopNotices\Pages;

use App\Filament\Clusters\Settings\Resources\TopNotices\TopNoticeResource;
use Filament\Actions\CreateAction;
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
