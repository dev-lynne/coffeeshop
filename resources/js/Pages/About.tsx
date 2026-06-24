import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function About() {
    return (
        <PublicLayout>
            <Head title="About - Kairos Coffee" />

            <div className="min-h-screen bg-white py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-stone-950 mb-8">About Kairos</h1>
                    
                    <div className="space-y-8">
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Kairos Coffee Shop was founded with a simple mission: to bring the finest, ethically-sourced coffee to your cup. Every bean we roast tells a story of dedication, sustainability, and passion.
                        </p>
                        
                        <div>
                            <h2 className="text-3xl font-bold text-stone-950 mb-4">Our Story</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Founded in 2009, Kairos Coffee began as a small roastery dedicated to supporting sustainable coffee farming practices. Today, we work directly with farmers across Ethiopia, Colombia, and Central America to bring you the best single-origin and blended coffees.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mt-4">
                                From sourcing to roasting, from brewing to your cup. Every step of our process is carefully considered. We believe that great coffee starts with great relationships.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-stone-950 mb-4">Our Values</h2>
                            <ul className="text-lg text-gray-700 space-y-4">
                                <li className="flex gap-4">
                                    <span className="text-amber-600 text-2xl">🌱</span>
                                    <div>
                                        <p className="font-bold text-stone-950">Sustainability</p>
                                        <p>We support ethical farming and environmentally conscious practices at every level</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-amber-600 text-2xl">☕</span>
                                    <div>
                                        <p className="font-bold text-stone-950">Quality</p>
                                        <p>Every bean is hand-selected and roasted to perfection for an exceptional cup</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-amber-600 text-2xl">🤝</span>
                                    <div>
                                        <p className="font-bold text-stone-950">Community</p>
                                        <p>We believe in building lasting relationships with our customers and farming partners</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-stone-50 p-8 rounded-lg">
                            <h2 className="text-3xl font-bold text-stone-950 mb-4">Visit Us</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Come experience Kairos in person. Our café is located downtown and open:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-bold text-stone-950">Monday - Friday</p>
                                    <p className="text-gray-700">7am - 6pm</p>
                                </div>
                                <div>
                                    <p className="font-bold text-stone-950">Saturday - Sunday</p>
                                    <p className="text-gray-700">8am - 5pm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
