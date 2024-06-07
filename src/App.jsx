import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import Metadata from './components/metadata/metadata.jsx';
import ExportDropdownButton from './components/DropdownExport.jsx';
import { Menu } from './components/Menu';
import { datab } from '../data';
import { useState } from 'react';
import ResultListArticles from './components/ResultListArticles.jsx';
import TopVisited from './components/TopVisited.jsx';
import ResultatGallery from './components/ResultatGallery.jsx';
import ArticleCard from './components/ArticleCard.jsx';

function App() {
    const titre = 'Pays';
    const handleClick = () => {
        alert('Button clicked!');
    };
    const [showArticles, setShowArticles] = useState(false);

    const handleClicked = () => {
        setShowArticles(!showArticles);
    };
    return (
        <div>
            <Metadata />
            <h2>Most visited wikimedia articles</h2>
            <ExportDropdownButton />
            <button onClick={handleClicked}>Toggle Articles/Gallery</button>

            {showArticles ? <ResultListArticles /> : <ResultatGallery />}
            <ArticleCard />

            <TopVisited />
            <SetDate />
            <Menu data={datab} title={titre} />
            <MostArticleByProject project='fr.wikipedia' />
            <Button text='submit' event={handleClick}></Button>
        </div>
    );
}

export default App;
