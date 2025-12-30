import { useEffect } from 'react';

/*
This component needs some props as this one:
<Pagination items={data} itemsPerPage={10} onPageChange={handlePageChange} />
Where: 
- articles is the list of data to be displayed fetched
- itemsPerPage an number of data per page to be determined
- handlePageChange is a function to update the array of currentItems (items of the current page)  :    

Testez la fonctionnalité avec la route "/exemple_pagination"
*/

const Pagination = ({ items, itemsPerPage, onPageChange, onCurrentChange, currentPage, totalPages }) => {
    useEffect(() => {
        onCurrentChange(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, itemsPerPage]);

    useEffect(() => {
        const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        onPageChange(currentPage, paginatedItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, items, itemsPerPage]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onCurrentChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onCurrentChange(currentPage + 1);
        }
    };

    return (
        <div className='pagination flex items-center justify-center gap-4 my-4'>
            <button onClick={handlePrevious} disabled={currentPage === 1} className='bg-gray-300 hover:cursor-pointer'>
                Previous
            </button>
            <span className='mx-4 font-bold text-xl text-white'>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className='bg-gray-300 hover:cursor-pointer'>
                Next
            </button>
        </div>
    );
};

export default Pagination;
