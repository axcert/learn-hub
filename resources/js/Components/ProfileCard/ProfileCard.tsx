import React from "react";
import img from "@/../../public/asstts/img/degree.jpeg";
import StarRating from "../StarRating/StarRating";
import { Link } from "@inertiajs/react";

export default function ProfileCard() {
    return (
        <div>
            <div className="w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center p-10">
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={img}
                        alt="Bonnie image"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white uppercase ">
                        Java
                    </h5>
                    <hr className="my-1 w-full border-gray-300" />
                    <div className="mt-1">
                        {/* <StarRating rating={service.average_rating || 0} /> */}
                        <StarRating rating={null} />
                    </div>
                    <hr />

                    <div className=" mt-4 md:mt-6 capitalize">
                        <p className="text-gray-600">Teacher: imesh</p>
                        <p className="text-gray-600">Service: Java</p>
                    </div>
                    <Link
                    href=""
                    className="mt-2">
                    <p className="text-blue-600 py-1 px-10 text-sm bg-blue-300 rounded-lg cursor-pointer hover:underline">Rs : 500</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
