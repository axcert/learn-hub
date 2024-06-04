import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`p-4 md:p-6 lg:p-8 ${className}`}>
      <h4 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 text-center">
        {title}
      </h4>
      <p className="mb-3 text-base md:text-lg lg:text-xl font-bold text-gray-700 text-center pt-2">
        {children}
      </p>
    </div>
  );
};

export default Card;
