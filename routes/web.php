<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\NewsController::class, 'home'])->name('home');
Route::get('/news/{article:slug}', [App\Http\Controllers\NewsController::class, 'news'])->name('article.show');
Route::get('/category/{category:slug}', [App\Http\Controllers\NewsController::class, 'category'])->name('category.show');
Route::get('/categories', [App\Http\Controllers\NewsController::class, 'categories'])->name('categories');
Route::get('/bangladesh', [App\Http\Controllers\NewsController::class, 'bangladesh'])->name('bangladesh');
Route::get('/international', [App\Http\Controllers\NewsController::class, 'international'])->name('international');
Route::get('/membership', [App\Http\Controllers\MembershipController::class, 'membership'])->name('membership');
Route::get('/membership-status', [App\Http\Controllers\MembershipController::class, 'membershipStatus'])->name('membership-status');

Route::get('/paper', [App\Http\Controllers\PaperController::class, 'index'])->name('paper.index');
Route::get('/paper/{paper:slug}', [App\Http\Controllers\PaperController::class, 'view'])->name('paper.show');

Route::get('/paper-download/{paper:slug}', [App\Http\Controllers\DownloadController::class, 'paper'])
    ->middleware('throttle:download')
    ->name('paper.download');

Route::get('/paper-download-link/{paper:slug}', [App\Http\Controllers\PaperController::class, 'download'])
    ->middleware(['signed', 'throttle:download'])
    ->name('paper.download.url');

Route::get('/festival', [App\Http\Controllers\EventsController::class, 'index'])->name('festival.index');

Route::get('/books', [App\Http\Controllers\BooksController::class, 'index'])->name('book.index');
Route::get('/book/{slug}', [App\Http\Controllers\BooksController::class, 'read'])->name('book.show');

Route::inertia('/profile', 'ProfilePage')->name('profile');

foreach (
    [
        'about' => 'about',
        'contact' => 'contact',
        'faq' => 'faq',
        'app_download' => 'app-download',
        'privacy_policy' => 'privacy-policy',
        'cookie_policy' => 'cookie-policy',
        'usage_policy' => 'usage-policy',
        'thank_you' => 'thank-you',
    ] as $page => $url
) {
    Route::get("/{$url}", [App\Http\Controllers\PagesController::class, $page])
        ->name($page);
}

Route::middleware(['throttle:contact'])->group(function () {
    Route::post('/contact', App\Http\Controllers\ContactController::class)->name('contact.store');
});

Route::get('/page/{page:slug}', [App\Http\Controllers\PagesController::class, 'page'])->name('page');

Route::inertia('/blank', 'BlankPage')->name('blank');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Admin/dashboard');
    })->name('dashboard');

    // Route::prefix('admin')->name('admin.')->group(function () {
    //     Route::get('articles', [App\Http\Controllers\Admin\ArticleController::class, 'index'])->name('articles.index');
    //     // Route::get('articles/create', [App\Http\Controllers\Admin\ArticleController::class, 'create'])->name('articles.create');
    //     // Route::post('articles', [App\Http\Controllers\Admin\ArticleController::class, 'store'])->name('articles.store');
    //     // Route::get('articles/{article}/edit', [App\Http\Controllers\Admin\ArticleController::class, 'edit'])->name('articles.edit');
    //     // Route::put('articles/{article}', [App\Http\Controllers\Admin\ArticleController::class, 'update'])->name('articles.update');
    //     // Route::delete('articles/{article}', [App\Http\Controllers\Admin\ArticleController::class, 'destroy'])->name('articles.destroy');

    //     // Other admin routes...
    // });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
