<?php

namespace App\Models;

use App\Filament\Forms\Components\RichEditor\RichContentCustomBlocks\FeaturedList;
use Filament\Forms\Components\RichEditor\Models\Concerns\InteractsWithRichContent;
use Filament\Forms\Components\RichEditor\Models\Contracts\HasRichContent;
use Spatie\MediaLibrary\HasMedia;
// use Spatie\Searchable\Searchable;
// use Spatie\Searchable\SearchResult;
// use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Filament\Forms\Components\RichEditor\RichContentRenderer;

class Article extends Model implements HasRichContent
{
    // use Searchable;
    use HasFactory;
    use HasComments;
    use InteractsWithRichContent;

    protected $fillable = [
        'title',
        'subtitle',
        'excerpt',
        'slug',
        'category_id',
        'is_verified',
        'content',
        'user_id',
        'tags',
        'published_at',
        'reading_time',
        'featured_image',
    ];

    public $asYouType = true;


    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            // 'tags' => $this->tags,
            'excerpt' => $this->excerpt,
            'slug' => $this->slug,
        ];
    }


    protected $casts = [
        'published_at' => 'datetime',
        'is_verified' => 'boolean',
        'reading_time' => 'integer',
        'tags' => 'json:unicode',
    ];

    protected $appends = [
        'image_url',
        'time',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }

    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    public function getImageUrlAttribute(): ?string
    {
        if (filter_var($this->featured_image, FILTER_VALIDATE_URL)) {
            return $this->featured_image;
        }

        return $this->featured_image ?
            "/{$this->upload_path}/{$this->featured_image}"
            : $this->placeholderImage();
    }

    public function getTimeAttribute(): ?string
    {
        return $this->created_at?->diffForHumans();
    }

    public function getUploadPathAttribute()
    {
        return 'storage';
    }

    public function placeholderImage(): string
    {
        return '/images/placeholder.svg';
    }

    public function setUpRichContent(): void
    {
        $this->registerRichContent('content')
            // ->fileAttachmentsDirectory('attachments')
            ->fileAttachmentsVisibility('public')
            ->customBlocks([
                FeaturedList::class
            ]);;
    }

    public function getContentHtmlAttribute()
    {
        // return RichContentRenderer::make($this->content)
        //     ->customBlocks([
        //         FeaturedList::class,
        //     ])
        //     ->toHtml();
        return $this->renderRichContent('content');
    }
}
