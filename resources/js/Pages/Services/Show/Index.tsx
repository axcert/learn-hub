import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Service, User } from '@/types';
import Authenticated from '@/Layouts/AuthenticatedLayout';

interface Props {
  service: Service;
}

const ServiceShow: React.FC<Props> = ({ service }) => {
  const { auth } = usePage().props as unknown as { auth: { user: User } };

  return (
    <Authenticated user={auth.user} >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{service.name}</h1>
          <p className="text-gray-700 mb-2">{service.description}</p>
          <p className="text-gray-700 mb-2">Hourly Rate: Rs:{service.hourly_rate}/hr</p>
          {service.teacher && (
            <p className="text-gray-700 mb-2">Teacher: {service.teacher.id}</p>
          )}
          <Link href={route('services.index')} className="text-blue-600 hover:text-blue-900">Back to Services</Link>
        </div>
      </div>
    </Authenticated>
  );
};

export default ServiceShow;
