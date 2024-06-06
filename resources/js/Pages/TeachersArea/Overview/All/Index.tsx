import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import TeacherLayout from '@/Layouts/TeacherLayout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaServer } from 'react-icons/fa';
import { Booking, PageProps, Service, User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import MyDialog from '@/Components/MyDialog/MyDialog';


interface Props extends PageProps {
  auth: { user: User };
  services: Service[];
  bookings: Booking[];
  bookingsForMyServices: Booking[];
}

export default function TeacherOverview({ auth, services = [], bookings = [], bookingsForMyServices = [] }: Props) {
  const [date, setDate] = useState<Date | null>(new Date());
  const [selectedService, setSelectedService] = useState<Service | null>(null); // State for selected service
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

  const handleBookingAction = (booking_id: number, action: string) => {
    const url = route(`teacher.bookings.${action}`, booking_id);
    Inertia.post(url, { _method: 'patch' });
  };

  const sortBookingsByDate = (bookings: Booking[]) => {
    return bookings.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const sortedBookingsForMyServices = sortBookingsByDate(bookingsForMyServices);
  const sortedBookings = sortBookingsByDate(bookings);

  const openDialog = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedService(null);
    setIsDialogOpen(false);
  };

  return (
    <TeacherLayout user={auth.user}>
      <Head title="Teacher Overview" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5 mx-4 lg:mx-10">
        <div className="lg:col-span-3">
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.isArray(services) && services.length > 0 ? (
              services.slice(0, 4).map((service) => (
                <div
                  onClick={() => openDialog(service)}
                  key={service.id}
                  className="cursor-pointer flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
                >
                  <div className="flex-shrink-0">
                    <div className="flex justify-center mt-4">
                      <img
                        src={service.image ? `/storage/${service.image}` : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"}
                        alt={service.name}
                        className="h-16 w-16 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{service.name}</h3>
                    {service.teacher && <p className="mt-1 text-sm text-gray-600">Teacher: {service.teacher.user.name}</p>}
                    <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                    <p className="mt-1 text-sm font-semibold text-indigo-600">Rs: {service.hourly_rate}/hr</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No services found. <br />
                Update your Bio and Position at the click on Profile icon <br />
                Go to Add Bio section. <br />
                Add your Bio and Position and click Create button. <br />
                Once you created your Bio and Position you will be able to add Services.

                

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
              <FaServer className="mr-2" /> Bookings for My Services
            </h2>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Service</th>
                  <th className="px-4 py-2 border">Student</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(sortedBookingsForMyServices) && sortedBookingsForMyServices.length > 0 ? (
                  sortedBookingsForMyServices.slice(0, 5).map((booking) => (
                    <tr key={booking.id}>
                      <td className="border px-4 py-2">{booking.service?.name ?? 'N/A'}</td>
                      <td className="border px-4 py-2">{booking.user?.name ?? 'N/A'}</td>
                      <td className={`border px-4 py-2 ${booking.status === 'pending' ? 'text-orange-400 font-semibold' : booking.status === 'accepted' ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}`}>
                      {booking.status}
                    </td>
                      <td className="border px-4 py-2">{booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</td>
                      <td className="border px-4 py-2">
                        <Link className="text-blue-600 hover:text-blue-900 mr-2 font-semibold" href={route('teacher.bookings.show', booking.id)}>View</Link>
                        <button
                          className="text-green-600 hover:text-green-900 mr-2 font-semibold"
                          onClick={() => handleBookingAction(booking.id, 'accept')}
                        >
                          Accept
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 font-semibold"
                          onClick={() => handleBookingAction(booking.id, 'reject')}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center col-span-full text-gray-500" colSpan={5}>No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-4 mx-4 lg:mx-10">
        <div className="bg-white shadow-sm sm:rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <FaServer className="mr-2" /> My History
            </h2>
          </div>
          <div className="overflow-y-auto " style={{ maxHeight: '200px' }}>
            <table className="min-w-full bg-white mb-4">
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
                {Array.isArray(sortedBookings) && sortedBookings.length > 0 ? (
                  sortedBookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id}>
                      <td className="border px-4 py-2">{booking.service?.name ?? 'N/A'}</td>
                      <td className="border px-4 py-2">{booking.service?.teacher?.user?.name ?? 'N/A'}</td>
                      <td className="border px-4 py-2">{booking.service?.hourly_rate ?? 'N/A'}</td>
                      <td className={`border px-4 py-2 ${booking.status === 'pending' ? 'text-orange-400 font-semibold' : booking.status === 'accepted' ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}`}>
                      {booking.status}
                    </td>
                      <td className="border px-4 py-2">{booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</td>
                      <td className="border px-4 py-2">
                        <Link className="text-blue-600 hover:text-blue-900 mr-2 font-semibold" href={route('teacher.bookings.show', booking.id)}>View</Link>
                        <Link className="text-yellow-600 hover:text-yellow-900 mr-2 font-semibold" href={route('teacher.bookings.edit', booking.id)}>Edit</Link>
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

      <MyDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} className={
                    "inline-block w-full max-w-lg p-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
                }>
        {selectedService && (
          <div>
            {selectedService.image && (
             <div className="flex justify-center mt-4">
             <img
                 src={selectedService.image ? `/storage/${selectedService.image}` : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"}
                 alt={selectedService.name}
                 className="h-28 w-28 rounded-full"
               />
           </div>
            )}
            
            <h2 className="text-xl font-bold">{selectedService.name}</h2>
            {selectedService.teacher && (
              <p className="mt-2">Teacher: {selectedService.teacher.user.name}</p>
            )}
            <p className="mt-2">{selectedService.description}</p>
            <p className="text-gray-700 mb-2">Experience: {selectedService.experience}</p>
            <p className="mt-2">Hourly Rate: Rs {selectedService.hourly_rate}</p>
            <div className="flex justify-center items-center mt-6">
            <Link href={route('teacher.bookings.create', { service_id: selectedService.id })} className="text-blue-600 hover:text-blue-900">
              Book Service
            </Link>
            </div>
            
          </div>
        )}
      </MyDialog>



    </TeacherLayout>
  );
}
