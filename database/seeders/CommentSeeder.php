<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CommentSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Article::chunk(10, function ($articles) {
            foreach ($articles as $article) {
                $article->comments()->saveMany(
                    Comment::factory(fake()->numberBetween(2, 7))->make()
                );
            }
        });
    }
}
