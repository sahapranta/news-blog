<?php

namespace App\Filament\Resources\Articles\Pages;

use Filament\Actions\ViewAction;
use Filament\Actions\DeleteAction;
use App\Filament\Resources\Articles\ArticleResource;
use App\Filament\Traits\DownloadImage;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditArticle extends EditRecord
{
    use DownloadImage;
    protected static string $resource = ArticleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        if (!empty($this->data['featured_image_url'])) {
            $filename = $this->downloadImageFromUrl($this->data['featured_image_url']);
            $this->record['featured_image'] = $filename;
            $this->record->save();
            unset($this->data['featured_image_url']);
        }
    }
}
