import React from 'react';

interface StarRatingProps {
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.588 4.91a1 1 0 00.95.69h5.17c.969 0 1.371 1.24.588 1.81l-4.184 3.034a1 1 0 00-.364 1.118l1.589 4.91c.3.921-.755 1.688-1.54 1.118L10 15.347a1 1 0 00-1.176 0l-4.184 3.034c-.784.57-1.839-.197-1.539-1.118l1.588-4.91a1 1 0 00-.364-1.118L.488 10.337c-.784-.57-.38-1.81.588-1.81h5.17a1 1 0 00.95-.69l1.588-4.91z" />
                </svg>
            );
        } else {
            stars.push(
                <svg
                    key={i}
                    className="w-4 h-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.588 4.91a1 1 0 00.95.69h5.17c.969 0 1.371 1.24.588 1.81l-4.184 3.034a1 1 0 00-.364 1.118l1.589 4.91c.3.921-.755 1.688-1.54 1.118L10 15.347a1 1 0 00-1.176 0l-4.184 3.034c-.784.57-1.839-.197-1.539-1.118l1.588-4.91a1 1 0 00-.364-1.118L.488 10.337c-.784-.57-.38-1.81.588-1.81h5.17a1 1 0 00.95-.69l1.588-4.91z" />
                </svg>
            );
        }
    }

    return <div className="flex">{stars}</div>;
};

export default StarRating;
