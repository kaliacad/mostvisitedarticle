import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';

const ExemplePagination = () => {
    const [items, setItems] = useState([]);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // Hardcoded data for demonstration
        const data = Array.from({ length: 100 }, (_, index) => ({
            id: index + 1,
            title: `Item ${index + 1}`,
        }));
        setItems(data);
    }, []);

    const handlePageChange = (currentPage, paginatedItems) => {
        setPaginatedItems(paginatedItems);
    };
    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1>Paginated List</h1>
            <ul>
                {paginatedItems.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            <Pagination
                onCurrentChange={handleCurrentPage}
                totalPages={Math.ceil(items.length / itemsPerPage)}
                currentPage={currentPage}
                items={items}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ExemplePagination;
