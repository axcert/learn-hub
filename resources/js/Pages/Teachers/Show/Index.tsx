import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function TeacherShow({ auth, teacher }: any) {
    console.log(teacher);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Added Details</h2>}
        >
            <Head title={`Category: ${teacher.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Name:</h3>
                                <p className="text-gray-700">{teacher.name}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Description:</h3>
                                <p className="text-gray-700">{teacher.description}</p>
                            </div>
                            <div className="flex items-center">
                                <Link href={route('categories.edit', teacher.id)}>
                                    <PrimaryButton className="bg-blue-500 hover:bg-blue-600 mr-2">
                                        Edit
                                    </PrimaryButton>
                                </Link>
                                {/* <PrimaryButton
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this category?')) {
                                            Inertia.delete(route('categories.destroy', teacher.id));
                                        }
                                    }}
                                >
                                    Delete
                                </PrimaryButton> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
