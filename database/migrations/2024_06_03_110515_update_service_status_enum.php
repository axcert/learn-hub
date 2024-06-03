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
        Schema::table('services', function (Blueprint $table) {
            $table->string('status')->change();
        });

        // Update status enum values
        Schema::table('services', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed', 'ongoing', 'upcoming', 'unenrolled'])->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->enum('status', ['completed', 'ongoing', 'upcoming', 'unenrolled'])->default('unenrolled')->change();
        });
    }
};
