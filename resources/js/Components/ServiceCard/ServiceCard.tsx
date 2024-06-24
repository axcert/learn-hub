import React from "react";
import StarRating from "@/Components/StarRating/StarRating";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  onClick: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <div
      onClick={() => onClick(service)}
      key={service.id}
      className="cursor-pointer flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition"
    >
      <div className="flex-shrink-0">
        <img
          src={service.image ? `/storage/${service.image}` : "https://cdn-icons-png.flaticon.com/512/4762/4762311.png"}
          alt={service.name}
          className="h-16 w-16 rounded-full"
        />
      </div>
      <div className="mt-1">
        <StarRating rating={service.average_rating || 0} />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
          {service.name}
        </h3>
        {service.teacher && (
          <p className="mt-1 text-sm text-gray-600">
            Teacher: {service.teacher.user.name}
          </p>
        )}
        <p className="mt-1 text-sm text-gray-600">{service.description}</p>
        <p className="mt-1 text-sm font-semibold text-indigo-600">
          Rs: {service.hourly_rate}/hr
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
