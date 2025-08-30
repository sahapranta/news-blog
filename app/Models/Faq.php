<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Faq extends Model
{
    /** @use HasFactory<\Database\Factories\FaqFactory> */
    use HasFactory;

    protected $fillable = ['question', 'answer', 'is_active', 'order', 'category'];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
