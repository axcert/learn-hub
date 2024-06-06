import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Service, User } from '@/types';
import TeacherLayout from '@/Layouts/TeacherLayout';

interface Props {
  service: Service;
}

export default function ServiceShow({ service }: Props) {
  const { auth } = usePage().props as unknown as { auth: { user: User } };

  return (
    <TeacherLayout user={auth.user}>
      <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
        {service.image && (
            <div className="flex justify-center mt-4">
              <img
                  src={service.image ? `/storage/${service.image}` : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"}
                  alt={service.name}
                  className="h-16 w-16 rounded-full"
                />
            </div>
          )}
          <h2 className="text-2xl font-bold mb-4 ">{service.name}</h2>
          
          <p className="text-gray-1000 mb-2">{service.description}</p>
          <p className="text-gray-700 mb-2">Hourly Rate: Rs:{service.hourly_rate}/hr</p>
          <p className="text-gray-700 mb-2">Experience: {service.experience}</p>
          {service.teacher ? (
            <p className="text-gray-700 mb-2">Teacher: {service.teacher.user.name}</p>
          ) : (
            <p className="text-gray-700 mb-2">Teacher information not available</p>
          )}
          
          <div className="flex justify-between  mt-6">
            <Link href={route('teacher.bookings.create', { service_id: service.id })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Book Service
            </Link>
            {/* <Link href={route('teacher.services.index')} className="text-blue-600 hover:text-blue-900 ml-4">
              Back to Services
            </Link> */}
            <button onClick={() => window.history.back()} className="text-blue-600 hover:text-blue-900 ml-4">
              Back
            </button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
