import React from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { User } from '@/types';

interface Props {
  auth: { user: User };
  message?: string;
}

export default function CreateTeacher({ auth, message }: Props) {
  const { data, setData, post, errors } = useForm({
    bio: '',
    position: '',
    user_id: auth.user.id 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('teachers.store'), {
      preserveScroll: true,
      onSuccess: () => {
        // Reset the form or show a success message
        setData({ bio: '', position: '', user_id: auth.user.id });
      }
    });
  };

  return (
    <TeacherLayout user={auth.user}>
      <Head title="Create Teacher" />
      <div className="mt-10 mx-4 lg:mx-10">
        {message && <div className="alert alert-info">{message}</div>}
        <div className="bg-white shadow-sm sm:rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Create Your Bio Here</h2>
          
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
                Create Teacher
              </button>
              <Link href={route('teachers.index')} className="text-blue-500 hover:text-blue-700">
                Back to Teachers
              </Link>
            </div>
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
}
