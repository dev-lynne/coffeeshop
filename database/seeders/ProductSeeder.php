<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Ethiopian Highlands',
            'description' => 'Bright, fruity notes with hints of floral and berry. Single-origin from the highlands of Ethiopia.',
            'price' => 16.99,
            'category' => 'Single Origin',
            'slug' => 'ethiopian-highlands',
            'image_path' => 'products/ethiopian-highlands.jpg',
            'stock' => 50,
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Signature Blend',
            'description' => 'Perfectly balanced medium roast with chocolate notes and smooth finish.',
            'price' => 14.99,
            'category' => 'House Favorite',
            'slug' => 'signature-blend',
            'image_path' => 'products/signature-blend.jpg',
            'stock' => 75,
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Midnight Roast',
            'description' => 'Bold and rich with deep caramel and cocoa undertones. Perfect for espresso lovers.',
            'price' => 17.99,
            'category' => 'Dark Roast',
            'slug' => 'midnight-roast',
            'image_path' => 'products/midnight-roast.jpg',
            'stock' => 60,
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Colombian Geisha',
            'description' => 'Exceptional single-origin with notes of jasmine, bergamot, and stone fruit.',
            'price' => 24.99,
            'category' => 'Premium',
            'slug' => 'colombian-geisha',
            'image_path' => 'products/colombian-geisha.jpg',
            'stock' => 30,
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Morning Glory',
            'description' => 'Light roast with bright acidity and fruity notes. Perfect for starting your day.',
            'price' => 13.99,
            'category' => 'Light Roast',
            'slug' => 'morning-glory',
            'image_path' => 'products/morning-glory.jpg',
            'stock' => 45,
            'is_active' => true,
        ]);
    }
}
