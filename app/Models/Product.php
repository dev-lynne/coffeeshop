<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'category', 'slug', 'image_path', 'stock', 'is_active', 'is_featured'];

    protected $casts = [
        'price' => 'float',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            return asset('storage/' . $this->image_path);
        }
        return asset('images/placeholder.png');
    }
}
