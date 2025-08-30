<?php

namespace App\Models;

use Database\Factories\PaperFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Paper extends Model implements HasMedia
{
    /** @use HasFactory<PaperFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'version',
        'pdf_url',
        'thumbnail',
        'download_count',
    ];

    protected $casts = [
        'download_count' => 'integer',
    ];

    public function getUrl(string $key): ?string
    {
        if (! isset($this->{$key})) {
            return '';
        }

        return url('storage/'.$this->{$key});
    }
}
