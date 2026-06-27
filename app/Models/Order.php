<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shipping_address',
        'payment_method',
        'payment_status',
        'status',
        'subtotal',
        'shipping',
        'total',
        'payment_reference',
    ];

    protected $casts = [
        'subtotal' => 'float',
        'shipping' => 'float',
        'total' => 'float',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
