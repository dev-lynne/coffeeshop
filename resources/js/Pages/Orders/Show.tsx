import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface OrderItem {
    id: number;
    product_name: string;
    unit_price: number;
    quantity: number;
    total: number;
}

interface Order {
    id: number;
    status: string;
    total: number;
    payment_reference: string;
    shipping: number;
    subtotal: number;
    created_at: string;
    items: OrderItem[];
}

interface OrderShowProps {
    order: Order;
}

export default function OrderShow({ order }: OrderShowProps) {
    return (
        <PublicLayout>
            <Head title={`Order #${order.id} - Kairos Coffee`} />

            <div className="min-h-screen bg-stone-50 py-24">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="rounded-lg bg-white p-8 shadow-sm">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Order #{order.id}</p>
                                <h1 className="text-3xl font-semibold text-stone-950">Order details</h1>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                <p className="text-lg font-semibold text-amber-600">{order.status}</p>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                            <div className="rounded-lg bg-stone-50 p-6">
                                <h2 className="text-lg font-semibold text-stone-950 mb-3">Payment</h2>
                                <p className="text-sm text-gray-600">Reference: {order.payment_reference}</p>
                                <p className="text-sm text-gray-600 mt-2">Status: {order.status}</p>
                            </div>
                            <div className="rounded-lg bg-stone-50 p-6">
                                <h2 className="text-lg font-semibold text-stone-950 mb-3">Totals</h2>
                                <div className="space-y-2 text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${order.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>${order.shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-stone-950">
                                        <span>Total</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-stone-950 mb-4">Order items</h2>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                                        <div>
                                            <p className="font-semibold text-stone-950">{item.product_name}</p>
                                            <p className="text-sm text-gray-600">Qty {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-amber-600">${item.total.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link href="/orders" className="inline-block rounded-lg bg-stone-950 px-6 py-3 text-white hover:bg-amber-600 transition">
                                View all orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
