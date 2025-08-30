<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Page;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function page(Page $page)
    {
        abort_if($page->is_published === false, 404);

        return Inertia::render('Page', [
            'page' => $page,
        ]);
    }

    public function about()
    {
        return Inertia::render('about');
    }

    public function contact()
    {
        return Inertia::render('ContactPage');
    }

    public function faq()
    {
        $faq = Faq::select(
            'id',
            'question',
            'answer',
            'category',
        )
            ->orderBy('order', 'asc')
            ->get()
            ->groupBy('category')
            ->map(fn ($qus, $cat) => [
                'title' => $cat,
                'questions' => $qus->values(),
            ])
            ->values();

        return Inertia::render('FAQPage', [
            'faqs' => $faq,
        ]);
    }

    public function app_download()
    {
        return Inertia::render('AppDownloadPage');
    }

    public function privacy_policy()
    {
        return Inertia::render('PrivacyPolicyPage');
    }

    public function cookie_policy()
    {
        return Inertia::render('CookiePolicyPage');
    }

    public function usage_policy()
    {
        return Inertia::render('UsagePolicyPage');
    }

    public function thank_you()
    {
        return Inertia::render('ThankYouPage');
    }
}
