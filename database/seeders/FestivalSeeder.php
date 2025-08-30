<?php

namespace Database\Seeders;

use App\Models\Festival;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FestivalSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Festival::truncate();
        Festival::factory(100)->create();
    }
}
