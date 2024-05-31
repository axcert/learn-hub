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
            className={className}

            onClick={onClick}
        >
            {name}
        </button>
    );
}
