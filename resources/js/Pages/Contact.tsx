import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { FormEvent, useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <PublicLayout>
            <Head title="Contact - Kairos Coffee" />

            <div className="min-h-screen bg-white py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-stone-950 mb-8">Get in Touch</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-stone-950 mb-8">Contact Info</h2>
                            <div className="space-y-8">
                                <div>
                                    <p className="font-bold text-stone-950 text-lg mb-2">📍 Address</p>
                                    <p className="text-gray-700">123 Main Street</p>
                                    <p className="text-gray-700">Downtown Coffee District</p>
                                </div>
                                <div>
                                    <p className="font-bold text-stone-950 text-lg mb-2">📞 Phone</p>
                                    <p className="text-gray-700">(555) 123-4567</p>
                                </div>
                                <div>
                                    <p className="font-bold text-stone-950 text-lg mb-2">✉️ Email</p>
                                    <p className="text-gray-700">hello@kairoscoffee.com</p>
                                </div>
                                <div>
                                    <p className="font-bold text-stone-950 text-lg mb-2">⏰ Hours</p>
                                    <p className="text-gray-700">Mon-Fri: 7am - 6pm</p>
                                    <p className="text-gray-700">Sat-Sun: 8am - 5pm</p>
                                </div>
                                <div>
                                    <p className="font-bold text-stone-950 text-lg mb-2">Follow Us</p>
                                    <div className="flex gap-4">
                                        <a href="#" className="text-amber-600 hover:text-amber-700">Instagram</a>
                                        <a href="#" className="text-amber-600 hover:text-amber-700">Facebook</a>
                                        <a href="#" className="text-amber-600 hover:text-amber-700">Twitter</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold text-stone-950">Send us a Message</h2>
                            
                            <div>
                                <label className="block font-semibold text-stone-950 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-amber-500"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-stone-950 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-amber-500"
                                    placeholder="Your email"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-stone-950 mb-2">Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5} 
                                    required 
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-amber-500"
                                    placeholder="Your message"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full px-8 py-4 bg-stone-950 text-white font-bold hover:bg-amber-600 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
