<?php

namespace App\Http\Controllers;

use App\Models\Festival;
use Inertia\Inertia;

class EventsController extends Controller
{
    public function index()
    {
        return Inertia::render('events/index', [
            'festivals' => Festival::orderBy('start_date')
                ->select(
                    'id',
                    'title',
                    'slug',
                    'description',
                    'category',
                    'start_date',
                    'end_date',
                    'location',
                    'time',
                    'url',
                    'is_external'
                )
                ->active()
                ->whereDate('start_date', '>=', now()->startOfMonth())
                ->paginate(10)
                ->withQueryString(),
        ]);
    }
}
