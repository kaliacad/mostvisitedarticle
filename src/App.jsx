import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import { Footer } from './components/footer.jsx';
import ResultatGallery from './components/ResultatGallery.jsx';
import NavBar from './components/NavBar.jsx';
import ArticleCard from './components/ArticleCard.jsx';
import ExportDropdownButton from './components/DropdownExport.jsx';
import ResultListArticles from './components/ResultListArticles.jsx';
function App() {
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <div id='results'>
            <ExportDropdownButton htmlId='results' fileName='results' />
            <NavBar />
            <ResultListArticles />
            <ResultatGallery />
            <ArticleCard />
            <SetDate />
            <MostArticleByProject project='fr.wikipedia' />
            <Button text='submit' event={handleClick}></Button>
            <WikiAfricaTopArticles />
            <Footer />
        </div>
    );
}

export default App;
