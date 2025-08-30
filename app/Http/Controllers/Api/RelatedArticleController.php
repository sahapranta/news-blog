<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class RelatedArticleController extends Controller
{
    public function index(Request $request, Article $article)
    {
        try {
            $limit = $request->get('limit', 3);

            $suggestions = $this->getRelatedPosts($article, $limit);

            return response()->json([
                'success' => true,
                'data' => $suggestions,
                'total' => $suggestions->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch post suggestions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get related posts based on multiple criteria
     *
     * @param Article $currentPost
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    private function getRelatedPosts(Article $currentPost, $limit = 5)
    {
        // First, try to get posts with matching tags
        $tagBasedPosts = $this->getPostsByTags($currentPost, $limit);

        // If we don't have enough posts, get posts from same category
        if ($tagBasedPosts->count() < $limit) {
            $categoryPosts = $this->getPostsByCategory(
                $currentPost,
                $limit - $tagBasedPosts->count()
            );

            // Merge and remove duplicates
            $tagBasedPosts = $tagBasedPosts->merge($categoryPosts)->unique('id');
        }

        // If still not enough, get recent posts from same author
        if ($tagBasedPosts->count() < $limit) {
            $authorPosts = $this->getPostsByAuthor(
                $currentPost,
                $limit - $tagBasedPosts->count()
            );

            $tagBasedPosts = $tagBasedPosts->merge($authorPosts)->unique('id');
        }

        // Finally, if still not enough, get recent verified posts
        if ($tagBasedPosts->count() < $limit) {
            $recentPosts = $this->getRecentPosts(
                $currentPost,
                $limit - $tagBasedPosts->count()
            );

            $tagBasedPosts = $tagBasedPosts->merge($recentPosts)->unique('id');
        }

        return $tagBasedPosts->take($limit);
    }

    /**
     * Get posts with similar tags
     *
     * @param Article $currentPost
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    private function getPostsByTags(Article $currentPost, $limit)
    {
        if (empty($currentPost->tags)) {
            return collect();
        }

        // Assuming tags is a JSON field or comma-separated string
        $currentTags = is_string($currentPost->tags)
            ? explode(',', $currentPost->tags)
            : $currentPost->tags;

        $query = Article::where('id', '!=', $currentPost->id)
            ->where('is_verified', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());

        // Search for posts with matching tags
        foreach ($currentTags as $tag) {
            $tag = trim($tag);
            if ($tag) {
                $query->orWhere('tags', 'LIKE', '%' . $tag . '%');
            }
        }

        return $query->select([
            'id',
            'title',
            'excerpt',
            'slug',
            'category_id',
            'featured_image',
            'published_at',
            'created_at',
        ])
            ->with(['category:id,title'])
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get posts from the same category
     *
     * @param Article $currentPost
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    private function getPostsByCategory(Article $currentPost, $limit)
    {
        if (!$currentPost->category_id) {
            return collect();
        }

        return Article::where('id', '!=', $currentPost->id)
            ->where('category_id', $currentPost->category_id)
            ->where('is_verified', true)
            ->whereNotNull('published_at')
            ->with(['category:id,title'])
            ->where('published_at', '<=', now())
            ->select([
                'id',
                'title',
                'excerpt',
                'slug',
                'category_id',
                'featured_image',
                'published_at',
                'created_at',
            ])
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get other posts by the same author
     *
     * @param Article $currentPost
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    private function getPostsByAuthor(Article $currentPost, $limit)
    {
        return Article::where('id', '!=', $currentPost->id)
            ->where('user_id', $currentPost->user_id)
            ->where('is_verified', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->select([
                'id',
                'title',
                'excerpt',
                'slug',
                'category_id',
                'featured_image',
                'published_at',
                'created_at',
                'user_id'
            ])
            ->with(['category:id,title'])
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get recent verified posts as fallback
     *
     * @param Article $currentPost
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    private function getRecentPosts(Article $currentPost, $limit)
    {
        return Article::where('id', '!=', $currentPost->id)
            ->where('is_verified', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->select([
                'id',
                'title',
                'excerpt',
                'slug',
                'category_id',
                'featured_image',
                'created_at',
                'published_at',
            ])
            ->with(['category:id,title'])
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Alternative method: Get suggestions with weighted scoring
     *
     * @param Request $request
     * @param int $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSuggestionsWithScoring(Request $request, $postId)
    {
        try {
            $currentPost = Article::findOrFail($postId);
            $limit = $request->get('limit', 5);

            $suggestions = $this->getRelatedPostsWithScoring($currentPost, $limit);

            return response()->json([
                'success' => true,
                'data' => $suggestions,
                'total' => $suggestions->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch Article suggestions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get related posts using a scoring system
     *
     * @param Article $currentPost
     * @param int $limit
     * @return \Illuminate\Support\Collection
     */
    private function getRelatedPostsWithScoring(Article $currentPost, $limit)
    {
        $currentTags = is_string($currentPost->tags)
            ? explode(',', $currentPost->tags)
            : ($currentPost->tags ?? []);

        $posts = Article::where('id', '!=', $currentPost->id)
            ->where('is_verified', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->select([
                'id',
                'title',
                'excerpt',
                'slug',
                'category_id',
                'featured_image',
                'published_at',
                'created_at',
                'tags'
            ])
            ->with(['category:id,title'])
            ->get();

        // Calculate similarity scores
        $scoredPosts = $posts->map(function ($post) use ($currentPost, $currentTags) {
            $score = 0;

            // Same category bonus
            if ($post->category_id === $currentPost->category_id) {
                $score += 30;
            }

            // Same author bonus
            if ($post->user_id === $currentPost->user_id) {
                $score += 20;
            }

            // Tag similarity
            $postTags = is_string($post->tags)
                ? explode(',', $post->tags)
                : ($post->tags ?? []);

            $commonTags = array_intersect($currentTags, $postTags);
            $score += count($commonTags) * 15;

            // Recency bonus (posts within last 30 days get bonus)
            $daysSincePublished = now()->diffInDays($post->published_at);
            if ($daysSincePublished <= 30) {
                $score += 10 - ($daysSincePublished / 3);
            }

            $post->similarity_score = $score;
            return $post;
        });

        return $scoredPosts
            ->sortByDesc('similarity_score')
            ->take($limit)
            ->values();
    }
}
