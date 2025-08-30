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
        Schema::create('top_notices', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('success');
            $table->string('badge')->nullable();
            $table->string('message')->nullable();
            $table->boolean('dismissible')->default(true);
            $table->string('link_text')->nullable();
            $table->string('link_url')->nullable();
            $table->timestamp('start')->nullable()->index();
            $table->timestamp('end')->nullable()->index();
            $table->integer('priority')->default(0)->index(); // Priority for display, higher is more important
            $table->boolean('is_active')->default(true); // Whether the notice is
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('top_notices');
    }
};
