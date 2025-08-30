<?php

namespace Database\Factories;

use App\Services\BanglaFaker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    protected $model = \App\Models\Article::class;

    public function definition(): array
    {
        $fk = new BanglaFaker();

        return [
            'title' => $fk->sentence(),
            'excerpt' => $fk->paragraph(),
            'slug' => fake()->slug(),
            'content' => $fk->htmlParagraphs(rand(3, 7)),
            'user_id' => 1,
            'is_verified' => fake()->boolean(),
            'published_at' => now(),
            'reading_time' => fake()->numberBetween(4, 15),
            'category_id' => \App\Models\Category::inRandomOrder()->first()->id,
        ];
    }
}
