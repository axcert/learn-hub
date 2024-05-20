import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

interface Service {
  id: number;
  title: string;
  teacher: string;
  hourly_rate: string;
  status: 'completed' | 'enrolled' | 'upcoming';
}

export default function StudentIndex({ auth }: PageProps) {
  const [date, setDate] = useState<Date | null>(new Date());

  const services: Service[] = [
    { id: 1, title: 'Maths', teacher: 'John Doe', hourly_rate: '500', status: 'completed' },
    { id: 2, title: 'Science', teacher: 'John Doe', hourly_rate: '500', status: 'completed' },
    { id: 3, title: 'English', teacher: 'Jane Smith', hourly_rate: '500', status: 'enrolled' },
    { id: 4, title: 'History', teacher: 'Jane Smith', hourly_rate: '500', status: 'enrolled' },
    { id: 5, title: 'Sinhala', teacher: 'Jane', hourly_rate: '500', status: 'upcoming' },
    { id: 6, title: 'Tamil', teacher: 'Jane', hourly_rate: '500', status: 'upcoming' },
    { id: 7, title: 'Java', teacher: 'Smith', hourly_rate: '500', status: 'upcoming' },
    { id: 8, title: 'Python', teacher: 'Smith', hourly_rate: '500', status: 'upcoming' },
  ];

  

  return (
    <StudentLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>}
    >
      <Head title="Student Dashboard" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 mx-10">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.filter(service => service.status === 'upcoming').map((service) => (
            <div key={service.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
              <div className="text-gray-900 font-bold">{service.title}</div>
              <div className="text-gray-500 mb-2">Teacher: {service.teacher}</div>
              <div className="text-gray-500 mb-2">Hourly Rate: {service.hourly_rate}</div>
              <PrimaryButton className="text-blue-300">Book Service</PrimaryButton>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          {/* Calendar Section */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 text-center">
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <Calendar
              onChange={(value) => setDate(value as Date | null)}
              value={date}
              className="react-calendar"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 mx-10">
        {/* History Section */}
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Service History</h2>
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
              {services.filter(service => service.status !== 'upcoming').map((service) => (
                <tr key={service.id}>
                  <td className="border px-4 py-2">{service.title}</td>
                  <td className="border px-4 py-2">{service.teacher}</td>
                  <td className="border px-4 py-2">{service.hourly_rate}</td>
                  <td className="border px-4 py-2">{service.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      </div>
    </StudentLayout>
  );
}
