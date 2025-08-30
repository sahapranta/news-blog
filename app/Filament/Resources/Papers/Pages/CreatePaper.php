<?php

namespace App\Filament\Resources\Papers\Pages;

use App\Filament\Resources\Papers\PaperResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePaper extends CreateRecord
{
    protected static string $resource = PaperResource::class;

    // protected function afterCreate(): void
    // {
    //     if (request()->hasFile('images')) {
    //         foreach (request()->file('images') as $image) {
    //             $this->record
    //                 ->addMedia($image)
    //                 ->toMediaCollection('images');
    //         }
    //     }
    // }
}
