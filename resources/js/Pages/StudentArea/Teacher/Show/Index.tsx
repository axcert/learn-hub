import { Head } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import { User } from '@/types'; 

const StudentShow = ({ teacher, user }: { teacher: any, user: User }) => {
    

    return (
        
        <StudentLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher Details</h2>}
        >
            
            <Head title="Teacher" />
            
        </StudentLayout>
    );
}


