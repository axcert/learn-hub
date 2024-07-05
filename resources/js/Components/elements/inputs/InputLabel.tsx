import { LabelHTMLAttributes } from "react";

export default function InputLabel({
    value,
    required = false,
    className = "",
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
    value?: string;
    required?: boolean;
}) {
    return (
        <label
            {...props}
            className={`block font-[700] text-lg text-gray-800` + className}
        >
            {value ? value : children}
            {required && <span className="text-red-500">*</span>}
        </label>
    );
}
