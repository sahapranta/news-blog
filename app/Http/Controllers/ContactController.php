<?php

namespace App\Http\Controllers;

use App\Rules\Turnstile;
use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'name'    => 'required|string',
            'email'   => 'required|email',
            'phone'   => 'required|string',
            'subject' => 'required|string',
            'message' => 'required|string',
            'category' => 'required|string',
            'turnstile_response' => ['required', new Turnstile()],
        ]);

        ContactMessage::create([
            ...$request->only('name', 'email', 'phone', 'subject', 'message', 'category'),
            'ip_address' => $request->ip(),
        ]);

        return to_route('contact');
    }
}
