<?php

namespace App\Filament\Resources\Articles\Pages;

use Filament\Actions\CreateAction;
use App\Filament\Resources\Articles\ArticleResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListArticles extends ListRecords
{
    protected static string $resource = ArticleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
