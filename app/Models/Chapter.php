<?php

namespace App\Models;

use Database\Factories\ChapterFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    /** @use HasFactory<ChapterFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'text',
        'page',
        'book_id', // Foreign key to the Book model
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
