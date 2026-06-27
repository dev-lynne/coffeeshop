<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Product::count();
        $activeProducts = Product::where('is_active', true)->count();
        $lowStockProducts = Product::where('stock', '<=', 10)->count();
        $pendingOrders = Order::where('status', 'processing')->count();
        $salesToday = Order::whereDate('created_at', today())->sum('total');

        return Inertia::render('Admin/Dashboard', [
            'totalProducts' => $totalProducts,
            'activeProducts' => $activeProducts,
            'lowStockProducts' => $lowStockProducts,
            'pendingOrders' => $pendingOrders,
            'salesToday' => $salesToday,
        ]);
    }
}
