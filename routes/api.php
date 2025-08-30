<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->name('api.')->group(function () {
    Route::get('/news/breaking', [\App\Http\Controllers\Api\NewsApiController::class, 'breaking'])
        ->name('news.breaking');

    Route::get('/news/suggestions/{article:slug}', [App\Http\Controllers\Api\RelatedArticleController::class, 'index'])
        ->name('news.related');

    Route::get('/news/search', [\App\Http\Controllers\Api\SearchController::class, 'index'])
        ->name('news.search');

    Route::get('/frontend', \App\Http\Controllers\Api\FrontendApiController::class)
        ->name('frontend');

    // Paper
    Route::post('/paper-download/{paper:slug}', [App\Http\Controllers\DownloadController::class, 'paperDownloadLink'])
        ->middleware('throttle:download')
        ->name('paper.download.link');

    // mail subscription
    Route::prefix('subscription')->name('subscription.')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\MailSubscriptionController::class, 'subscribe'])
            ->name('subscribe');
        Route::get('/verify/{token}', [\App\Http\Controllers\Api\MailSubscriptionController::class, 'verify'])
            ->name('verify');
        Route::post('/unsubscribe', [\App\Http\Controllers\Api\MailSubscriptionController::class, 'unsubscribe'])
            ->name('unsubscribe');
        Route::get('/status', [\App\Http\Controllers\Api\MailSubscriptionController::class, 'status'])
            ->name('status');
    });

    // comments
    Route::get('/comments/{article:slug}', [\App\Http\Controllers\Api\CommentApiController::class, 'index'])
        ->name('comments');

    Route::middleware(['auth:sanctum', 'verified', 'throttle:save'])->group(function () {
        Route::post('/comments/{article:slug}/add', [\App\Http\Controllers\Api\CommentApiController::class, 'store'])
            ->name('comments.add');
        Route::put('/comments/{comment}/update', [\App\Http\Controllers\Api\CommentApiController::class, 'update'])
            ->name('comments.update');
        Route::delete('/comments/{comment}', [\App\Http\Controllers\Api\CommentApiController::class, 'remove'])
            ->name('comments.delete');
    });
});
