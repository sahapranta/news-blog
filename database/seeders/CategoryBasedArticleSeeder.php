<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoryBasedArticleSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        foreach (
            [
                'getBangladeshArticles',
                'getInternationalArticles',
                'getFestivalArticles',
                'getLectureArticles',
            ] as $articles
        ) {
            foreach ($this->$articles() as $article) {
                $title = Str::of($articles)
                    ->replace('get', '')
                    ->replace('Articles', '')
                    ->lower()
                    ->trim()
                    ->toString();
                \App\Models\Article::factory()->create([
                    'title' => $article['title'],
                    'slug' => $article['slug'],
                    'content' => $article['content'],
                    'category_id' => \App\Models\Category::where('slug', $title)->first()->id,
                ]);
            }
        }
    }

    protected function getBangladeshArticles(): array
    {
        return [
            [
                'title' => 'ঢাকায় ISKCON মন্দির: এক ভক্তিময় কেন্দ্র',
                'slug' => 'iskcon-temple-dhaka',
                'content' => <<<'HTML'
                            <h2>ঢাকা ISKCON মন্দির</h2>
                            <p>ঢাকার স্বামীবাগে অবস্থিত ISKCON মন্দির বাংলাদেশের অন্যতম প্রাচীন ও গুরুত্বপূর্ণ কৃষ্ণভক্তি কেন্দ্র। এখানে প্রতিদিন শত শত ভক্ত দর্শনে আসেন।</p>
                            <ul>
                            <li>নিত্য আরতি ও প্রসাদ বিতরণ</li>
                            <li>ভগবদ্গীতা ও ভাগবত পাঠ</li>
                            <li>শ্রীকৃষ্ণ জন্মাষ্টমী ও রথযাত্রা উৎসব পালিত হয়</li>
                            </ul>
                            HTML
            ],
            [
                'title' => 'বাংলাদেশে কৃষ্ণভাবনার প্রসার',
                'slug' => 'krishna-consciousness-in-bangladesh',
                'content' => <<<'HTML'
                                <h2>বাংলাদেশে কৃষ্ণভাবনার ইতিহাস</h2>
                                <p>১৯৭০-এর দশক থেকে ISKCON বাংলাদেশে কৃষ্ণভাবনা প্রসার শুরু করে। দেশের বিভিন্ন স্থানে মন্দির, আশ্রম ও স্কুল প্রতিষ্ঠা করা হয়েছে।</p>
                                <p>আজ বাংলাদেশের বহু যুবক-যুবতী কৃষ্ণভক্তি অনুশীলন করছেন এবং ভক্তিসংগীতে জড়িত হচ্ছেন।</p>
                                HTML
            ],
            [
                'title' => 'চট্টগ্রামে ISKCON মন্দির ও তার কার্যক্রম',
                'slug' => 'iskcon-chattogram-activities',
                'content' => <<<'HTML'
                    <h2>চট্টগ্রাম ISKCON মন্দির</h2>
                    <p>চট্টগ্রামের ISKCON কেন্দ্রটি একটি শক্তিশালী সম্প্রদায় গড়ে তুলেছে যারা নিয়মিত ভাগবত পাঠ, প্রসাদ বিতরণ এবং শিক্ষামূলক সেবা পরিচালনা করে।</p>
                    <ul>
                    <li>সাপ্তাহিক কীর্তন অনুষ্ঠান</li>
                    <li>ভক্তি শিবির ও গীতার ক্লাস</li>
                    <li>দুঃস্থদের জন্য প্রসাদ বিতরণ</li>
                    </ul>
                    HTML
            ],
        ];
    }

    protected function getInternationalArticles(): array
    {
        return [
            [
                'title' => 'ISKCON বিশ্বের বৃহত্তম ভক্তি আন্দোলন',
                'slug' => 'iskcon-global-movement',
                'content' => <<<'HTML'
<h2>আন্তর্জাতিক ভক্তি আন্দোলন</h2>
<p>ISKCON বর্তমানে বিশ্বের ১০০+ দেশে ৭০০+ মন্দির পরিচালনা করছে। এটি ভক্তি যোগের শিক্ষা ও কৃষ্ণভাবনা সর্বত্র ছড়িয়ে দিচ্ছে।</p>
<p>বিশ্বের নানা জাতি ও সংস্কৃতির মানুষ এই আন্দোলনে যুক্ত হয়ে আত্মিক শান্তি ও মানবকল্যাণে নিবেদিত হচ্ছেন।</p>
HTML
            ],
            [
                'title' => 'ইউরোপ ও আমেরিকায় ISKCON',
                'slug' => 'iskcon-in-europe-america',
                'content' => <<<'HTML'
<h2>পশ্চিমা দুনিয়ায় কৃষ্ণভাবনা</h2>
<p>যুক্তরাষ্ট্রের নিউইয়র্ক শহর থেকে শুরু হওয়া ISKCON আন্দোলন আজ ইউরোপ ও আমেরিকার বহু শহরে প্রসার লাভ করেছে।</p>
<ul>
  <li>লন্ডন, প্যারিস, বার্লিনে মন্দির</li>
  <li>প্রসাদাম ক্যাফে ও ট্রাভেলিং কীর্তন দল</li>
  <li>ভক্তিশাস্ত্র পাঠ ও আন্তর্জাতিক রথযাত্রা</li>
</ul>
HTML
            ],
            [
                'title' => 'আন্তর্জাতিক রথযাত্রা উৎসব',
                'slug' => 'international-rathayatra',
                'content' => <<<'HTML'
<h2>রথযাত্রা: ভক্তি ও সংস্কৃতির মিলন</h2>
<p>ISKCON আন্তর্জাতিকভাবে রথযাত্রা পালন করে নিউইয়র্ক, লন্ডন, টোকিও সহ বহু শহরে। এই উৎসব কৃষ্ণভক্তি ছড়িয়ে দেয় বিশ্বময়।</p>
<p>হাজারো মানুষ একসাথে কীর্তনে অংশ নেন এবং প্রসাদ গ্রহণ করেন। এটি ভক্তির এক মহাসংযোগের দৃশ্য।</p>
HTML
            ],
        ];
    }

    protected function getFestivalArticles(): array
    {
        return [
            [
                'title' => 'শ্রীকৃষ্ণ জন্মাষ্টমী: ISKCON-এর প্রধান উৎসব',
                'slug' => 'janmashtami-iskcon-celebration',
                'content' => <<<'HTML'
<h2>জন্মাষ্টমী: কৃষ্ণের আবির্ভাব দিবস</h2>
<p>ISKCON মন্দিরে জন্মাষ্টমী উদযাপন হয় মহা উৎসাহে। উপবাস, কীর্তন, ভাগবত পাঠ ও মধ্যরাত্রিতে শ্রীকৃষ্ণের অর্চনা হয়।</p>
<p>ভক্তরা শোভাযাত্রা ও প্রসাদ বিতরণের মাধ্যমে এই দিবসটি স্মরণীয় করে তোলেন।</p>
HTML
            ],
            [
                'title' => 'গৌর পূর্ণিমা: চৈতন্য মহাপ্রভুর আগমন',
                'slug' => 'gaura-purnima-celebration',
                'content' => <<<'HTML'
<h2>গৌর পূর্ণিমা</h2>
<p>চৈতন্য মহাপ্রভুর জন্মতিথি গৌর পূর্ণিমা নামে পরিচিত। ISKCON-এ এদিন বিশেষ কীর্তন, মহাপ্রসাদ ও রাত্রি আরতি পালন করা হয়।</p>
<p>এটি ভক্তি ও করুণার এক মহোৎসব, যেখানে ভক্তরা আনন্দে ভরে যান।</p>
HTML
            ],
            [
                'title' => 'কার্তিক মাসে দমোদর আরতি',
                'slug' => 'kartik-damodar-arati',
                'content' => <<<'HTML'
<h2>দমোদর মাসে বিশেষ আরতি</h2>
<p>কার্তিক মাসে প্রতিদিন সন্ধ্যায় দীপ জ্বালিয়ে ভক্তরা দমোদর লীলা স্মরণ করেন। এটি ভক্তির এক মনোমুগ্ধকর প্রকাশ।</p>
<p>ISKCON মন্দিরে প্রতিদিন এই মাসে দমোদর আস্তক পাঠ, কীর্তন ও প্রসাদ বিতরণ হয়।</p>
HTML
            ],
        ];
    }

    protected function getLectureArticles(): array
    {
        return [
            [
                'title' => 'ভগবদ্গীতা বক্তৃতা সিরিজ: মন ও আত্মার জ্ঞান',
                'slug' => 'gita-lecture-series',
                'content' => <<<'HTML'
<h2>ভগবদ্গীতা ক্লাস</h2>
<p>ISKCON মন্দিরে নিয়মিতভাবে গীতা ক্লাস পরিচালিত হয় যেখানে ভক্তরা কৃষ্ণের উপদেশ শুনে আত্মিক উন্নতিতে অগ্রসর হন।</p>
<p>এই ক্লাসগুলি অনলাইনে ইউটিউব ও ফেসবুকেও সম্প্রচারিত হয়।</p>
HTML
            ],
            [
                'title' => 'শ্রাবণ ও কীর্তন: হরিনামের মাহাত্ম্য',
                'slug' => 'importance-of-sravana-kirtan',
                'content' => <<<'HTML'
<h2>শ্রবণ ও কীর্তনের শক্তি</h2>
<p>ভক্তি যোগের অন্যতম উপায় হল শ্রবণ ও কীর্তন। ISKCON-এ নিয়মিতভাবে শাস্ত্র পাঠ ও মহামন্ত্র কীর্তন আয়োজিত হয়।</p>
<p>এই শ্রবণের মাধ্যমে হৃদয় শুদ্ধ হয় এবং আত্মা কৃষ্ণের দিকে আকৃষ্ট হয়।</p>
HTML
            ],
            [
                'title' => 'প্রভুপাদ বক্তৃতা: আধুনিক যুগে আধ্যাত্মিকতা',
                'slug' => 'srila-prabhupada-lectures',
                'content' => <<<'HTML'
<h2>প্রভুপাদের বক্তৃতা</h2>
<p>এ. সি. ভক্তিবেদান্ত স্বামী প্রভুপাদের বক্তৃতাগুলো হাজারো মানুষের জীবন পরিবর্তন করেছে।</p>
<p>তাঁর বক্তৃতায় ছিল গীতার ব্যাখ্যা, কৃষ্ণের প্রেম, ও বাস্তব জীবনের সমস্যার আধ্যাত্মিক সমাধান।</p>
HTML
            ],
        ];
    }
}
