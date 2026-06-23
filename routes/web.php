<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', IndexController::class)->name('index');

// Shop Routes
Route::prefix('shop')->name('shop.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/product/{id}', [ProductController::class, 'show'])->name('show');
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

// Authenticated Routes - Dashboard redirects to home
Route::get('/dashboard', function () {
    return redirect('/');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
