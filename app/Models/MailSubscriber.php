<?php

namespace App\Models;

use Database\Factories\MailSubscriberFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailSubscriber extends Model
{
    /** @use HasFactory<MailSubscriberFactory> */
    use HasFactory;

    protected $fillable = [
        'email',
        'name',
        'is_verified',
        'verification_token',
        'verified_at',
        'unsubscribed_at',
        'source',
        'country',
        'custom_data',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
        'unsubscribed_at' => 'datetime',
        'custom_data' => 'json',
    ];

    public function scopeVerified($query)
    {
        return $query->whereNotNull('verified_at')
            ->andWhere('is_verified', true);
    }

    public function scopeUnverified($query)
    {
        return $query->where('is_verified', false);
    }

    public function scopeActive($query)
    {
        return $query->whereNull('unsubscribed_at');
    }

    public function scopeInactive($query)
    {
        return $query->whereNotNull('unsubscribed_at');
    }
}
