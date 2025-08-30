<?php

namespace App\Providers;

use App\Models\Article;
use App\Models\Paper;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Relation::enforceMorphMap([
            'article' => Article::class,
            'paper' => Paper::class,
            'book' => Book::class,
        ]);

        RateLimiter::for('save', function (Request $request) {
            return Limit::perMinute(2)
                ->by($request->user()?->id ?: $request->ip())
                ->response(
                    fn(Request $req, array $headers) => response('Too Many Requests, check back after a minute', 429, $headers)
                );
        });

        RateLimiter::for('download', function (Request $request) {
            return Limit::perMinute(6)
                ->by($request->user()?->id ?: $request->ip())
                ->response(
                    fn(Request $req, array $headers) => response('Too Many Requests, check back after a minute', 429, $headers)
                );
        });

        RateLimiter::for('contact', function (Request $request) {
            return Limit::perMinute(1, 15)
                ->by($request->user()?->id ?: $request->ip())
                ->response(
                    fn(Request $req, array $headers) => response('Too Many Requests, please try again after 15 minutes', 429, $headers)
                )
                // ->response(
                //     fn(Request $req, array $headers) => response(view('errors.429', ['retryAfter' => '5 minutes']), 429, $headers)
                // )
            ;
        });
    }
}
