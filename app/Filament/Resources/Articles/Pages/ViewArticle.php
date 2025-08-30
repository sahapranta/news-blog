<?php

namespace App\Filament\Resources\Articles\Pages;

use Filament\Actions\EditAction;
use App\Filament\Resources\Articles\ArticleResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewArticle extends ViewRecord
{
    protected static string $resource = ArticleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
