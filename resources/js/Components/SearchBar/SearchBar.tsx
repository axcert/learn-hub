import { useRef } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchBarprops{
    title: string;
    onClick: () => void;
}

export default function SearchBar({title , onClick} : SearchBarprops) {

    return (
        <section className="flex justify-between items-center">
            <div>
                <p className="text-start font-bold">{title}</p>
            </div>

            <div className="w-80">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <IoSearch className="text-gray-400" />
                    </div>

                    <input
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        type="search"
                        placeholder="Search..."
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm px-2 py-2"
                        onClick={onClick}
                    >
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
}
