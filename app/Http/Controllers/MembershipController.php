<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

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
