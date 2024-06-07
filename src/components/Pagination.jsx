import { useEffect } from 'react';
import PropTypes from 'prop-types';

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
    }, [items, itemsPerPage]);

    useEffect(() => {
        const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        onPageChange(currentPage, paginatedItems);
    }, [currentPage, items, itemsPerPage, onPageChange]);

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
        <div className='pagination'>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

Pagination.propTypes = {
    items: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
