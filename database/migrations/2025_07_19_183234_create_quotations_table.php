<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->string('author')->nullable();
            $table->text('body');
            $table->string('title')->nullable();
            $table->string('source')->nullable();
            $table->string('type')->default('blue');
            $table->timestamp('start')->nullable();
            $table->timestamp('end')->nullable();
            $table->integer('priority')->default(0); // Priority for display, higher is more important
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
