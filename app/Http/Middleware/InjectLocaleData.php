<?php

namespace App\Http\Middleware;

use App\Services\BrowserLanguageService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InjectLocaleData
{
    public function handle(Request $request, Closure $next): Response
    {
        $languageCode = $request->cookie('locale');

        if (! $languageCode) {
            $languageCode = config('app.locale', 'en');

            if (! $languageCode) {
                $browserLanguageService = new BrowserLanguageService;
                $languageCode = $browserLanguageService->detectLanguage($request);
            }
        }

        // Specify the path to the language JSON files
        $localesPath = base_path('lang');
        $languageFilePath = "{$localesPath}/{$languageCode}.json";

        if (file_exists($languageFilePath)) {
            $data = json_decode(file_get_contents($languageFilePath), true);
        } else {
            // Fallback to English if the language file does not exist
            $englishFilePath = "{$localesPath}/en.json";
            $data = json_decode(file_get_contents($englishFilePath), true);
            $languageCode = 'en';
        }

        // Inject data into Inertia
        inertia()->share('localeData', [
            'translations' => $data,
            'lang' => $languageCode,
        ]);

        return $next($request);
    }
}
