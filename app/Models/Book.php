<?php

namespace App\Models;

use Database\Factories\BookFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    /** @use HasFactory<BookFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'pdf_url',
        'author',
        'publisher',
        'isbn',
        'pages',
        'price',
        'discount',
        'language',
        'category',
    ];

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }
}
