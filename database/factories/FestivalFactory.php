<?php

namespace Database\Factories;

use App\Models\Article;
use App\Services\BanglaFaker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Festival>
 */
class FestivalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->randomElement($this->title()),
            'slug' => fake()->slug(),
            'description' => (new BanglaFaker())->sentence(rand(8, 12)),
            'category' => "উপবাস",
            'start_date' => fake()->dateTimeBetween(now()->addMonths(-3), now()->addMonths(12)),
            'location' => 'পারণ: ০৬.৪০ থেকে ১০.২১',
            'time' => fake()->randomElement([
                "সোমবার",
                "মঙ্গলবার",
                "বুধবার",
                "বৃহস্পতিবার",
                "শুক্রবার",
                "শনিবার",
                "রবিবার",
            ]),
            'user_id' => 1,
            'url' => Article::inRandomOrder()->first('slug')->slug,
        ];
    }

    protected function title(): array
    {
        return [
            "ষটতিলা একাদশী",
            "ভৈমী একাদশী",
            "বিজয়া একাদশী",
            "আমলকীব্রত একাদশী",
            "পাপমোচনী একাদশী",
            "কামদা একাদশী (পক্ষবর্দ্ধিনী মহাদ্বাদশী)",
            "বরুথিনী একাদশী",
            "মোহিনী একাদশী",
            "অপরা একাদশী",
            "পদ্মিনী একাদশী",
            "পরমা একাদশী",
            "পাণ্ডবা নির্জলা একাদশী (ত্রিস্পর্শা মহাদ্বাদশী)",
            "যোগিনী একাদশী",
            "শয়ন একাদশী",
            "কামিকা একাদশী",
            "পবিত্রারোপণ একাদশী",
            "অন্নদা একাদশী",
            "পার্শ্ব একাদশী",
            "ইন্দিরা একাদশী",
            "পাশাঙ্কুশা একাদশী",
            "রমা একাদশী",
            "উত্থান একাদশী (ত্রিস্পর্শা মহাদ্বাদশী)",
            "উৎপন্না একাদশী",
            "মোক্ষদা একাদশী",
            "সফলা একাদশী",
            "পুত্রদা একাদশী",
        ];
    }
}
