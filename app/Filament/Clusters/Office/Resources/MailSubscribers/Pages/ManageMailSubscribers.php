<?php

namespace App\Filament\Clusters\Office\Resources\MailSubscribers\Pages;

use App\Filament\Clusters\Office\Resources\MailSubscribers\MailSubscriberResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageMailSubscribers extends ManageRecords
{
    protected static string $resource = MailSubscriberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
