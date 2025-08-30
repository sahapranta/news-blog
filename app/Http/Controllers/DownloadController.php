<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaperResource;
use App\Models\Paper;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class DownloadController extends Controller
{
    public function paper(Paper $paper)
    {
        return Inertia::render('paper/download', [
            'paper' => new PaperResource($paper),
        ]);
    }

    public function paperDownloadLink(Paper $paper)
    {
        $url = URL::temporarySignedRoute('paper.download.url', now()->addMinutes(5), [
            'paper' => $paper->slug,
            'uid' => $paper->id,
        ]);

        return response()->json([
            'url' => $url,
        ]);
    }
}
