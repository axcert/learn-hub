import ReactPaginate from "react-paginate";

interface PaginationProps {
    pageCount: number;
    onPageChange: (selected: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
    return (
        <div className="mt-4 flex justify-center">
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                containerClassName={
                    "flex justify-center items-center space-x-2 mt-4"
                }
                pageClassName={"mx-1"}
                pageLinkClassName={
                    "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white"
                }
                previousLinkClassName={
                    "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white"
                }
                nextLinkClassName={
                    "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-blue-500 hover:text-white"
                }
                breakLinkClassName={
                    "px-3 py-1 border border-gray-300 rounded-md text-gray-700"
                }
                activeClassName={"bg-blue-500 rounded-md text-white"}
            />
        </div>
    );
};

export default Pagination;
