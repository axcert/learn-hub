import React from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout';
import PrimaryButton from '@/Components/PrimaryButton';

interface TeacherProps {
  teachers: User[];
}


const TeacherIndex: React.FC<TeacherProps> = ({ teachers,  }) => {
  const { auth } = usePage().props as unknown as { auth: { user: User } };
  return (
    <StudentLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teachers</h2>}
    >
      <Head title="Teachers" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 mx-10">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="p-5">
              <Link href={route('teachers.show', teacher.id)}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{teacher.name}</h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700">Email: {teacher.email}</p>
              <p className="mb-3 font-normal text-gray-700">Role: {teacher.position}</p>
              <PrimaryButton className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                View Profile
              </PrimaryButton>
            </div>
          </div>
        ))}
      </div>
    </StudentLayout>
  );
}

export default TeacherIndex;
