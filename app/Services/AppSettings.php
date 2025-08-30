<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

class AppSettings
{
    const TRENDING_ARTICLES = 'trending_articles';
    const POPULAR_ARTICLES = 'popular_articles';
    const TICKER_ARTICLES = 'ticker_articles';
    const FEATURED_ARTICLE = 'featured_article';
    const HORIZONTAL_ADS = 'horizontal_ads';
    const VERTICAL_ADS = 'vertical_ads';
    const TOP_ADS = 'top_ads';

    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = self::settings($key);

        return $setting ?? $default;
    }

    public static function cacheKey(): string
    {
        return 'app-settings';
    }

    public static function flushCache(): void
    {
        Cache::forget(self::cacheKey());
    }

    public static function settings(?string $key = null, bool $flush = false)
    {
        if ($flush) {
            Cache::forget(self::cacheKey());
        }

        $settings = Cache::remember(
            self::cacheKey(),
            now()->addMinutes(60),
            fn() => self::allSettingsAsArray()
        );

        if ($key) {
            return $settings[$key] ?? null;
        }

        return $settings;
    }

    public static function allSettingsAsArray(): array
    {
        return Setting::active()
            ->select('key', 'value', 'type', 'options')
            ->get()
            ->mapWithKeys(fn(Setting $setting) => self::mapSetting($setting))
            ->toArray();
    }

    private static function mapSetting(Setting $setting): array
    {
        if ($setting->type == 'boolean') {
            return [$setting->key => boolval($setting->value)];
        } else if (in_array($setting->type, ['array', 'key-value', 'tags'])) {
            return [$setting->key => $setting->options];
        } else {
            return [$setting->key => $setting->value];
        }
    }
}
