<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        foreach ($this->categories() as [$title, $slug, $description]) {
            \App\Models\Category::factory()->create([
                'title' => $title,
                'slug' => $slug,
                'description' => $description,
            ]);
        }
    }

    protected function categories(): array
    {
        return [
            ['বাংলাদেশ', 'bangladesh', 'বাংলাদেশে ইসকনের কার্যক্রম ও ইতিহাস।'],
            ['আন্তর্জাতিক', 'international', 'বিশ্বজুড়ে ইসকনের প্রসার ও কর্মকাণ্ড।'],
            ['প্রবচন', 'lecture', 'আধ্যাত্মিক শিক্ষকদের জ্ঞানগর্ভ বক্তৃতা।'],
            ['উৎসব ও অনুষ্ঠান', 'festival', 'বিভিন্ন ধর্মীয় উৎসব ও অনুষ্ঠানসমূহ।'],
            ['কৃষ্ণ ভক্তি', 'krishna-bhakti', 'ভগবান শ্রীকৃষ্ণের প্রতি ভক্তি ও উপাসনা।'],
            ['ভগবদ্গীতা', 'bhagavad-gita', 'শ্রীমদ্ভগবদ্গীতার ভাবার্থ ও আলোচনা।'],
            ['হরে কৃষ্ণ মহামন্ত্র', 'hare-krishna-mahamantra', 'হরে কৃষ্ণ মহামন্ত্র জপের গুরুত্ব ও উপকারিতা।'],
            ['ভক্তি যোগ', 'bhakti-yoga', 'ভগবানের সাথে প্রেমময় সম্পর্ক স্থাপনের পথ।'],
            ['ভগবান শ্রীকৃষ্ণ', 'lord-krishna', 'ভগবান শ্রীকৃষ্ণের জীবন, শিক্ষা ও লীলা।'],
            ['চৈতন্য মহাপ্রভু', 'chaitanya-mahaprabhu', 'গৌড়ীয় বৈষ্ণবধর্মের প্রবর্তক চৈতন্য মহাপ্রভু।'],
            ['আরতি ও ভজন', 'aarti-bhajan', 'ভক্তিমূলক সংগীত, কীর্তন ও আরতির বিবরণ।'],
            ['প্রসাদাম ও ভোগ', 'prasadam-bhog', 'ভক্তিভাবে নিবেদিত প্রসাদ ও ভোগের মহিমা।'],
            ['গৌড়ীয় বৈষ্ণব দর্শন', 'gaudiya-vaishnavism', 'গৌড়ীয় বৈষ্ণব ধর্মের তত্ত্ব ও চর্চা।'],
            ['ধর্মীয় উৎসব', 'hindu-festivals', 'হিন্দু ধর্মীয় উৎসব ও তাদের তাৎপর্য।'],
            ['একাদশী উপবাস', 'ekadashi', 'একাদশী তিথিতে উপবাসের বিধান ও মাহাত্ম্য।'],
            ['মায়াপুর ধাম', 'mayapur-dham', 'চৈতন্য মহাপ্রভুর পবিত্র জন্মস্থান মায়াপুর ধাম।'],
            ['বৃন্দাবন ধাম', 'vrindavan-dham', 'শ্রীকৃষ্ণের লীলাভূমি বৃন্দাবনের পরিচিতি।'],
            ['তীর্থস্থান ও মন্দির', 'temples-pilgrimage', 'পবিত্র তীর্থস্থান ও ইসকন মন্দিরের বিবরণ।'],
            ['সাধুসঙ্গ ও কীর্তন', 'sanga-kirtan', 'সাধু-সঙ্গ, কীর্তন ও ভক্তি সংগঠনের গুরুত্ব।'],
            ['ভাগবত পাঠ', 'bhagavatam-reading', 'শ্রীমদ্ভাগবতম পাঠ ও এর আধ্যাত্মিক ফল।'],
            ['দান ও সেবা কর্ম', 'donation-seva', 'ভক্তি-সেবার মাধ্যমে ভগবানের সন্তুষ্টি লাভ।'],
            ['রাধা-কৃষ্ণ লীলা', 'radha-krishna-lila', 'রাধা-কৃষ্ণের প্রেমলীলার আধ্যাত্মিক তাৎপর্য।'],
        ];
    }
}
