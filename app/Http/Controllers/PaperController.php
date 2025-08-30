<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Paper;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\PaperResource;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PaperController extends Controller
{
    public function index(Request $request)
    {
        $paper = Paper::with(['media' => fn($q) => $q->orderBy('order_column', 'desc')])
            ->latest()
            ->firstOrFail();

        $search = $request->query('search');

        return Inertia::render('paper/index', [
            'papers' => PaperResource::collection(
                Paper::when($paper?->id, fn($q, $s) => $q->whereNot('id', $s))
                    ->latest('id')
                    ->when($search, fn($q, $s) => $q->where('title', 'like', "%$s%")->orWhere('description', 'like', "%$s%"))
                    ->paginate(10),
            ),
            'paper' => $paper ? new PaperResource($paper) : null,
            'filters' => [
                'search' => $search,
            ]
        ]);
    }

    public function view(Paper $paper)
    {
        $paper->load(['media' => fn($q) => $q->orderBy('order_column', 'desc')]);

        return Inertia::render('paper/view', [
            'paper' => new PaperResource($paper),
        ]);
    }

    public function download(Paper $paper)
    {
        $filePath = $paper->pdf_url;
        $disk = Storage::disk('local');

        if (!$disk->exists($filePath)) {
            abort(Response::HTTP_NOT_FOUND, 'File not found.');
        }

        $paper->increment('download_count');

        return response()->download($disk->path($filePath), Str::slug($paper->title), [
            'Content-Type' => 'application/pdf',
        ]);
    }
}
