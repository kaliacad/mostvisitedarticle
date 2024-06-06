import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import { Footer } from './components/footer.jsx';
import ResultatGallery from './components/ResultatGallery.jsx';
import CountryPickList from './components/CountryPickList.jsx';
import SearchButton from './components/SearchButton.jsx';
function App() {
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <div>
            <h2>Most visited wikimedia articles</h2>
            <ResultatGallery />
            <CountryPickList />
            <SearchButton />
            <SetDate />
            <MostArticleByProject project='fr.wikipedia' />
            <Button text='submit' event={handleClick}></Button>
            <WikiAfricaTopArticles />
            <Footer />
        </div>
    );
}

export default App;
