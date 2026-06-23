<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', true)->get();
        return Inertia::render('Shop/Index', ['products' => $products]);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Shop/Product', ['product' => $product]);
    }
}
