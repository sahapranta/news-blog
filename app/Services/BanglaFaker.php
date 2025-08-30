<?php

namespace App\Services;

class BanglaFaker
{
    protected array $words = [
        'আমার',
        'তুমি',
        'সে',
        'আমরা',
        'তারা',
        'বাংলাদেশ',
        'ঢাকা',
        'চট্টগ্রাম',
        'পথ',
        'গাছ',
        'বাড়ি',
        'গান',
        'বই',
        'খেলা',
        'খাবার',
        'ভালো',
        'খারাপ',
        'শহর',
        'গ্রাম',
        'নদী',
        'সময়',
        'আজ',
        'কাল',
        'গতকাল',
        'এখন',
        'যখন',
        'যদি',
        'যাবে',
        'আসে',
        'খায়',
        'দেখে',
        'শোনে',
        'লিখে',
        'পড়ে',
        'চলে',
        'থাকে',
    ];

    protected array $stopWords = [
        'এবং',
        'কিন্তু',
        'তবে',
        'অথবা',
        'যদিও',
        'তাই',
        'যেন',
        'যে',
        'যদি',
        'তখন',
        'হয়তো',
        'তবুও',
        'কারণ',
        'যতক্ষণ',
        'এমনকি'
    ];

    public function word(): string
    {
        return $this->words[array_rand($this->words)];
    }

    public function sentence(int $wordCount = 6): string
    {
        $words = [];
        for ($i = 0; $i < $wordCount; $i++) {
            if ($i > 0 && rand(0, 4) === 0) {
                $words[] = $this->stopWords[array_rand($this->stopWords)];
            }
            $words[] = $this->word();
        }
        $sentence = implode(' ', $words);
        return mb_substr(mb_strtoupper(mb_substr($sentence, 0, 1)) . mb_substr($sentence, 1), 0) . '।';
    }

    public function paragraph(int $sentenceCount = 3): string
    {
        $paragraph = [];
        for ($i = 0; $i < $sentenceCount; $i++) {
            $paragraph[] = $this->sentence(rand(5, 10));
        }
        return implode(' ', $paragraph);
    }

    public function htmlParagraphs(int $paragraphCount = 2): string
    {
        $html = '';
        for ($i = 0; $i < $paragraphCount; $i++) {
            $html .= '<p>' . $this->paragraph(rand(3, 5)) . '</p>' . PHP_EOL;
        }
        return $html;
    }
}
