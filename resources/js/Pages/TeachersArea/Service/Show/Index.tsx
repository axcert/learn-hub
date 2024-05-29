import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Service, User } from '@/types';
import TeacherLayout from '@/Layouts/TeacherLayout';

interface Props {
  service: Service;
}

export default function ServiceShow({ service }: Props) {
  const { auth } = usePage().props as unknown as { auth: { user: User } };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      Inertia.delete(route('services.destroy', { id: service.id }), {
        onSuccess: () => {
          Inertia.visit(route('services.index'));
        }
      });
    }
  };

  return (
    <TeacherLayout user={auth.user}>
      <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">{service.name}</h1>
          <p className="text-gray-700 mb-2">{service.description}</p>
          <p className="text-gray-700 mb-2">Hourly Rate: Rs:{service.hourly_rate}/hr</p>

          {service.teacher ? (
            <p className="text-gray-700 mb-2">Teacher: {service.teacher.name}</p>
          ) : (
            <p className="text-gray-700 mb-2">Teacher information not available</p>
          )}

          <div className="flex justify-center items-center mt-6">
            <Link href={route('bookings.create', { service_id: service.id })} className="text-blue-600 hover:text-blue-900">
              Book Service
            </Link>
            <Link href={route('services.index')} className="text-blue-600 hover:text-blue-900 ml-4">
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
