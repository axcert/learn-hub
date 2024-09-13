import React, { useRef } from "react";
import "tailwindcss/tailwind.css";
import StarRating from "../../../../Components/StarRating/StarRating";
import { Link } from "@inertiajs/react";
import img from "@/../../public/asstts/img/girl.jpg";

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

const TeacherCarousel: React.FC<CarouselProps> = ({ data, auth }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div
                ref={containerRef}
                className="overflow-x-scroll  scrollbar-hide mb-4 relative px-0.5 m-5  p-5"
                style={{ overflowY: "hidden" }}
            >
                <div
                    className="flex snap-x snap-mandatory gap-4 "
                    style={{ width: "max-content" }}
                >
                    {data.slice(0, 20).map((card) => (
                        <div
                            key={card.id}
                            className="w-full md:w-64 mx-auto mb-4 md:mb-0 md:max-w-sm hover:shadow-xl hover:transition hover:ease-in-out rounded-xl"
                        >
                            <div className="bg-white border border-gray-200 rounded-xl ">
                                <Link
                                    href={route(
                                        "student.teachers.show",
                                        card.teacher.id
                                    )}
                                    className="mt-3 block w-full"
                                >
                                    <div className="flex flex-col items-center p-4 md:p-6 ">
                                        <img
                                            className="w-24 h-24 mb-2 rounded-full shadow-lg"
                                            src={card.teacher.user.image_url}
                                        />
                                        <h5 className="mb-1 capitalize text-lg font-semibold leading-7 tracking-tight text-gray-900">
                                            {card.teacher.user.name}
                                        </h5>
                                        <hr className="my-1 w-full border-gray-300" />
                                        <div className="mt-1">
                                            <StarRating
                                                rating={card.average_rating}
                                            />
                                        </div>
                                        <div className="mt-3 text-sm">
                                            <p className="text-gray-500 font-semibold ">
                                                {card.teacher.position}
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <p className="text-gray-500 font-semibold">
                                                {card.teacher.bio}
                                            </p>
                                        </div>

                                        <p className="font-bold text-center mt-2 p-2 text-white bg-gray-900 rounded-lg cursor-pointer hover:font-bold hover:bg-blue-800 ">
                                            Go To Profile
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TeacherCarousel;
