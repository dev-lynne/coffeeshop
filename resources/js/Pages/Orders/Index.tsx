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
    created_at: string;
    items: OrderItem[];
}

interface OrdersIndexProps {
    orders: Order[];
}

export default function OrdersIndex({ orders }: OrdersIndexProps) {
    return (
        <PublicLayout>
            <Head title="My Orders - Kairos Coffee" />

            <div className="min-h-screen bg-stone-50 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-light text-stone-950">My Orders</h1>
                        <p className="text-xl text-gray-600 mt-4">Review your order history and track delivery status.</p>
                    </div>

                    {orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="rounded-lg bg-white p-6 shadow-sm">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Order #{order.id}</p>
                                            <p className="text-lg font-semibold text-stone-950">{order.payment_reference}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                                            <p className="text-xl font-bold text-amber-600">${order.total.toFixed(2)}</p>
                                            <p className="text-sm text-green-700">{order.status}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <Link href={`/orders/${order.id}`} className="rounded-lg bg-stone-950 px-5 py-2 text-white hover:bg-amber-600 transition">
                                            View details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                            <p className="text-xl text-gray-700">You haven't placed any orders yet.</p>
                            <Link href="/shop" className="mt-6 inline-block rounded-lg bg-amber-600 px-8 py-4 text-white hover:bg-amber-700 transition">
                                Shop now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
