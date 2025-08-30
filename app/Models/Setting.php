<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'is_active',
        'type',
        'description',
        'options',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'options' => 'array',
    ];

    public function scopeKey($query, $key)
    {
        return $query->where('key', $key);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
