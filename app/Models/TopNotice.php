<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TopNotice extends Model
{
    protected $fillable = [
        'type',
        'badge',
        'message',
        'dismissible',
        'link_text',
        'link_url',
        'start',
        'end',
        'priority',
        'is_active',
    ];

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
        'is_active' => 'boolean',
        'dismissible' => 'boolean',
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

    public function scopeCurrentlyDisplayable($query)
    {
        return $query->active()
            ->orderBy('priority', 'desc')
            ->withinTimeWindow();
    }
}
