import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image_path: string;
    stock: number;
}

interface ProductPageProps {
    product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
    const getImageUrl = (imagePath: string) => {
        if (imagePath) {
            return `/storage/${imagePath}`;
        }
        return '/images/placeholder.png';
    };

    return (
        <PublicLayout>
            <Head title={`${product.name} - Kairos Coffee`} />

            <div className="min-h-screen bg-white py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <Link href="/shop" className="text-amber-600 hover:text-amber-700 mb-8 block font-semibold">
                        ← Back to Shop
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
                            <img 
                                src={getImageUrl(product.image_path)} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <div>
                            <p className="text-amber-600 font-semibold tracking-widest mb-4 uppercase">
                                {product.category}
                            </p>
                            <h1 className="text-5xl font-bold text-stone-950 mb-6">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-bold text-amber-700 mb-6">
                                ${product.price.toFixed(2)}
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="mb-8">
                                <p className="text-sm text-gray-600 font-semibold">
                                    Stock Available: <span className="text-amber-700">{product.stock} bags</span>
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button className="px-8 py-4 bg-stone-950 text-white font-bold hover:bg-amber-600 transition">
                                    Add to Cart
                                </button>
                                <Link href="/shop" className="px-8 py-4 border-2 border-stone-950 text-stone-950 font-bold hover:bg-stone-950 hover:text-white transition">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
