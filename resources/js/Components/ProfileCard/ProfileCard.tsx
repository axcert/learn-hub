// import React from "react";
// import StarRating from "../StarRating/StarRating";
// import { Link } from "@inertiajs/react";

// const ProfileCard = ({ img, title, name, service, rating ,price }:any) => {
//   return (
//     <div className="w-full md:w-64 mx-auto mb-4 md:mb-0 md:max-w-sm">
//       <div className="bg-white border border-gray-200 rounded-lg shadow">
//         <div className="flex flex-col items-center p-4 md:p-6 ">
//           <img
//             className="w-24 h-24 mb-2 rounded-full shadow-lg"
//             src={img}
//             alt={title}
//           />
//           <h5 className="mb-1 text-xl font-medium text-gray-900 uppercase">
//             {title}
//           </h5>
//           <hr className="my-1 w-full border-gray-300" />
//           <div className="mt-1">
//             <StarRating rating={rating} />
//           </div>
        
//           <div className="mt-3 text-sm text-gray-600">
//             <p>Teacher: {name}</p>
//             <p>Service: {service}</p>
//           </div>
//           <Link href={route('register')} className="mt-3 block w-full">
//             <p className="text-center py-2 text-blue-600 bg-blue-300 rounded-lg cursor-pointer hover:underline">
//               Rs : {price}
//             </p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;
import React, { useRef } from "react";
import StarRating from "../StarRating/StarRating";
import { Link } from "@inertiajs/react";

type Card = {
  img: string;
  title: string;
  name: string;
  service: string;
  rating: number;
  price: number;
};

type ProfileCardProps = {
  img: string;
  title: string;
  name: string;
  service: string;
  rating: number | null;
  price: number;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  img,
  title,
  name,
  service,
  rating,
  price,
}) => {
  return (
    <div className="w-full md:w-64 mx-auto mb-4 md:mb-0 md:max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col items-center p-4 md:p-6 snap-x snap-mandatory">
          <div className="snap-start w-full flex-shrink-0">
            <img
              className="w-24 h-24 mb-2 rounded-full shadow-lg"
              src={img}
              alt={title}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 uppercase">
              {title}
            </h5>
            <hr className="my-1 w-full border-gray-300" />
            <div className="mt-1">
              <StarRating rating={rating || 0} />
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p>Teacher: {name}</p>
              <p>Service: {service}</p>
            </div>
            <Link href={route('register')} className="mt-3 block w-full">
              <p className="text-center py-2 text-blue-600 bg-blue-300 rounded-lg cursor-pointer hover:underline">
                Rs: {price}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
