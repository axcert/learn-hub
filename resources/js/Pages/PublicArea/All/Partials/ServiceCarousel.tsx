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

const ServiceCarousel: React.FC<CarouselProps> = ({ data, auth }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

    // Scroll left and right functions
    const scrollLeft = () => {
        containerRef.current!.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        const totalScroll = containerRef.current!.scrollWidth;
        const currentScroll = containerRef.current!.scrollLeft;
        const containerWidth = containerRef.current!.offsetWidth;

        // If we're at the end, loop back to the beginning
        if (currentScroll + containerWidth >= totalScroll) {
            containerRef.current!.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            containerRef.current!.scrollBy({
                left: 300,
                behavior: "smooth",
            });
        }
    };

    // Autoplay every 3 seconds
    useEffect(() => {
        autoplayInterval.current = setInterval(() => {
            scrollRight();
        }, 3000);

        return () => {
            if (autoplayInterval.current)
                clearInterval(autoplayInterval.current); 
        };
    }, []);

    return (
        <div className="">
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
                className="flex snap-x snap-mandatory gap-4 overflow-hidden py-4 px-2 bg-white shadow-sm rounded-lg"
                style={{ scrollBehavior: "smooth" }}
            >
                {data.concat(data).map(
                    (
                        card,
                        index // Cloning items to simulate infinite scrolling
                    ) => (
                        <Link href={route("register")} key={index}>
                            <div className="snap-start flex-shrink-0 w-60 bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-transform transform hover:scale-105">
                                <div className="p-6">
                                    {/* Image */}
                                    <img
                                        className="w-24 h-24 mb-4 rounded-full shadow-lg mx-auto"
                                        src={card.image_url}
                                        alt={card.title}
                                    />
                                    {/* Service Name */}
                                    <h5 className="text-xl font-bold text-gray-900 text-center capitalize">
                                        {card.name}
                                    </h5>

                                    {/* Rating */}
                                    <div className="flex justify-center mt-3">
                                        <StarRating
                                            rating={card.average_rating}
                                        />
                                    </div>

                                    {/* Teacher Info */}
                                    <div className="text-sm text-gray-600 mt-4 text-center">
                                        <p className="font-medium">
                                            Teacher: {card.teacher.user.name}
                                        </p>
                                    </div>

                                    {/* Service Description */}
                                    <div className="text-sm text-gray-600 mt-2 text-center">
                                        <p>{card.description}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-4 text-center">
    <p className="font-semibold text-base p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md shadow-sm">
        Rs: {card.hourly_rate}/hr
    </p>
</div>


                                </div>
                            </div>
                        </Link>
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

export default ServiceCarousel;
