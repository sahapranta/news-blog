<?php

namespace App\Http\Controllers\Api;

use App\Models\Book;
use App\Models\Article;
use App\Models\Category;
use App\Models\Festival;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use ProtoneMedia\LaravelCrossEloquentSearch\Search;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = trim(strip_tags($request->query('query')));
        $query = preg_replace('/[-\'`~!@#$%^&*()_|+=?;:\'",.<>\{\}\[\]\\\\\/]/', '', $query);

        if (strlen($query) < 3) {
            return response()->json(['message' => 'Query must be at least 3 characters long'], 400);
        }

        $results = Search::add(Article::select('id', 'title', 'slug'), ['title', 'excerpt'])
            ->add(Book::select('id', 'title', 'slug'), 'title')
            ->add(Festival::select('id', 'title', 'slug'), 'title')
            ->add(Category::select('id', 'title', 'slug'), ['title', 'slug'])
            ->includeModelType()
            ->paginate(10)
            ->search($query);

        $mapper = [
            'Article' => 'article.view',
            'Book' => 'book.show',
            'Festival' => 'festival.view',
            'Category' => 'category.view',
        ];

        $results->getCollection()
            ->transform(function ($item) use ($mapper) {
                $item->url = route($mapper[$item->type], $item->slug);
                return $item;
            });

        // $grouped = $results->getCollection()->keyBy('type');
        // return $results->setCollection($grouped);

        return $results;
    }
}
