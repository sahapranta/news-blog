<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quotation>
 */
class QuotationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'author' => $this->faker->name(),
            'body' => $this->faker->paragraph(),
            'source' => $this->faker->words(3, true),
            'title' => $this->faker->word(),
            'type' => $this->faker->randomElement(['blue', 'yellow']),
            'start' => $this->faker->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d H:i:s'),
            'end' => $this->faker->dateTimeBetween('+2 month', '+6 month')->format('Y-m-d H:i:s'),
            'priority' => $this->faker->numberBetween(1, 10),
            'is_active' => $this->faker->boolean(),
        ];
    }
}
