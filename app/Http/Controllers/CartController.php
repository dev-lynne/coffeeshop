<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session('cart', []);
        $items = collect($cart)->values();
        $subtotal = $items->sum('total');
        $shipping = $subtotal > 0 ? 5.00 : 0.00;

        return Inertia::render('Cart/Index', [
            'cartItems' => $items,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'total' => $subtotal + $shipping,
        ]);
    }

    public function add(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1',
        ]);

        $product = Product::where('is_active', true)->findOrFail($data['product_id']);
        $quantity = $data['quantity'] ?? 1;

        $cart = session('cart', []);
        $existingQuantity = isset($cart[$product->id]) ? $cart[$product->id]['quantity'] : 0;

        if ($existingQuantity + $quantity > $product->stock) {
            return back()->with('error', "Only {$product->stock} units of {$product->name} are available.");
        }

        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += $quantity;
            $cart[$product->id]['total'] = $cart[$product->id]['quantity'] * $cart[$product->id]['price'];
        } else {
            $cart[$product->id] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $quantity,
                'total' => $product->price * $quantity,
                'image_path' => $product->image_path,
            ];
        }

        session(['cart' => $cart]);

        return back()->with('success', 'Product added to cart.');
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($data['product_id']);

        if ($data['quantity'] > $product->stock) {
            return redirect()->route('cart.index')->with('error', "Only {$product->stock} units of {$product->name} are available.");
        }

        $cart = session('cart', []);

        if (isset($cart[$data['product_id']])) {
            $cart[$data['product_id']]['quantity'] = $data['quantity'];
            $cart[$data['product_id']]['total'] = $cart[$data['product_id']]['quantity'] * $cart[$data['product_id']]['price'];
            session(['cart' => $cart]);
        }

        return redirect()->route('cart.index');
    }

    public function remove($productId)
    {
        $cart = session('cart', []);

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session(['cart' => $cart]);
        }

        return redirect()->route('cart.index');
    }

    public function checkout()
    {
        $cart = session('cart', []);

        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $items = collect($cart)->values();
        $subtotal = $items->sum('total');
        $shipping = 5.00;

        return Inertia::render('Cart/Checkout', [
            'cartItems' => $items,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'total' => $subtotal + $shipping,
        ]);
    }
}
