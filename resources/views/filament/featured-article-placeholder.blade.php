@props(['article', 'small' => false])
@php
    $size = $small ? '65px' : '130px';
@endphp

@if ($article)
    <div class="{{ $small ? 'article-card article-card-small' : 'article-card' }}">
        <img src="{{ $article->image_url }}" alt="image" class="article-image"
            style="width: {{ $size }}; height: {{ $size }};" />
        <div>
            @if ($small)
                <p class="article-title-small">{{ $article->title }}</p>
            @else
                <h1 class="article-title">{{ $article->title }}</h1>
                <div class="article-excerpt">
                    {{ $article->excerpt }}
                </div>
            @endif
            <div class="article-actions">
                <x-filament::icon-button color="danger" label="View" icon="heroicon-o-eye" tag="a"
                    target="_blank" href="{{ route('article.show', ['article' => $article->slug]) }}" tooltip="View" />

                <x-filament::icon-button color="info" icon="heroicon-o-pencil-square"
                    href="{{ route('filament.admin.resources.articles.edit', $article->id) }}" tag="a"
                    label="Edit" tooltip="Edit" />
            </div>
        </div>
    </div>
@else
    <div class="article-card loading">
        <div class="loading-image"></div>
        <div class="loading-content">
            <div class="loading-line" style="width: 75%;"></div>
            <div class="loading-sub">
                <div class="loading-line"></div>
                <div class="loading-line" style="width: 85%;"></div>
                <div class="loading-line" style="width: 66%;"></div>
            </div>
        </div>
    </div>
@endif

<style>
    .article-card {
        display: flex;
        align-items: flex-start;
        gap: 1.5rem;
        /* 24px */
        background-color: #f3f4f6;
        padding: 1rem;
        /* 16px */
    }

    .article-card-small {
        padding: 0.5rem;
        /* 8px */
        gap: 1.5rem;
    }

    .article-image {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        object-fit: cover;
        border-radius: 2px;
    }

    .article-title {
        font-weight: 600;
        font-size: 1.125rem;
        /* text-lg */
        color: #111827;
        margin-bottom: 0.5rem;
    }

    .article-title-small {
        font-weight: 600;
        font-size: 0.875rem;
        /* text-sm */
        color: #111827;
        margin-bottom: 0.5rem;
    }

    .article-excerpt {
        color: #4b5563;
        font-size: 0.875rem;
        line-height: 1.5;
    }

    .article-actions {
        margin-top: 0.75rem;
        display: flex;
        gap: 0.75rem;
    }

    .loading {
        background-color: #f3f4f6;
        padding: 1rem;
    }

    .loading-image {
        background-color: #d1d5db;
        border-radius: 2px;
        display: block;
        width: 160px;
        height: 160px;
        animation: pulse 1.5s infinite;
    }

    .loading-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 0.25rem;
        animation: pulse 1.5s infinite;
    }

    .loading-line {
        height: 1rem;
        background-color: #d1d5db;
        border-radius: 4px;
    }

    .loading-sub {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    @keyframes pulse {

        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0.4;
        }
    }
</style>
