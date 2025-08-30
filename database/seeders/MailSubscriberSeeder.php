<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MailSubscriberSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\MailSubscriber::factory(10)->create();
    }
}
