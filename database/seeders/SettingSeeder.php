<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Setting::truncate();

        Setting::create([
            'key' => 'app_name',
            'value' => 'Hare Krishna Samacar',
            'is_active' => true,
            'description' => 'The name of your application',
        ]);

        $settings = [
            [
                'key' => 'featured_article',
                'value' => Article::inRandomOrder()->select('id')->first()->id,
                'description' => 'ID of the featured article',
            ],
            [
                'key' => 'ticker_articles',
                'value' => '',
                'type' => 'array',
                'description' => 'Add ticker news as title and link',
                'options' => [
                    [
                        'title' => 'করোনা আপডেট সম্পর্কিত যোগাযোগ করুন',
                        'link' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        'target' => '_self',
                    ],
                    [
                        'title' => 'মায়াপুরে রবীন্দ্র স্বরূপ প্রভুর ব্যাস পূজা উদযাপিত',
                        'link' => 'https://iskconbangla.com/Prasadam.html',
                        'target' => '_blank',
                    ],
                    [
                        'title' => 'ISKCON Protest Call: বিশ্বজুড়ে প্রার্থনা, কীর্তন… বাংলাদেশে সংকট',
                        'link' => 'https://iskconbangla.com/Prasadam.html',
                        'target' => '_blank',
                    ],
                    [
                        'title' => 'ইসকন কেন প্রতিষ্ঠিত হলো? … মোড় ঘুরিয়ে দিল ‘হরে কৃষ্ণ’',
                        'link' => 'https://iskconbangla.com/Prasadam.html',
                        'target' => '_blank',
                    ],
                    [
                        'title' => 'বাংলাদেশ হাই কোর্ট ইসকনের কার্যক্রম নিষেধাজ্ঞার আবেদন প্রত্যাখ্যান করেছে',
                        'link' => 'https://iskconbangla.com/Prasadam.html',
                        'target' => '_blank',
                    ],
                ],
            ],
            [
                'key' => 'trending_articles',
                'value' => 3,
                'type' => 'array',
                'options' => Article::inRandomOrder()->select('id')->limit(3)->pluck('id')->toArray(),
                'description' => 'IDs of the trending articles',
            ],
            [

                'key' => 'popular_articles',
                'value' => 5,
                'type' => 'array',
                'options' => Article::inRandomOrder()->select('id')->limit(5)->pluck('id')->toArray(),
                'description' => 'IDs of the popular articles',
            ],
            [
                'key' => 'horizontal_ads',
                'value' => 4,
                'type' => 'array',
                'description' => 'IDs of the horizontal banner ads',
                'options' => [],
            ],
            [
                'key' => 'vertical_ads',
                'value' => 1,
                'type' => 'array',
                'description' => 'IDs of the vertical banner ads',
                'options' => [],
            ],
            [
                'key' => 'top_ads',
                'value' => 1,
                'type' => 'array',
                'description' => 'IDs of the top banner ads',
                'options' => [],
            ],

        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
