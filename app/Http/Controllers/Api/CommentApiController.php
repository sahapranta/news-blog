<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CommentResource;
use Stevebauman\Purify\Facades\Purify;

class CommentApiController extends Controller
{
    public function index(Article $article)
    {
        $comment = $article->comments()
            ->with('user:id,name,avatar')
            ->verified()
            ->latest()
            ->simplePaginate(8);

        return CommentResource::collection($comment);
    }

    public function store(Request $request, Article $article)
    {
        $validated = $request->validate([
            'body' => 'required|string|min:10|max:1500'
        ], [
            'body.min' => "Comment must be at least 10 characters long.",
            'body.max' => "Your comment is too long. Max 1500 characters.",
        ]);

        $comment = $article->comments()->create([
            'user_id' => Auth::id(),
            'body' => Purify::config('comment')->clean($validated['body'])
        ]);

        $comment->load('user');

        return new CommentResource($comment);
    }

    public function update(Request $request, Comment $comment)
    {
        abort_if($comment->user_id !== Auth::id(), 403);

        $validated = $request->validate([
            'body' => 'required|string|min:10|max:1500'
        ], [
            'body.min' => "Comment must be at least 10 characters long.",
            'body.max' => "Your comment is too long. Max 1500 characters.",
        ]);

        $data = [
            'body' => Purify::config('comment')->clean($validated['body']),
        ];

        if ($comment->is_verified) {
            $data['is_verified'] = false;
        }

        $comment->update($data);

        return new CommentResource($comment);
    }

    public function remove(Comment $comment)
    {
        abort_if($comment->user_id !== Auth::id(), 403);

        $comment->delete();

        return response()->json([
            'message' => 'Comment Deleted',
        ]);
    }
}
