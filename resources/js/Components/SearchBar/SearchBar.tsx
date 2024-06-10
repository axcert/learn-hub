import React, { useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

interface SearchBarProps {
    title: string;
    onClick: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
}

export default function SearchBar({
    title,
    onClick,
    onChange,
    searchTerm,
}: SearchBarProps) {
    const [showCancel, setShowCancel] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setShowCancel(!!e.target.value);
    };

    const handleCancel = () => {
        onChange({
            target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
        setShowCancel(false);
    };

    return (
        <section className="flex flex-col sm:flex-row justify-between items-center py-4 px-5">
            <div className="mb-4 sm:mb-0">
                <p className="text-start font-bold text-xl sm:text-2xl px-5">
                    {title}
                </p>
            </div>
            <div>
                <div>
                    <p className="text-sm text-gray-400 pb-1">
                        <span className="text-red-500">*</span>Please enter at
                        least 2 letter to search...
                    </p>
                </div>
                <div className="w-full sm:w-80 flex items-center gap-1">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <IoSearch className="text-gray-400" />
                        </div>
                        <input
                            className="block w-full px-5 h-10 pl-10 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            type="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onClick();
                                }
                            }}
                        />

                        {showCancel && (
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                onClick={handleCancel}
                            ></button>
                        )}
                    </div>
                    <button
                        type="button"
                        className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm px-5 h-10 "
                        onClick={onClick}
                    >
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
}
