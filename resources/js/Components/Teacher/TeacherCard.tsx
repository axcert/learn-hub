import { Link } from "@inertiajs/react";
import StarRating from "@/Components/StarRating/StarRating";
import { Teacher, Service } from "@/types";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <Link
      href={route("teachers.show", teacher.id)}
      key={teacher.id}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
    >
      <div className="flex-shrink-0">
        <img
          className="h-16 w-16 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          alt={teacher.user.name}
        />
      </div>
      <div className="mt-1 flex justify-center">
        <StarRating rating={teacher.average_rating || 0} />
      </div>
      <hr className="my-1 w-full border-gray-300" />
      <div className="flex flex-wrap justify-center space-x-2">
        {teacher.services.map((service: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
          <span
            key={service.id}
            className="px-2 mt-1 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
          >
            {service.name}
          </span>
        ))}
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
          {teacher.user.name}
        </h3>
        <h4 className="mt-1 text-sm font-semibold text-gray-600">
          {teacher.position}
        </h4>
        <p className="mt-2 text-sm text-gray-600">{teacher.bio}</p>
      </div>
    </Link>
  );
};

export default TeacherCard;
