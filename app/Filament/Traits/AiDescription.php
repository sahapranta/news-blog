<?php

namespace App\Filament\Traits;

use Illuminate\Support\Facades\Http;

trait AiDescription
{
    protected static function makeMetaDescription(string $description): string
    {
        try {
            throw_unless(config('services.ai.api_key'), 'API KEY NOT FOUND');

            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.config('services.ai.api_key'),
                'Content-Type' => 'application/json',
            ])
                ->baseUrl(config('services.ai.base_url'))
                ->post('/v1/chat/completions', [
                    'model' => config('services.ai.model'),
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => 'You are an assistant that writes concise SEO-friendly meta descriptions in bangla (max 160 characters).',
                        ],
                        [
                            'role' => 'user',
                            'content' => "Generate a short meta description for the following content in bangla:\n\n".$description,
                        ],
                    ],
                    'max_tokens' => 100,
                ]);

            if ($response->successful()) {
                return trim($response->json('choices.0.message.content'));
            }
        } catch (\Throwable $th) {
            info('AI Description generation failed: ', [$th]);
        }

        return substr($description, 0, 160); // fallback if API fails
    }
}
