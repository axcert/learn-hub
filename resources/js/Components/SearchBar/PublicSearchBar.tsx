import React from "react";
import { IoSearch, IoClose } from "react-icons/io5";

interface PublicSearchBarProps {
    placeholder: string;
    onClick: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
}

const PublicSearchBar: React.FC<PublicSearchBarProps> = ({
    placeholder,
    onClick,
    onChange,
    searchTerm,
}) => {
    const [showCancel, setShowCancel] = React.useState(false);

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
        <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoSearch className="text-gray-400" />
            </div>
            <input
                className="block w-full h-14 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                type="search"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
            />
            {showCancel && (
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={handleCancel}
                >
                    <IoClose />
                </button>
            )}
        </div>
    );
};

export default PublicSearchBar;
