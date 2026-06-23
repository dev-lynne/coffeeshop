import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image_path: string;
}

interface ShopIndexProps {
    products: Product[];
}

export default function ShopIndex({ products }: ShopIndexProps) {
    const getImageUrl = (imagePath: string) => {
        if (imagePath) {
            return `/storage/${imagePath}`;
        }
        return '/images/placeholder.png';
    };

    return (
        <PublicLayout>
            <Head title="Shop - Kairos Coffee" />

            <div className="min-h-screen bg-stone-50 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h1 className="text-5xl font-light text-stone-950 mb-6">
                            Our <span className="font-bold">Collection</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Carefully selected beans from sustainable farms
                        </p>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                    <div className="h-64 overflow-hidden bg-gray-200">
                                        <img 
                                            src={getImageUrl(product.image_path)} 
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-amber-600 font-semibold tracking-widest mb-2 uppercase">
                                            {product.category}
                                        </p>
                                        <h3 className="text-2xl font-bold text-stone-950 mb-3">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 mb-6 font-light line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-amber-700">${product.price.toFixed(2)}</span>
                                            <Link href={`/shop/product/${product.id}`} className="px-6 py-3 bg-stone-950 text-white font-semibold hover:bg-amber-600 transition-colors">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-600">No products available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
