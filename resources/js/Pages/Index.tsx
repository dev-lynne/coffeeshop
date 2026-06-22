import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Index() {
    const page = usePage();
    const user = page.props.auth?.user as User | null;
    return (
        <PublicLayout>
            <Head title="Kairos Coffee Shop - Premium Coffee" />

         {user && (
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}! ☕</h2>
                                <p className="text-amber-100">Ready to enjoy your favorite coffee?</p>
                            </div>
                            <Link href="/shop" className="bg-white text-amber-700 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {/* Hero Section */}
            <div className="relative min-h-screen bg-stone-950 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-900/30 to-transparent"></div>
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 h-screen flex items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="mb-8">
                            <span className="text-amber-500 text-sm font-semibold tracking-[3px] uppercase">
                                Artisan Coffee Roastery
                            </span>
                        </div>
                        
                        <h1 className="text-6xl lg:text-7xl font-light text-white mb-8 leading-tight">
                            Experience <span className="font-bold text-amber-400">Kairos</span>
                        </h1>
                        
                        <p className="text-xl text-gray-300 mb-12 max-w-xl leading-relaxed font-light">
                            Carefully selected beans from sustainable farms, roasted to perfection. Every cup tells a story of dedication, quality, and passion for exceptional coffee.
                        </p>
                        
                        <div className="flex gap-6 flex-wrap">
                            <button className="group relative px-8 py-4 bg-amber-600 text-white font-semibold overflow-hidden">
                                <span className="absolute inset-0 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                <span className="relative">Explore Menu</span>
                            </button>
                            <button className="px-8 py-4 border border-amber-500 text-amber-400 font-semibold hover:bg-amber-500/10 transition-colors">
                                Visit Us
                            </button>
                        </div>

                        <div className="mt-16 pt-8 border-t border-stone-800 grid grid-cols-3 gap-8 max-w-md">
                            <div>
                                <p className="text-3xl font-bold text-amber-400">150+</p>
                                <p className="text-sm text-gray-400 mt-1">Happy Customers Daily</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-amber-400">20+</p>
                                <p className="text-sm text-gray-400 mt-1">Premium Blends</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-amber-400">15yr</p>
                                <p className="text-sm text-gray-400 mt-1">Legacy</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block w-1/2 relative h-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-96 h-96 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl opacity-80 blur-3xl"></div>
                            <div className="absolute w-72 h-72 bg-amber-600 rounded-full opacity-60"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-light text-stone-950 mb-6">
                            Our <span className="font-bold">Commitment</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            We're dedicated to bringing you the finest coffee experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                number: '01',
                                title: 'Sustainability First',
                                description: 'We partner with ethical farmers who practice sustainable coffee cultivation, protecting the environment and communities.'
                            },
                            {
                                number: '02',
                                title: 'Small-Batch Roasting',
                                description: 'Each batch is roasted with precision to unlock the unique flavor profile of every single-origin bean.'
                            },
                            {
                                number: '03',
                                title: 'Expert Craftsmanship',
                                description: 'Our master roasters bring decades of experience to create exceptional blends you\'ll crave every morning.'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group">
                                <p className="text-6xl font-light text-amber-400 mb-4 group-hover:text-amber-600 transition-colors">
                                    {item.number}
                                </p>
                                <h3 className="text-2xl font-semibold text-stone-950 mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-24 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-light text-stone-950 mb-6">
                            Featured <span className="font-bold">Collections</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Discover our signature selections
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Ethiopian Highlands',
                                category: 'Single Origin',
                                description: 'Bright, fruity notes with hints of floral and berry',
                                price: '$16.99',
                                color: 'from-amber-400 to-orange-500'
                            },
                            {
                                name: 'Signature Blend',
                                category: 'House Favorite',
                                description: 'Perfectly balanced medium roast with chocolate notes',
                                price: '$14.99',
                                color: 'from-orange-500 to-red-600'
                            },
                            {
                                name: 'Midnight Roast',
                                category: 'Dark Roast',
                                description: 'Bold and rich with deep caramel and cocoa',
                                price: '$17.99',
                                color: 'from-red-700 to-stone-800'
                            }
                        ].map((product, idx) => (
                            <div key={idx} className="group">
                                <div className={`h-64 bg-gradient-to-br ${product.color} rounded-lg mb-6 overflow-hidden relative`}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-300"></div>
                                </div>
                                <p className="text-sm text-amber-600 font-semibold tracking-widest mb-2">
                                    {product.category}
                                </p>
                                <h3 className="text-2xl font-bold text-stone-950 mb-3">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 mb-6 font-light">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-amber-700">{product.price}</span>
                                    <button className="px-6 py-3 bg-stone-950 text-white font-semibold hover:bg-amber-600 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-stone-950 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-light mb-6">
                            How We <span className="font-bold text-amber-400">Craft</span> Excellence
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: 'Source', desc: 'Handpicked from ethical farms' },
                            { step: 'Roast', desc: 'Small-batch roasting to perfection' },
                            { step: 'Brew', desc: 'Expert preparation techniques' },
                            { step: 'Enjoy', desc: 'Experience pure coffee bliss' }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center">
                                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.step}</h3>
                                <p className="text-gray-400 font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-5xl font-light text-stone-950 mb-6">
                        Stay in the <span className="font-bold">Loop</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 font-light">
                        Get exclusive access to new blends, special offers, and coffee insights
                    </p>
                    
                    <form className="flex gap-3 mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-500"
                        />
                        <button className="px-8 py-4 bg-stone-950 text-white font-semibold hover:bg-amber-600 transition-colors">
                            Subscribe
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 font-light">
                        We respect your privacy. Unsubscribe anytime.
                    </p>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 bg-gradient-to-r from-amber-700 to-orange-600">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <h2 className="text-4xl font-light mb-6">
                        Ready to Taste the <span className="font-bold">Difference?</span>
                    </h2>
                    <p className="text-lg opacity-90 mb-8 font-light">
                        Visit us today and discover why Kairos is the choice of true coffee lovers
                    </p>
                    <button className="px-10 py-4 bg-white text-amber-700 font-bold text-lg hover:bg-stone-100 transition-colors">
                        Visit Our Café
                    </button>
                </div>
            </section>
        </PublicLayout>
    );
}