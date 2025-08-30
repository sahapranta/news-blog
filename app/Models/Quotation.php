<?php

namespace App\Models;

use Database\Factories\QuotationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    /** @use HasFactory<QuotationFactory> */
    use HasFactory;

    protected $fillable = [
        'author',
        'body',
        'source',
        'title',
        'type',
        'start',
        'end',
        'priority',
        'is_active',
    ];

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeWithinTimeWindow($query)
    {
        $now = now();

        return $query->where(function ($q) use ($now) {
            $q->whereNull('start')->orWhere('start', '<=', $now);
        })->where(function ($q) use ($now) {
            $q->whereNull('end')->orWhere('end', '>=', $now);
        });
    }
}
