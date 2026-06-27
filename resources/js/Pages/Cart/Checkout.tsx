import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
    image_path: string | null;
}

interface CheckoutProps {
    cartItems: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
}

export default function Checkout({ cartItems, subtotal, shipping, total }: CheckoutProps) {
    return (
        <PublicLayout>
            <Head title="Checkout - Kairos Coffee" />

            <div className="min-h-screen bg-stone-50 py-24">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-light text-stone-950">Checkout</h1>
                        <p className="text-xl text-gray-600 mt-4">Complete your order with secure payment and delivery details.</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                        <div className="space-y-8 rounded-lg bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-semibold text-stone-950">Shipping details</h2>

                            <form method="post" action="/orders">
                                <div className="grid gap-6">
                                    <textarea
                                        name="shipping_address"
                                        rows={6}
                                        placeholder="Enter your shipping address"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:border-amber-500 focus:outline-none"
                                        required
                                    />

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Payment method</label>
                                        <select
                                            name="payment_method"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-amber-500 focus:outline-none"
                                            required
                                        >
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="PayPal">PayPal</option>
                                            <option value="Apple Pay">Apple Pay</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="w-full rounded-lg bg-amber-600 px-6 py-4 text-white font-semibold hover:bg-amber-700 transition">
                                        Place order
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-semibold text-stone-950 mb-6">Order summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 border-b border-gray-200 pb-4">
                                        <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-200">
                                            <img src={item.image_path ? `/storage/${item.image_path}` : '/images/placeholder.png'} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-stone-950">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-amber-600">${item.total.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 space-y-3 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-bold text-stone-950">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/cart" className="mt-6 inline-block rounded-lg border border-stone-900 px-6 py-3 text-center text-stone-950 hover:bg-stone-100 transition">
                                Back to cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
