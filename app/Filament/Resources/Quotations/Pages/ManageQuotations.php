<?php

namespace App\Filament\Resources\Quotations\Pages;

use Filament\Actions\CreateAction;
use App\Filament\Resources\Quotations\QuotationResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageQuotations extends ManageRecords
{
    protected static string $resource = QuotationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
