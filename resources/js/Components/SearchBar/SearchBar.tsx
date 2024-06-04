// import { IoSearch } from "react-icons/io5";

// interface SearchBarProps {
//     title: string;
//     onClick: () => void;
// }

// export default function SearchBar({ title, onClick }: SearchBarProps) {
//     return (
//         <section className="flex justify-between items-center">
//             <div>
//                 <p className="text-start font-bold px-5">{title}</p>
//             </div>
//             <div className="w-80">
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                         <IoSearch className="text-gray-400" />
//                     </div>

//                     <input
//                         className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
//                         type="search"
//                         placeholder="Search..."
//                     />
//                     <button
//                         type="submit"
//                         className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm px-2 py-2"
//                         onClick={onClick}
//                     >
//                         Search
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// }


import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
    title: string;
    onClick: () => void;
}

export default function SearchBar({ title, onClick }: SearchBarProps) {
    return (
        <section className="flex flex-col sm:flex-row justify-between items-center py-4 px-5">
            <div className="mb-4 sm:mb-0">
                <p className="text-start font-bold text-xl sm:text-2xl px-5">{title}</p>
            </div>
            <div className="w-full sm:w-80">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IoSearch className="text-gray-400" />
                    </div>
                    <input
                        className="block w-full p-4 pl-10 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        type="search"
                        placeholder="Search..."
                    />
                    <button
                        type="button"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm px-4 py-2"
                        onClick={onClick}
                    >
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
}
