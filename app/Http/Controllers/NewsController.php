<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function home()
    {
        $requiredCategories = ['bangladesh', 'international', 'festival', 'lecture'];

        $categories = Category::whereIn('slug', $requiredCategories)
            ->with(['articles' => fn($q) => $q->latest()->take(3)])
            ->get();

        $featured = Article::with('category')
            ->inRandomOrder()
            ->first();

        $featured->featured_image = 'https://www.shova.link/wp-content/uploads/2025/01/%E0%A6%87%E0%A6%B8%E0%A6%95%E0%A6%A8-%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87-%E0%A6%AC%E0%A6%BF%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%BF%E0%A6%A4-%E0%A6%A4%E0%A6%A5%E0%A7%8D%E0%A6%AF.webp';

        $featured->excerpt = Str::limit(strip_tags($featured->content), 160);

        return Inertia::render('home', [
            'featured' => $featured,
            'sideArticles' => Article::with('category')
                ->inRandomOrder()
                ->take(4)
                ->get(),
            'categories' => $categories
        ]);
    }

    public function news(Article $article)
    {
        $article->append('content_html');

        return Inertia::render('ArticlePage', [
            'article' => $article->load(['category', 'author']),
        ]);
    }

    public function bangladesh()
    {
        $category = Category::where('slug', 'bangladesh')->firstOrFail();
        return $this->category($category);
    }

    public function international()
    {
        $category = Category::where('slug', 'international')->firstOrFail();
        return $this->category($category);
    }

    public function category(Category $category)
    {
        $articles = $category->articles()
            ->with('author')
            ->latest()
            ->paginate(12);

        $articles->getCollection()->transform(function ($article) use ($category) {
            $article->time = $article->created_at->diffForHumans();
            $article->excerpt = Str::limit(strip_tags($article->content), 120);
            $article->category = $category;
            return $article;
        });

        return Inertia::render('CategoryPage', [
            'category' => $category,
            'articles' => $articles,
        ]);
    }

    public function categories()
    {
        $categories = Category::withCount('articles')
            ->orderBy('articles_count', 'desc')
            ->get();

        return Inertia::render('CategoriesPage', [
            'categories' => $categories,
        ]);
    }
}
