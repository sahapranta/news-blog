<?php

namespace App\Models;

trait HasComments
{
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function scopeHasComments($query)
    {
        return $$query->where('is_verified', true)->exists();
    }

    public function scopeHasUnverifiedComments($query)
    {
        return $$query->where('is_verified', false)->exists();
    }

    public function scopeVerifiedComments($query)
    {
        return $$query->where('is_verified', true);
    }

    public function addComment(
        User $user,
        ?string $body,
        ?string $parentId = null
    ): ?Comment {
        if ($body === null) return null;

        $comment = new Comment();
        $comment->commentable_id = $this->id;
        $comment->commentable_type = get_class($this);
        $comment->user_id = $user->id;
        $comment->body = $body;
        $comment->parent_id = $parentId;
        $comment->save();

        return $comment;
    } 
}
