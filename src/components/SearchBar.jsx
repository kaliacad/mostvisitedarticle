import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const SearchBar = ({ articles, setFilteredArticles }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value !== '') {
            const filtered = articles.filter((el) => el.article.toLowerCase().includes(value.toLowerCase()));
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(articles);
        }
    };
    return (
        <div className='flex items-center gap-[10px] py-2 px-5 border border-solid border-gray-700 rounded-full'>
            <FontAwesomeIcon icon={faMagnifyingGlass} color='gray' />
            <input className='outline-none' type='text' value={searchTerm} onChange={handleSearch} placeholder='Rechercher des articles...' />
        </div>
    );
};

export default SearchBar;
