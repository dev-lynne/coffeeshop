import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    total: number;
}

interface Order {
    id: number;
    user: {
        name: string;
        email: string;
    };
    status: string;
    total: number;
    subtotal: number;
    shipping: number;
    payment_reference: string;
    payment_method: string;
    created_at: string;
    shipping_address: string;
    items: OrderItem[];
}

interface Props {
    order: Order;
}

export default function AdminOrderShow({ order }: Props) {
    return (
        <AdminLayout title={`Order #${order.id}`}>
            <Head title={`Order #${order.id}`} />

            <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Order #{order.id}</p>
                            <h2 className="text-2xl font-semibold text-gray-800">{order.payment_reference}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                            <p className="mt-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                                {order.status}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div className="rounded-lg bg-stone-50 p-6">
                            <h3 className="text-lg font-semibold text-stone-950 mb-3">Customer</h3>
                            <p className="text-sm text-gray-600">{order.user.name}</p>
                            <p className="text-sm text-gray-600">{order.user.email}</p>
                        </div>
                        <div className="rounded-lg bg-stone-50 p-6">
                            <h3 className="text-lg font-semibold text-stone-950 mb-3">Shipping address</h3>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{order.shipping_address}</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-stone-950 mb-3">Payment</h3>
                        <p className="text-sm text-gray-600">Method: {order.payment_method}</p>
                        <p className="text-sm text-gray-600 mt-2">Reference: {order.payment_reference}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-stone-950 mb-3">Totals</h3>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${order.shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold text-stone-950">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-stone-950 mb-3">Status</h3>
                        <div className="space-y-3">
                            <select
                                value={order.status}
                                onChange={(event) => {
                                    router.patch(`/admin/orders/${order.id}`, {
                                        status: event.target.value,
                                    });
                                }}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-amber-500 focus:outline-none"
                            >
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-stone-950 mb-4">Order items</h3>
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

                <div className="flex flex-wrap gap-3">
                    <Link href="/admin/orders" className="rounded-lg border border-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-50 transition">
                        Back to orders
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
