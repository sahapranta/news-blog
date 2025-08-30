<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MailSubscriber>
 */
class MailSubscriberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => $this->faker->unique()->safeEmail(),
            'is_verified' => false,
            'verification_token' => $this->faker->uuid(),
            'verified_at' => null,
            'unsubscribed_at' => null,
            'source' => $this->faker->randomElement(['website', 'mobile_app', 'api']),
            'country' => $this->faker->countryCode(),
            'custom_data' => json_encode(['preferences' => []]),
        ];
    }
}
