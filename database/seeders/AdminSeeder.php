<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Enums\UserRoleEnum;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = [
            [
                'name' => 'axcertroadmin',
                'email' => 'admin@axcertro.com',
                'phone' => '0771221222',
                'role' => UserRoleEnum::Admin->value,
                'password' => Hash::make('Axcertro#Our1st'),
            ],
            [
                'name' => 'Hirushan',
                'email' => 'imesh.hirushan@axcertro.com',
                'phone' => '0779201232',
                'role' => UserRoleEnum::Admin->value,
                'password' => Hash::make('123456789'),
            ],
        ];
        $existingEmails = DB::table('users')->whereIn('email', array_column($admins, 'email'))->pluck('email')->toArray();
        $adminsToInsert = array_filter($admins, function ($admin) use ($existingEmails) {
            return !in_array($admin['email'], $existingEmails);
        });
        if (!empty($adminsToInsert)) {
            DB::table('users')->insert($adminsToInsert);
        }
    }
}
