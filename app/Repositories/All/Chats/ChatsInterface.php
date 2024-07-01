<?php 

namespace App\Repositories\All\Chats;

use App\Repositories\Base\BaseRepositoryInterface;

interface ChatsInterface extends BaseRepositoryInterface
{
    
    // public function getStudentChats();
    public function storeChat(array $data);
}