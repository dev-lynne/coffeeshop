<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class IndexController extends Controller
{
    public function __invoke(): Response
    {
        $featuredProducts = Product::where('is_active', true)
            ->where('is_featured', true)
            ->orderBy('updated_at', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('Index', [
            'featuredProducts' => $featuredProducts,
        ]);
    }
}