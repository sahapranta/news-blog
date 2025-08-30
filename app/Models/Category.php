<?php

namespace App\Models;

use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

// use Laravel\Scout\Searchable;

class Category extends Model
{
    // use Searchable;
    /** @use HasFactory<CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'user_id',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    // protected static function booted(): void
    // {
    //     static::creating(function ($category) {
    //         $category->slug = Str::slug($category->title);
    //     });

    //     static::updating(function ($category) {
    //         $category->slug = Str::slug($category->title);
    //     });
    // }
}
