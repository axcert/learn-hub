import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';
import { Service, User } from '@/types';
import Authenticated from '@/Layouts/AuthenticatedLayout';

interface Props {
  service: Service;
}

const ServiceEdit: React.FC<Props> = ({ service }) => {
  const { auth } = usePage().props as unknown as { auth: { user: User } };
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description);
  const [hourlyRate, setHourlyRate] = useState(service.hourly_rate);
  const [teacherId, setTeacherId] = useState(service.teacher_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.put(route('services.update', service.id), {
      name,
      description,
      hourly_rate: hourlyRate,
      teacher_id: teacherId,
    });
  };

  return (
    <Authenticated user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Service</h2>}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hourlyRate">
                  Hourly Rate
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.valueAsNumber)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teacherId">
                  Teacher
                </label>
                <select
                  id="teacherId"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>Select a teacher</option>
                  {/* Assuming you have a list of teachers passed as props */}
                  {service.teachers.map((teacher: { id: React.Key | readonly string[] | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update Service
                </button>
                <Link
                  href={route('services.index')}
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default ServiceEdit;
