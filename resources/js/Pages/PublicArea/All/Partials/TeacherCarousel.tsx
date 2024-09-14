import React, { useRef, useEffect } from "react";
import StarRating from "../../../../Components/StarRating/StarRating"; // Keeping your original StarRating component
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

const TeacherCarousel: React.FC<CarouselProps> = ({ data, auth }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

    const scrollLeft = () => {
        containerRef.current!.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const totalScroll = containerRef.current.scrollWidth;
            const currentScroll = containerRef.current.scrollLeft;
            const containerWidth = containerRef.current.offsetWidth;

            if (currentScroll + containerWidth >= totalScroll) {
                containerRef.current!.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                containerRef.current!.scrollBy({
                    left: 300,
                    behavior: "smooth",
                });
            }
        }
    };

    // Infinite Autoplay
    useEffect(() => {
        autoplayInterval.current = setInterval(() => {
            scrollRight();
        }, 3000); // Scroll every 3 seconds

        return () => {
            if (autoplayInterval.current) {
                clearInterval(autoplayInterval.current); // Cleanup interval on unmount
            }
        };
    }, []);

    return (
        <div className="relative w-full">
            {/* Left Arrow */}
            <button
                className="absolute left-0 z-10 p-3 bg-white rounded-full shadow-lg top-1/2 transform -translate-y-1/2 hover:bg-gray-100"
                onClick={scrollLeft}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            {/* Carousel */}
            <div
                ref={containerRef}
                className="flex gap-4 overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
                style={{ scrollBehavior: "smooth" }}
            >
                {data.concat(data).map(
                    (
                        card,
                        index // Clone the cards for seamless loop
                    ) => (
                        <div
                            key={index}
                            className="snap-start flex-shrink-0 w-60 bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-transform transform hover:scale-105"
                        >
                            <Link
                                href={route(
                                    "student.teachers.show",
                                    card.teacher.id
                                )}
                                className="block"
                            >
                                <div className="flex flex-col items-center">
                                    <img
                                        className="w-full h-32 object-cover rounded-lg mb-3"
                                        src={card.teacher.user.image_url}
                                        alt={card.teacher.user.name}
                                    />
                                    <h5 className="text-lg font-bold text-gray-900 mb-2 text-center">
                                        {card.teacher.user.name}
                                    </h5>
                                    <StarRating rating={card.average_rating} />
                                    <p className="mt-1 text-sm text-gray-500 text-center">
                                        {card.teacher.position}
                                    </p>
                                    <p className="text-gray-600 text-center mb-2">
                                        {card.teacher.bio}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    )
                )}
            </div>

            {/* Right Arrow */}
            <button
                className="absolute right-0 z-10 p-3 bg-white rounded-full shadow-lg top-1/2 transform -translate-y-1/2 hover:bg-gray-100"
                onClick={scrollRight}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default TeacherCarousel;
