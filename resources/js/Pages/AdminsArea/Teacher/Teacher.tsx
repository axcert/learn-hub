import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Teacher({ auth }: PageProps) {
    return (
        <AdminLayout
            user={auth.user}
           
        >
            <Head title="Admin" />


            <h5 className='text-black'>Teacher temp</h5>

        </AdminLayout>
    );
}
