import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
    image_path: string | null;
}

interface CartIndexProps {
    cartItems: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
}

export default function CartIndex({ cartItems, subtotal, shipping, total }: CartIndexProps) {
    const [quantities, setQuantities] = useState<Record<number, number>>(
        Object.fromEntries(cartItems.map((item) => [item.id, item.quantity])) as Record<number, number>,
    );

    const getImageUrl = (imagePath: string | null) => {
        if (imagePath) {
            return `/storage/${imagePath}`;
        }
        return '/images/placeholder.png';
    };

    const handleQuantityChange = (itemId: number, value: string) => {
        const quantity = Math.max(1, parseInt(value, 10) || 1);

        setQuantities((current) => ({
            ...current,
            [itemId]: quantity,
        }));
    };

    const handleUpdate = (itemId: number) => {
        router.post('/cart/update', {
            product_id: itemId,
            quantity: quantities[itemId] ?? 1,
        });
    };

    const handleRemove = (itemId: number) => {
        if (confirm('Remove this item from your cart?')) {
            router.delete(`/cart/remove/${itemId}`);
        }
    };

    return (
        <PublicLayout>
            <Head title="Shopping Cart - Kairos Coffee" />

            <div className="min-h-screen bg-stone-50 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-light text-stone-950">Your Cart</h1>
                        <p className="text-xl text-gray-600 mt-4">Review your selections and proceed to checkout.</p>
                    </div>

                    {cartItems.length > 0 ? (
                        <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                                        <div className="flex items-center gap-4">
                                            <img src={getImageUrl(item.image_path)} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
                                            <div>
                                                <h2 className="text-2xl font-semibold text-stone-950">{item.name}</h2>
                                                <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                                                <div className="mt-3 flex items-center gap-3">
                                                    <label className="text-sm text-gray-500">Qty</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={quantities[item.id] ?? item.quantity}
                                                        onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                                                        className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-amber-500 focus:outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdate(item.id)}
                                                        className="rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 transition"
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Item total</p>
                                            <p className="text-2xl font-bold text-amber-600">${item.total.toFixed(2)}</p>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(item.id)}
                                                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h2 className="text-2xl font-semibold text-stone-950 mb-6">Order summary</h2>
                                <div className="space-y-4 text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold text-stone-950">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <Link href="/cart/checkout" className="block w-full rounded-lg bg-amber-600 px-6 py-4 text-center text-white hover:bg-amber-700 transition">
                                        Checkout
                                    </Link>
                                    <Link href="/shop" className="block w-full rounded-lg border border-stone-900 px-6 py-4 text-center text-stone-950 hover:bg-stone-100 transition">
                                        Continue shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                            <p className="text-xl text-gray-700">Your cart is currently empty.</p>
                            <Link href="/shop" className="mt-6 inline-block rounded-lg bg-amber-600 px-8 py-4 text-white hover:bg-amber-700 transition">
                                Browse products
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
