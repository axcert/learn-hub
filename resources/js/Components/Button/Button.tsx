import React from "react";

interface ButtonProps {
  name: string;
  className?: string;
  onClick:()=>void;
}
export default function Button({name , className,onClick}:ButtonProps) {
    return (
        <button
            type="button"
            className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center me-2 mb-2 ${className ? className : ""}`}

            onClick={onClick}
        >
            {name}
        </button>
    );
}
