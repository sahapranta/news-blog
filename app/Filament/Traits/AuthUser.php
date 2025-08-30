<?php

namespace App\Filament\Traits;

use Illuminate\Support\Facades\Auth;

trait AuthUser
{
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = Auth::id();

        return $data;
    }
}
