import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { User } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const page = usePage();
    const user = page.props.auth?.user as User | null;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="ml-4 text-2xl font-bold text-gray-800">☕ Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">{user?.name}</span>
                            <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                                Profile
                            </Link>
                            <Link href="/" className="text-gray-600 hover:text-gray-900">
                                Back to Shop
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <div
                    className={`${
                        sidebarOpen ? 'block' : 'hidden'
                    } md:block w-64 bg-gray-800 text-white`}
                >
                    <nav className="mt-6">
                        <Link
                            href="/admin/dashboard"
                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            🏠 Dashboard
                        </Link>
                        <Link
                            href="/admin/products"
                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            📦 Products
                        </Link>
                        <Link
                            href="/admin/products/create"
                            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            ➕ Add Product
                        </Link>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {title && <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>}
                    {children}
                </div>
            </div>
        </div>
    );
}
