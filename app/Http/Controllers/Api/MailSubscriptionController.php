<?php

namespace App\Http\Controllers\Api;

use App\Rules\Turnstile;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\MailSubscriber;
use Illuminate\Http\Request;

class MailSubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:mail_subscribers',
            'name' => 'nullable|string|max:255',
            'turnstile-response' => ['required', new Turnstile()],
        ], [
            'email.unique' => 'The email has already been subscribed.',
        ]);

        MailSubscriber::create([
            'email' => $request->input('email'),
            'name' => $request->input('name'),
            'source' => $request->input('source', 'website'),
            'country' => $request->input('country', 'bd'),
            'verification_token' => Str::random(32),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Subscription successful'
        ]);
    }

    public function verify($token)
    {
        $subscriber = MailSubscriber::where('verification_token', $token)->firstOrFail();

        if ($subscriber->is_verified) {
            return response()->json(['message' => 'Already verified'], 200);
        }

        $subscriber->update([
            'is_verified' => true,
            'verified_at' => now(),
            'verification_token' => null,
        ]);

        return response()->json(['message' => 'Subscription verified successfully']);
    }

    public function unsubscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:mail_subscribers,email',
        ]);

        $subscriber = MailSubscriber::where('email', $request->input('email'))->firstOrFail();

        if ($subscriber->unsubscribed_at) {
            return response()->json(['message' => 'Already unsubscribed'], 200);
        }

        $subscriber->update(['unsubscribed_at' => now()]);

        return response()->json(['message' => 'Unsubscribed successfully']);
    }


    public function status(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:mail_subscribers,email',
        ]);

        $subscriber = MailSubscriber::where('email', $request->input('email'))->firstOrFail();

        return response()->json([
            'is_verified' => $subscriber->is_verified,
            'is_active' => is_null($subscriber->unsubscribed_at),
            'verified_at' => $subscriber->verified_at,
            'unsubscribed_at' => $subscriber->unsubscribed_at,
        ]);
    }
}
