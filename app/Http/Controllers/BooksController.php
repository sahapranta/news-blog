<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BooksController extends Controller
{
    public function index()
    {
        return Inertia::render('books/index');
    }

    public function read($book)
    {
        return Inertia::render('books/read');
    }
}
