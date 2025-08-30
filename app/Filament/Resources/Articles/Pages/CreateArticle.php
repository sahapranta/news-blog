<?php

namespace App\Filament\Resources\Articles\Pages;

use App\Filament\Resources\Articles\ArticleResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CreateArticle extends CreateRecord
{
    // use \App\Filament\Traits\AuthUser;

    protected static string $resource = ArticleResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = Auth::id();

        if (empty($data['featured_image']) && ! empty($data['featured_image_url'])) {
            try {
                $response = Http::get($data['featured_image_url']);

                if ($response->successful()) {
                    $extension = pathinfo(parse_url($data['featured_image_url'], PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                    $filename = 'articles/images/'.Str::uuid().'.'.$extension;

                    Storage::disk('public')->put($filename, $response->body());

                    $data['featured_image'] = $filename;
                }
            } catch (\Exception $e) {
                throw ('Image download failed: '.$e->getMessage());
            }
        }

        return $data;
    }
}
