<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Enums\UserRoleEnum;
use App\Repositories\All\Users\UserRepository;


class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        $userRepository = App()->make(UserRepository::class);
        $array = [
            [
                'name' => 'axcertroadmin',
                'email' => 'admin@axcertro.com',
                'phone' => '0771221222',
                'role' => UserRoleEnum::Admin->value,
                'password' => Hash::make('Axcertro#Our1st'),
            ],
            [
                'name' => 'Imesh',
                'email' => 'imesh.hirushan@axcertro.com',
                'phone' => '0779201232',
                'role' => UserRoleEnum::Admin->value,
                'password' => Hash::make('imesh1234@'),
            ],
        ];

        foreach ($array as $key => $item) {
            if (!$userRepository->existsByColumn(['email' => $item['email']])) {
                $userRepository->create($item);
            }
        }
    }
}
