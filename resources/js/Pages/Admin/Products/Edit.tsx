import React, { FormEvent, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { router, Link, usePage } from '@inertiajs/react';
import { Product } from '@/types';

interface Props {
    product: Product;
}

export default function Edit() {
    const page = usePage();
    const { product } = page.props as unknown as Props;

    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        slug: product.slug,
        stock: product.stock.toString(),
        is_active: product.is_active,
        is_featured: product.is_featured,
        image: null as File | null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imagePreview, setImagePreview] = useState<string>(
        product.image_path ? `/storage/${product.image_path}` : ''
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });

            // Preview image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors({});

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('slug', formData.slug);
        data.append('stock', formData.stock);
        data.append('is_active', formData.is_active ? '1' : '0');
        data.append('is_featured', formData.is_featured ? '1' : '0');
        if (formData.image) {
            data.append('image', formData.image);
        }

        router.put(`/admin/products/${product.id}`, data, {
            onError: (errors) => {
                setErrors(errors as Record<string, string>);
            },
        });
    };

    return (
        <AdminLayout title="Edit Product">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 max-w-2xl">
                <div className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., Ethiopian Highlands"
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Describe your product..."
                        />
                        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                    errors.price ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="19.99"
                            />
                            {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                    errors.category ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., Single Origin"
                            />
                            {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                    errors.slug ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="ethiopian-highlands"
                            />
                            {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
                            <input
                                type="number"
                                min="0"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                                    errors.stock ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="50"
                            />
                            {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock}</p>}
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                        {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="mt-4 h-32 w-32 object-cover rounded-lg" />
                        )}
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center gap-10">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-semibold text-gray-700">Active Product</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="is_featured"
                                checked={formData.is_featured}
                                onChange={handleChange}
                                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-semibold text-gray-700">Featured Product</span>
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                        >
                            Update Product
                        </button>
                        <Link
                            href="/admin/products"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
