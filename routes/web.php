<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IndexController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', IndexController::class)->name('index');

// Shop Routes
Route::prefix('shop')->name('shop.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Shop/Index');
    })->name('index');
    
    Route::get('/product/{id}', function () {
        return Inertia::render('Shop/Product');
    })->name('product');
});

// Cart Routes
Route::prefix('cart')->name('cart.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Cart/Index');
    })->name('index');
    
    Route::get('/checkout', function () {
        return Inertia::render('Cart/Checkout');
    })->name('checkout');
});

// About & Contact
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Authenticated Routes
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
