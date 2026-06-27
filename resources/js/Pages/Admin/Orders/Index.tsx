import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, usePage } from '@inertiajs/react';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    total: number;
}

interface Order {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    status: string;
    total: number;
    payment_reference: string;
    created_at: string;
    items: OrderItem[];
}

interface Props {
    orders: {
        data: Order[];
        links: Array<{ label: string; url: string | null; active: boolean }>;
    };
}

export default function AdminOrdersIndex() {
    const page = usePage();
    const { orders } = page.props as unknown as Props;

    return (
        <AdminLayout title="Orders">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Order history</h2>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order #</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Placed</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data.map((order) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-gray-800 font-medium">#{order.id}</td>
                                <td className="px-6 py-4 text-gray-700">{order.user.name}</td>
                                <td className="px-6 py-4 text-gray-800 font-semibold">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-center gap-2">
                {orders.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-3 py-2 rounded ${
                            link.active
                                ? 'bg-amber-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {link.label.replace(/&laquo;/, '«').replace(/&raquo;/, '»')}
                    </Link>
                ))}
            </div>
        </AdminLayout>
    );
}
