interface CardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
  }

export default function Card({title,children,className}:CardProps) {
    return (
        <div className={className}>
            <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-900 text-center">
               {title}
            </h4>
            <p className="mb-3 text-2xl  font-bold text-gray-700 text-center pt-2 ">
               {children}
            </p>
        </div>
    );
}
