<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = auth()->user()->orders()->with('items')->latest()->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        abort_if($order->user_id !== auth()->id(), 403);

        $order->load('items');

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function store(Request $request)
    {
        $cart = session('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $data = $request->validate([
            'shipping_address' => 'required|string|max:1000',
            'payment_method' => 'required|string|max:255',
        ]);

        $items = collect($cart)->values();
        $productIds = $items->pluck('id')->all();
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        foreach ($items as $item) {
            $product = $products[$item['id']] ?? null;

            if (!$product || !$product->is_active) {
                return redirect()->route('cart.index')->with('error', 'A product in your cart is no longer available.');
            }

            if ($item['quantity'] > $product->stock) {
                return redirect()->route('cart.index')->with('error', "Only {$product->stock} units of {$product->name} are available.");
            }
        }

        $subtotal = $items->sum('total');
        $shipping = 5.00;
        $total = $subtotal + $shipping;

        DB::transaction(function () use ($data, $items, $products, $subtotal, $shipping, $total, &$order) {
            $order = auth()->user()->orders()->create([
                'shipping_address' => $data['shipping_address'],
                'payment_method' => $data['payment_method'],
                'payment_status' => 'paid',
                'status' => 'processing',
                'subtotal' => $subtotal,
                'shipping' => $shipping,
                'total' => $total,
                'payment_reference' => 'KAIROS-' . strtoupper(uniqid()),
            ]);

            foreach ($items as $item) {
                $product = $products[$item['id']];
                $product->decrement('stock', $item['quantity']);

                $order->items()->create([
                    'product_id' => $item['id'],
                    'product_name' => $item['name'],
                    'unit_price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'total' => $item['total'],
                ]);
            }
        });

        session()->forget('cart');

        return redirect()->route('orders.show', $order)->with('success', 'Your order has been placed successfully.');
    }
}
