<?php

namespace App\Filament\Resources\Papers\Pages;

use Filament\Actions\CreateAction;
use App\Filament\Resources\Papers\PaperResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPapers extends ListRecords
{
    protected static string $resource = PaperResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
