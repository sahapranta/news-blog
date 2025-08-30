<?php

namespace App\Filament\Resources\Festivals\Pages;

use App\Filament\Resources\Festivals\FestivalResource;
use App\Filament\Traits\AuthUser;
use Filament\Resources\Pages\CreateRecord;

class CreateFestival extends CreateRecord
{
    use AuthUser;

    protected static string $resource = FestivalResource::class;
}
