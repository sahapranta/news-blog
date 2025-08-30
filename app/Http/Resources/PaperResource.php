<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaperResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'version' => $this->version,
            'pdf_url' => $this->getUrl('pdf_url'),
            'thumbnail' => $this->getUrl('thumbnail'),
            'download_count' => $this->download_count,
            'created_at' => $this->created_at,
            'media' => $this->whenLoaded('media', function () {
                return $this->media->map(fn ($media) => [
                    'name' => $media->file_name,
                    'order' => $media->order_column ?? 0,
                    'url' => $media->original_url,
                ])->toArray();
            }),
        ];
    }
}
