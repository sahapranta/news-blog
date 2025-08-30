<?php

namespace App\Filament\Traits;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait DownloadImage
{
    protected function downloadImageFromUrl(
        string $image_url,
        string $download_path = 'articles/images/',
        string $disk = 'public'
    ): ?string {
        $response = Http::get($image_url);

        if ($response->successful()) {
            $extension = pathinfo(parse_url($image_url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
            $filename = $download_path.Str::ulid().'.'.$extension;

            Storage::disk($disk)->put($filename, $response->body());

            return $filename;
        }

        return null;
    }
}
