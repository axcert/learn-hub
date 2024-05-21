import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Service, User, Filters } from '@/types';

interface Props {
  services: Service[];
  teachers: User[];
  teachersCount: number;
  filters: Filters;
}

export default function ServiceIndex({ services = [], teachersCount = 0, filters = { search: '' } }: Props) {
  const { auth } = usePage().props as unknown as { auth: { user: User } };
  const [search, setSearch] = useState<string>(filters.search || '');

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      Inertia.delete(route('services.destroy', id));
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    Inertia.get(route('services.index'), { search });
  };

  return (
    <Authenticated user={auth.user}>
      <div className="bg-gray-100 py-15 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Services</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover our wide range of services provided by our talented professionals.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-10 flex justify-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services"
              className="w-full max-w-lg p-2 border border-gray-300 rounded-md"
            />
            <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
              Search
            </button>
          </form>

          <div className="mt-10 flex justify-center gap-8">
            <div className="bg-white overflow-hidden shadow rounded-lg h-full w-full max-w-xs">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-lg font-medium leading-6 text-gray-900 text-center">Total Services</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 text-center">{services.length}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg h-full w-full max-w-xs">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-lg font-medium leading-6 text-gray-900 text-center">Total Teachers</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 text-center">{teachersCount}</dd>
              </div>
            </div>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service) => (
                <Link
                  href={route('services.show', service.id)}
                  key={service.id}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-16 rounded-full"
                      src="https://cdn-icons-png.flaticon.com/512/4762/4762311.png"
                      alt={service.name}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {service.name}
                    </h3>
                    {service.teacher && (
                      <p className="mt-1 text-sm text-gray-600">Teacher: {service.teacher.name}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                    <p className="mt-1 text-sm font-semibold text-indigo-600">Rs: {service.hourly_rate}/hr</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No services found.</p>
            )}
          </div>
          <div className="mt-10 text-center">
            <Link href={route('services.create')} className="btn btn-primary">
              Create Service
            </Link>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
