import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import TeacherLayout from '@/Layouts/TeacherLayout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaServer } from 'react-icons/fa';
import { Booking, PageProps, Service, User } from '@/types';

interface Props extends PageProps {
  auth: { user: User };
  services: Service[];
  bookings: Booking[];
}

export default function TeacherOverview({ auth, services = [], bookings = [] }: Props) {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <TeacherLayout user={auth.user}>
      <Head title="Teacher Overview" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 mx-4 lg:mx-10">
        <div className="lg:col-span-3">
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(services) && services.length > 0 ? (
              services.slice(0, 3).map((service) => (
                <Link
                  href={route('teacher.services.show', service.id)}
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
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{service.name}</h3>
                    {service.teacher && <p className="mt-1 text-sm text-gray-600">Teacher: {service.teacher.user.name}</p>}
                    <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                    <p className="mt-1 text-sm font-semibold text-indigo-600">Rs: {service.hourly_rate}/hr</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No services found. <br />
                 1.Update your Bio and Position at the Right side Click Drop Down <br />
                 2. Go to Add Bio section. <br />
                 3. Add your Bio and Position and click Create button. <br />
                 4. Once you created your Bio and Position you will be able to add Services.

                <Link
                  href={route('teachers.create')}
                  className="text-blue-700 hover:text-blue-800 dark:text-blue-500 flex-end"
                ></Link>
              </p>
            )}
          </div>
          {Array.isArray(services) && services.length > 3 && (
            <div className="flex justify-center mt-4">
              <Link
                href={route('teacher.services.index')}
                className="text-blue-500 hover:text-blue-700 dark:text-blue-500 flex-end"
              >
                View More
              </Link>
            </div>
          )}
        </div>
        <div className="lg:col-span-1 mt-4 lg:mt-0">
          <div className="bg-white shadow-sm sm:rounded-lg p-4 text-center">
            <Calendar onChange={(value) => setDate(value as Date | null)} value={date} />
          </div>
        </div>
      </div>
      <div className="mt-10 mx-4 lg:mx-10">
        <div className="bg-white shadow-sm sm:rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <FaServer className="mr-2" /> My History
            </h2>
            <Link
              className="text-blue-700 hover:text-blue-800 dark:text-blue-500 flex-end"
              href={route('teacher.bookings.index')}
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Service</th>
                  <th className="px-4 py-2 border">Teacher</th>
                  <th className="px-4 py-2 border">Hourly Rate</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bookings) && bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="border px-4 py-2">{booking.service?.name ?? 'N/A'}</td>
                      <td className="border px-4 py-2">{booking.service?.teacher?.user?.name ?? 'N/A'}</td>
                      <td className="border px-4 py-2">{booking.service?.hourly_rate ?? 'N/A'}</td>
                      <td className="border px-4 py-2">{booking.status}</td>
                      <td className="border px-4 py-2">{booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</td>
                      <td className="border px-4 py-2">
                        <Link className="text-blue-600 hover:text-blue-900 mr-2" href={route('teacher.bookings.show', booking.id)}>View</Link>
                        <Link className="text-yellow-600 hover:text-yellow-900 mr-2" href={route('teacher.bookings.edit', booking.id)}>Edit</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center col-span-full text-gray-500" colSpan={6}>No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
