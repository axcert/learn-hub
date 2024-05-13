import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AdminLayout
            user={auth.user}
           
        >
            <Head title="Home" />

           
        </AdminLayout>
    );
}
