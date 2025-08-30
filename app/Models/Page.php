<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Database\Factories\PageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    /** @use HasFactory<PageFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'options',
        'meta_title',
        'meta_image',
        'meta_description',
        'meta_keywords',
        'is_published',
        'user_id',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'options' => 'array',
        'meta_keywords' => 'array',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
