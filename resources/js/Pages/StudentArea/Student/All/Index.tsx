import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps, Service, User } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { FaServer } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  services: Service[];
  teachers: User[];
}

export default function StudentIndex({ auth, services = [] }: PageProps) {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <StudentLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>}
    >
      <Head title="Student Dashboard" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 mx-10">
        <div className="lg:col-span-3">
          <div className="mt-4 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(services) && services.length > 0 ? (
              services.slice(0, 3).map((service) => (
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
          {Array.isArray(services) && services.length > 3 && (
            <div className="flex justify-center mt-4">
              <Link
                href={route('services.index')}
                // className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                className="text-blue-500 hover:text-blue-700 dark:text-blue-500 flex-end"
              >
                View More
              </Link>
            </div>
          )}
        </div>
        
        {/* calendar */}
        <div className="lg:col-span-1 mt-4">
          <div className="bg-white shadow-sm sm:rounded-lg p-4 text-center">
            <Calendar
              onChange={(value) => setDate(value as Date | null)}
              value={date}

            />
          </div>
        </div>
      </div>

      {/* History table */}
      <div className="mt-10 mx-10">
        <div className="bg-white shadow-sm sm:rounded-lg p-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4 flex"><FaServer className='mr-2' />My History</h2>
            <Link className="text-blue-700 hover:hover:text-blue-700 dark:text-blue-500 flex-end" href={route('services.index')}>View all</Link>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Teacher</th>
                <th className="px-4 py-2">Hourly Rate</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(services) && services.length > 0 ? (
                services.map((service) => (
                  <tr key={service.id}>
                    <td className="border px-4 py-2">{service.name}</td>
                    <td className="border px-4 py-2">{service.teacher.name}</td>
                    <td className="border px-4 py-2">{service.hourly_rate}</td>
                    <td className="border px-4 py-2">{service.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center col-span-full text-gray-500" colSpan={3}>No services found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
}
