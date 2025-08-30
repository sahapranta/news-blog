<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\AppSettings;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Builder;

class NewsApiController extends Controller
{
    public function breaking()
    {
        return AppSettings::get('ticker_articles');
    }

    public function search(Request $request)
    {
        $query = trim(strip_tags($request->query('query')));
        $query = preg_replace('/[-\'`~!@#$%^&*()_|+=?;:\'",.<>\{\}\[\]\\\\\/]/', '', $query);

        if (strlen($query) < 3) {
            return response()->json(['message' => 'Query must be at least 3 characters long'], 400);
        }

        // $articles = Article::search($query)
        //     ->query(fn(Builder $builder) => $builder->with(['category:id,title']))
        //     ->paginate(7)
        //     ->through(fn($article) => [
        //         'id' => $article->id,
        //         'title' => $article->title,
        //         'slug' => $article->slug,
        //         'description' => $article->excerpt,
        //         'category' => $article->category->title,
        //         'time' => $article->time,
        //     ]);

        $articles = Article::query()
            ->with(['category:id,title'])
            ->select('id', 'title', 'slug', 'excerpt', 'category_id', 'created_at')
            ->where(
                fn($q) => $q->where('title', 'like', "%{$query}%")
                    ->orWhere('slug', 'like', "%{$query}%")
                    ->orWhere('excerpt', 'like', "%{$query}%")
                    ->orWhereJsonContains('tags', $query)
            )
            ->latest()
            ->paginate(10)
            ->through(fn($article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'description' => $article->excerpt,
                'category' => $article->category->title,
                'time' => $article->time,
            ]);

        return response()->json($articles);
    }    
}
