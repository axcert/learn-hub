import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';
import { User, Service } from '@/types';
import TeacherLayout from '@/Layouts/TeacherLayout';

interface Props {
  service: Service;
}

export default function BookingCreate({ service }: Props) {
  const { auth } = usePage().props as unknown as { auth: { user: User } };
  const { data, setData, post, processing, errors } = useForm({
    service_id: service.id,
    user_id: auth.user.id,
    description: '',
    date: '',
    status: 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('teacher.bookings.store'));
  };

  return (
    <TeacherLayout user={auth.user}>
      <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Book {service.name}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              {errors.description && <p className="text-red-500 text-xs mt-2">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                value={data.date}
                onChange={e => setData('date', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              {errors.date && <p className="text-red-500 text-xs mt-2">{errors.date}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={processing}
              >
                {processing ? 'Booking...' : 'Book Service'}
              </button>
              <Link href={route('teacher.services.show', service.id)} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Cancel
              </Link>
                        
            </div>
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
}
