import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import { Footer } from './components/footer.jsx';
import ResultatGallery from './components/ResultatGallery.jsx';
import ResultListArticles from './components/ResultListArticles.jsx';
import ExportDropdownButton from './components/DropdownExport.jsx';
import NavBar from './components/NavBar.jsx';
import ArticleCard from './components/ArticleCard.jsx';
import { useState } from 'react';
function App() {
    const handleClick = () => {
        alert('Button clicked!');
    };
    const [showArticles, setShowArticles] = useState(false);

    const handleClicked = () => {
        setShowArticles(!showArticles);
    };
    return (
        <div id='results'>
            <ExportDropdownButton htmlId='results' fileName='results' />
            <NavBar />
            <button onClick={handleClicked}>Toggle Articles/Gallery</button>
            {showArticles ? <ResultListArticles /> : <ResultatGallery />}

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
