import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaPlus, FaServer } from 'react-icons/fa';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { Booking, PageProps, Service, User } from '@/types';

interface Props extends PageProps {
  teachers: User[];
  services: Service[];
  serviceCount: number;
}

export default function TeacherIndex({ auth, teachers, services, serviceCount }: Props) {
  const [date, setDate] = useState<Date | null>(new Date());

  const servicesArray = Array.isArray(services) ? services : [];

  return (
    <TeacherLayout user={auth.user}>
      <Head title="Teacher Dashboard" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 mx-4 lg:mx-10">
        <div className="lg:col-span-3">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">My Service History</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Student</th>
                  <th className="px-4 py-2 border">Service</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {servicesArray.length > 0 ? (
                  servicesArray.map((service) => (
                    <tr key={service.id}>
                      <td className="border px-4 py-2">{service.student?.name ?? 'N/A'}</td>
                      <td className="border px-4 py-2">{service.name}</td>
                      <td className="border px-4 py-2">{service.date && typeof service.date === 'string' ?  new Date(service.date).toLocaleDateString() :'N/A'}</td>
                      <td className="border px-4 py-2">{service.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center col-span-full text-gray-500" colSpan={4}>No services found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:col-span-1 mt-4 lg:mt-0">
          <div className="bg-white shadow-sm sm:rounded-lg p-4 text-center">
            <Calendar onChange={(value) => setDate(value as Date)} value={date} />
          </div>
        </div>
      </div>
      <div className="mt-10 mx-4 lg:mx-10 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-sm sm:rounded-lg p-4 lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <FaServer className="mr-2" /> All Services Provided
            </h2>
            <span className="text-gray-700">{'2'} Services</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicesArray.map((service) => (
              <div key={service.id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition">
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{service.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Link href={route('services.create')} className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-9 py-1 flex items-center">
            <FaPlus className="mr-1" /> Create New Service
          </Link>
        </div>
      </div>
    </TeacherLayout>
  );
}
