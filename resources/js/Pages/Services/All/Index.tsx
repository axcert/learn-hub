import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import { Service } from '@/types';

interface Props {
  services: Service[];
}

const Index: React.FC<Props> = ({ services }) => {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      Inertia.delete(route('services.destroy', id));
    }
  };

  console.log(services);

  return (
    <div>
      <h1 className="text-2xl font-bold">Services</h1>
      <Link href={route('services.create')} className="btn btn-primary my-4">
        Create Service
      </Link>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200">Name</th>
            <th className="px-6 py-3 border-b border-gray-200">Description</th>
            <th className="px-6 py-3 border-b border-gray-200">Price</th>
            <th className="px-6 py-3 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td className="px-6 py-4 border-b border-gray-200">{service.name}</td>
              <td className="px-6 py-4 border-b border-gray-200">{service.description}</td>
              <td className="px-6 py-4 border-b border-gray-200">{service.hourly_rate}</td>
              <td className="px-6 py-4 border-b border-gray-200">
                <Link
                  href={route('services.edit', service.id)}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </Link>
                <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;