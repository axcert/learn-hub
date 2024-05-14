import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function StudentIndex({ auth , teacher, imageUrl , student }: PageProps) {

    const teachers = [
        { id: 1, name: 'John Doe', photo: 'johnD.jpg', services: ['Maths', 'Science'] },
        { id: 2, name: 'Jane Smith', photo: 'janeS.jpg', services: ['English', 'History'] },
        { id: 3, name: 'Jane', photo: 'jane.jpg', services: ['Maths', 'Science'] },
        { id: 4, name: 'Smith', photo: 'john.jpg', services: ['English', 'History'] },
        { id: 5, name: 'Doe', photo: 'Doe.jpg', services: ['Maths', 'Java'] },
    ];
    const services = [
        { id: 1, title: 'Maths', teacherId: 1 },
        { id: 2, title: 'Science', teacherId: 1 },
        { id: 3, title: 'English', teacherId: 2 },
        { id: 4, title: 'History', teacherId: 2 },
        { id: 5, title: 'Sinhala', teacherId: 3 },
        { id: 6, title: 'Tamil', teacherId: 3 },
        { id: 7, title: 'Java', teacherId: 4 },
        { id: 8, title: 'Python', teacherId: 4 },
        { id: 9, title: 'Php', teacherId: 5 },
    ];
    
    return (
        <StudentLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>}
        >
            <Head title="Student Dashboard" />

                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="col-span-1 row-span-2">
                        {/* Teacher Details Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mx-10">
                            <div className="p-6 text-gray-900 font-bold">Teachers</div>
                            {teachers.map((teacher) => (
                                <div key={teacher.id} className="flex items-center justify-between border-b border-gray-200 p-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt={teacher.name} className="h-10 w-10 rounded-full" />
                                        
                                        {/* <img src={imageUrl} alt="Teacher Image"  className="h-10 w-10 rounded-full"/> */}
                                    
                                        <div>
                                            <div className="font-bold">{teacher.name}</div>
                                            <div className="text-gray-500">{teacher.services.join(', ')}</div>
                                        </div>
                                    </div>
                                    {/* <Link href={route('/teachers/${teacher.id')}>
                                    <PrimaryButton className="text-blue-500">View Profile</PrimaryButton>  
                                    </Link> */}
                                    <Link href={`/teachers/${teacher.id}`} className="text-blue-500">View Profile</Link>
                                    {/* <Link href={route('teachers.show',teacher.id)} className="text-blue-500">View Profile</Link> */}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1">
                        {/* Services Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mx-10 ">
                            <div className="p-6 text-gray-900 font-bold">Services</div>
                            <div className="flex flex-col space-y-4 p-4">
                                {services.map((service) => (
                                    <div key={service.id} className="border-b border-gray-200 p-2">
                                        <div className="flex items-center justify-between">
                                            <div>{service.title}</div>
                                            {/* Add button for each service */}
                                             <PrimaryButton className="text-blue-500">Book Service</PrimaryButton> 
                                            {/* <Link href={route('students.show', student.id)}>
                                            <PrimaryButton className="text-blue-500">Book Service</PrimaryButton>
                                            </Link> */} 
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
        </StudentLayout>
    );
}
