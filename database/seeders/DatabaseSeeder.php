<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Pranta Saha',
            'email' => 'pranta1204@gmail.com',
            'password' => bcrypt('12345678'),
            'role' => 'super-admin',
            'is_verified' => true,
        ]);

        User::factory(10)->create();

        $this->call([
            QuotationSeeder::class,
            CategorySeeder::class,
            ArticleSeeder::class,
            CategoryBasedArticleSeeder::class,
            CommentSeeder::class,
            TagSeeder::class,
            MailSubscriberSeeder::class,
            TopNoticeSeeder::class,
            SettingSeeder::class,
            FestivalSeeder::class,
        ]);
    }
}
