export default function Card({title,children}:any) {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-900 text-center">
               {title}
            </h4>
            <p className="mb-3 text-2xl  font-bold text-gray-700 text-center pt-2 ">
               {children}
            </p>
        </div>
    );
}
