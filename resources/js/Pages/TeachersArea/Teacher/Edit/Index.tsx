import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { User, Teacher } from '@/types';

interface Props {
  auth: { user: User };
  teacher: Teacher;
}

export default function EditTeacher({ auth, teacher }: Props) {
  const { data, setData, put, errors } = useForm({
    bio: teacher.bio || '',
    position: teacher.position || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('teachers.update', teacher.id), {
      preserveScroll: true,
      onSuccess: () => {
       
      }
    });
  };

  return (
    <TeacherLayout user={auth.user}>
      <Head title="Edit Teacher" />
      <div className="mt-10 mx-4 lg:mx-10">
        <div className="bg-white shadow-sm sm:rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Edit your Bio</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={data.bio}
                onChange={(e) => setData('bio', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
              {errors.bio && <p className="text-red-500 text-xs mt-2">{errors.bio}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">Position</label>
              <input
                id="position"
                type="text"
                value={data.position}
                onChange={(e) => setData('position', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.position && <p className="text-red-500 text-xs mt-2">{errors.position}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Teacher
              </button>
              <Link href={route('teachers.show', teacher.id)} className="text-blue-500 hover:text-blue-700">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
}
