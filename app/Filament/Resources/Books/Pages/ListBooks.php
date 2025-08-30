<?php

namespace App\Filament\Resources\Books\Pages;

use Filament\Actions\CreateAction;
use App\Filament\Resources\Books\BookResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBooks extends ListRecords
{
    protected static string $resource = BookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
