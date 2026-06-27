import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface User{
    id:number;
    name: string;
    email: string;
}

interface PageProps{
    auth: {
        user: User | null;
    };
    cartCount?: number;
}
export default function PublicLayout({ children }: PropsWithChildren) {
    const { auth, cartCount = 0 } = usePage().props as PageProps;
    const user = auth?.user;
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-stone-950 text-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-amber-500">
                        Kairos
                    </Link>
                    <div className="flex gap-8 items-center">
                        <Link href="/shop" className="hover:text-amber-400 transition">Shop</Link>
                        <Link href="/about" className="hover:text-amber-400 transition">About</Link>
                        <Link href="/contact" className="hover:text-amber-400 transition">Contact</Link>
                       {user ? (
                        <div className='flex items-center gap-4'>
                            <Link href="/cart" className='relative hover:text-amber-400 transition'>
                                🛒 Cart
                                {cartCount > 0 && (
                                    <span className='absolute -top-2 -right-4 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white'>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <div className='flex items-center gap-3 pl-4 border-l border-stone-700'>
                                <div>
                                    <p className='font-semibold'>{user.name}</p>
                                    <p className='text-sm text-gray-400'>{user.email}</p>

                                </div>
                                <Link href="/profile" className='bg-amber-600 px-4 py-2 rounded hover:bg-amber-700 transition'>
                                 Profile
                                </Link>
                                <Link href="/logout" method='post' as="button" className='bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition'>
                                Logout
                                </Link>

                            </div>
                        
                        </div>
                       )
                    : (
                        <>
                        <Link href="/login" className="bg-amber-600 px-4 py-2 rounded hover:bg-amber-700 transition">
                            Login
                        </Link>
                        <Link href="/register" className="bg-amber-600 px-4 py-2 rounded hover:bg-amber-700 transition">
                            Register
                        </Link>
                        </>
                    )

                       }
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="w-full">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-stone-950 text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-amber-500 font-bold text-lg mb-4">Kairos</h3>
                            <p className="text-sm">Premium artisan coffee roastery</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Shop</h4>
                            <ul className="text-sm space-y-2">
                                <li><Link href="/shop" className="hover:text-amber-400">All Products</Link></li>
                                <li><Link href="/shop" className="hover:text-amber-400">Single Origin</Link></li>
                                <li><Link href="/shop" className="hover:text-amber-400">Blends</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="text-sm space-y-2">
                                <li><Link href="/about" className="hover:text-amber-400">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-amber-400">Contact</Link></li>
                                <li><Link href="/" className="hover:text-amber-400">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Follow</h4>
                            <ul className="text-sm space-y-2">
                                <li><a href="#" className="hover:text-amber-400">Instagram</a></li>
                                <li><a href="#" className="hover:text-amber-400">Facebook</a></li>
                                <li><a href="#" className="hover:text-amber-400">Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-stone-800 pt-8 text-center text-sm">
                        <p>&copy; 2024 Kairos Coffee Shop. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
