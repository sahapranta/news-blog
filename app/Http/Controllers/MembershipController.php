<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MembershipController extends Controller
{
    public function membership()
    {
        return Inertia::render('MembershipPage');
    }

    public function membershipStatus()
    {
        return Inertia::render('MembershipStatusPage');
    }
}
