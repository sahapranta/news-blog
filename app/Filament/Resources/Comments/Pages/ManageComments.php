<?php

namespace App\Filament\Resources\Comments\Pages;

use Filament\Actions\CreateAction;
use Filament\Actions;
use App\Filament\Resources\Comments\CommentResource;
use Filament\Resources\Pages\ManageRecords;
use App\Filament\Resources\Comments\Widgets\CommentOverview;

class ManageComments extends ManageRecords
{
    protected static string $resource = CommentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            CommentOverview::class,
        ];
    }
}
