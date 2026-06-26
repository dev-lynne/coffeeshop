import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, usePage, router } from '@inertiajs/react';
import { Product } from '@/types';

interface Props {
    products: {
        data: Product[];
        links: Array<{ label: string; url: string | null; active: boolean }>;
    };
}

export default function Index() {
    const page = usePage();
    const { products } = page.props as unknown as Props;

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    const getImageUrl = (imagePath: string | null) => {
        if (imagePath) return `/storage/${imagePath}`;
        return '/images/placeholder.png';
    };

    return (
        <AdminLayout title="Products">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">All Products</h2>
                <Link
                    href="/admin/products/create"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                    ➕ Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <img
                                        src={getImageUrl(product.image_path)}
                                        alt={product.name}
                                        className="h-10 w-10 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 text-gray-800 font-medium">{product.name}</td>
                                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                <td className="px-6 py-4 text-gray-800 font-semibold">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            product.stock > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            product.is_active
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {product.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        className="text-blue-600 hover:text-blue-800 font-semibold"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">
                {products.links.map((link, index) => (
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
