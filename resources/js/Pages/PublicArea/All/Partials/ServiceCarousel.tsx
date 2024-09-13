import React, { useRef } from "react";
import "tailwindcss/tailwind.css";
import StarRating from "../../../../Components/StarRating/StarRating";
import { Link } from "@inertiajs/react";

interface Card {
    teacher: any;
    average_rating: number;
    id: number;
    image_url: string;
    title: string;
    name: string;
    description: string;
    hourly_rate?: number;
    rating?: number;
}

interface CarouselProps {
    data: Card[];
    auth: {
        user: {
            role: string;
        };
    };
}

const ServiceCarousel: React.FC<CarouselProps> = ({ data, auth }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div
                ref={containerRef}
                className="overflow-x-scroll scrollbar-hide mb-4 relative px-0.5 m-5 p-5 "
                style={{ overflowY: "hidden" }}
            >
                <div
                    className="flex snap-x snap-mandatory gap-4"
                    style={{ width: "max-content" }}
                >
                    {data.slice(0, 20).map((card) => (
                        <Link href={route("register")} className="">
                            <div
                                key={card.id}
                                className="w-full md:w-64 mx-auto mb-4 md:mb-0 md:max-w-sm hover:shadow-xl hover:transition hover:ease-in-out rounded-xl"
                            >
                                <div className="bg-white border border-gray-200 rounded-xl">
                                    <div className="flex flex-col items-center p-4 md:p-6">
                                        <img
                                            className="w-24 h-24 mb-2 rounded-full shadow-lg"
                                            src={card.image_url}
                                            alt={card.title}
                                        />
                                        <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize">
                                            {card.name}
                                        </h5>
                                        <hr className="my-1 w-full border-gray-300" />
                                        <div className="mt-1">
                                            <StarRating
                                                rating={card.average_rating}
                                            />
                                        </div>
                                        <div className="mt-3 text-sm text-gray-600">
                                            <p>
                                                Teacher:{" "}
                                                {card.teacher.user.name}
                                            </p>
                                        </div>
                                        <div className="mt-3 text-sm text-gray-600">
                                            <p>Service: {card.description}</p>
                                        </div>

                                        <p className="font-bold text-center mt-2 p-2 text-white bg-gray-900 rounded-lg cursor-pointer hover:font-bold hover:bg-blue-800">
                                            Rs: {card.hourly_rate}/hr
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ServiceCarousel;
