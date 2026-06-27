import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const page = usePage();
    const props = page.props as any;

    return (
        <AdminLayout title="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500 mb-2">Total Products</div>
                    <div className="text-3xl font-bold text-gray-800">{props.totalProducts || 0}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500 mb-2">Active Products</div>
                    <div className="text-3xl font-bold text-amber-600">{props.activeProducts || 0}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500 mb-2">Low Stock Items</div>
                    <div className="text-3xl font-bold text-red-600">{props.lowStockProducts || 0}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500 mb-2">Pending Orders</div>
                    <div className="text-3xl font-bold text-amber-700">{props.pendingOrders || 0}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500 mb-2">Sales Today</div>
                    <div className="text-3xl font-bold text-green-700">${(Number(props.salesToday) || 0).toFixed(2)}</div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome to Admin Dashboard</h2>
                <p className="text-gray-600 mb-4">
                    Manage your coffee shop products, inventory, and more from here.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>View and manage all products</li>
                    <li>Add new products to the catalog</li>
                    <li>Update product details and pricing</li>
                    <li>Monitor inventory levels</li>
                    <li>Activate or deactivate products</li>
                </ul>
            </div>
        </AdminLayout>
    );
}
