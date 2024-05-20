import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { FaServer } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

interface Service {
  id: number;
  title: string;
  teacher: string;
  description: string;
  rating: number;
  status: 'completed' | 'enrolled' | 'upcoming';
  date: string;
}

export default function StudentIndex({ auth }: PageProps) {
  const [date, setDate] = useState<Date | null>(new Date());

  const services: Service[] = [
    { id: 1, title: 'Java basic', teacher: 'Jhnes Smith', description: 'Learn Java...', rating: 4, status: 'completed', date: 'Jan 25, 2024' },
    { id: 2, title: 'Frontend Dev', teacher: 'Jhnes Smith', description: 'Learn Frontend...', rating: 4, status: 'completed', date: 'Feb 5, 2024' },
    { id: 3, title: 'Social Media', teacher: 'Jhnes Smith', description: 'Learn Social Media...', rating: 5, status: 'upcoming', date: 'Mar 10, 2024' },
    { id: 4, title: 'Math', teacher: 'Jhnes Smith', description: 'Learn Math...', rating: 4, status: 'upcoming', date: 'Apr 2, 2024' },
    { id: 5, title: 'Graphic Design Fundamentals', teacher: 'Jhnes Smith', description: 'Learn Graphic Design...', rating: 5, status: 'upcoming', date: 'May 15, 2024' },
    { id: 6, title: 'Digital Illustration', teacher: 'Jhnes Smith', description: 'Learn Digital Illustration...', rating: 4, status: 'upcoming', date: 'June 8, 2024' },
    // { id: 7, title: 'UX/UI Design Principles', teacher: 'Jhnes Smith', description: 'Learn UX/UI...', rating: 5, status: 'upcoming', date: 'Nov 20, 2024' },
  ];

  return (
    <StudentLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>}
    >
      <Head title="Student Dashboard" />
    
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 mx-10">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.filter(service => service.status === 'upcoming').map((service) => (
              <div key={service.id} className="bg-white shadow-sm sm:rounded-lg p-4">
                <div className="font-bold text-gray-900 mb-2">{service.title}</div>
                <div className="text-gray-500 mb-2">Teacher: {service.teacher}</div>
                <div className="text-gray-500 mb-2">{service.description}</div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="text-gray-500">{service.rating}</span>
                </div>
                <PrimaryButton className="text-blue-300">Book Service</PrimaryButton>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm sm:rounded-lg p-4 text-center">
            <Calendar
              onChange={(value) => setDate(value as Date | null)}
              value={date}
              className="react-calendar"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 mx-10">
        <div className="bg-white shadow-sm sm:rounded-lg p-4">
         <div className="flex justify-between">
         <h2 className="text-xl font-bold mb-4 flex"><FaServer className='mr-2' />My History</h2>
          <Link className="text-blue-700 hover:underline dark:text-blue-500 flex-end" href={route('services.index')}>View all  </Link>
         </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Teacher</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                
              </tr>
            </thead>
            <tbody>
              {services.filter(service => service.status !== 'upcoming').map((service) => (
                <tr key={service.id}>
                  <td className="border px-4 py-2">{service.title}</td>
                  <td className="border px-4 py-2">{service.teacher}</td>
                  <td className="border px-4 py-2">{service.date}</td>
                  <td className="border px-4 py-2 capitalize">{service.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
}
