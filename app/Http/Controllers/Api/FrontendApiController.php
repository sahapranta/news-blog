<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use App\Models\TopNotice;
use App\Services\AppSettings;
use App\Http\Controllers\Controller;
use App\Models\Quotation;
use Illuminate\Support\Facades\Cache;

class FrontendApiController extends Controller
{
    public function __invoke()
    {
        return response()->json([
            'topBanner' => $this->getTopNotices(),
            'ticker' => $this->getTicker(),
            'trending' => $this->getTrending(),
            'popular' => $this->getPopular(),
            'quote' => $this->getQuote(),
            'ads' => $this->getAds(),
        ]);
    }

    protected function getQuote(): array
    {
        $selects = ['author', 'body', 'source', 'title', 'type', 'is_active'];

        $quote = Quotation::select($selects)->withinTimeWindow()->active()->first();

        return $quote->only($selects);
    }

    protected function getTrending(): array
    {
        $ids = AppSettings::get(AppSettings::TRENDING_ARTICLES, []);
        $articles = Article::whereIn('id', $ids)
            ->with(['category:id,title'])
            ->select('id', 'title', 'slug', 'featured_image', 'category_id', 'created_at')
            ->get();

        return $articles->map(
            fn($article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'image_url' => $article->image_url,
                'category' => ['title' => $article->category->title],
                'time' => $article->time,
            ]
        )
            ->toArray();
    }

    protected function getPopular(): array
    {
        $ids = AppSettings::get(AppSettings::POPULAR_ARTICLES, []);

        $articles = Article::whereIn('id', $ids)
            ->select('id', 'title', 'slug')
            ->get();

        return $articles->toArray();
    }

    protected function getTicker(): array
    {
        return AppSettings::get(AppSettings::TICKER_ARTICLES, []);
    }

    protected function prepareAds($ads): array|null
    {
        if (!$ads) return null;

        $image = data_get($ads, 'image.0', null);

        if ($image) {
            $image = url('storage/' . $image);
        }

        return [
            ...$ads,
            'image' => $image,
        ];
    }

    protected function getAds(): array
    {
        $verticalAds = AppSettings::get(AppSettings::VERTICAL_ADS, []);
        $topAds = AppSettings::get(AppSettings::TOP_ADS, []);
        $horizontalAds = AppSettings::get(AppSettings::HORIZONTAL_ADS, []);

        $verticalAds = data_get($verticalAds, 0, null);
        $verticalAds = $this->prepareAds($verticalAds);

        $topAds = data_get($topAds, 0, null);
        $topAds = $this->prepareAds($topAds);

        $horizontalAds = array_map(function ($ad) {
            return $this->prepareAds($ad);
        }, $horizontalAds);

        return [
            AppSettings::HORIZONTAL_ADS => $horizontalAds,
            AppSettings::VERTICAL_ADS => $verticalAds,
            AppSettings::TOP_ADS => $topAds
        ];
    }

    protected function getTopNotices(): ?array
    {
        return Cache::remember(
            'top-notice',
            now()->addHours(8),
            function () {
                $topNotice  = TopNotice::currentlyDisplayable()->first();
                return $topNotice ? [
                    'type' => $topNotice->type,
                    'badge' => $topNotice->badge,
                    'message' => $topNotice->message,
                    'dismissible' => $topNotice->dismissible,
                    'link' => [
                        'text' => $topNotice->link_text,
                        'url' => $topNotice->link_url,
                    ],
                ] : null;
            }
        );
    }
}
