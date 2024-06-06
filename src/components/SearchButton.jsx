import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchButton() {
    return (
        <div className='search-btn'>
            <input type='search' name='search' placeholder='Search for articles' />
            <button type='submit' className='search-btn-icon'>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}
