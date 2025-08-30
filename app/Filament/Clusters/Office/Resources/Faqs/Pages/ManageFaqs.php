<?php

namespace App\Filament\Clusters\Office\Resources\Faqs\Pages;

use App\Filament\Clusters\Office\Resources\Faqs\FaqResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageFaqs extends ManageRecords
{
    protected static string $resource = FaqResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()->slideOver()->modalWidth('md'),
        ];
    }
}
