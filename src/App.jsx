import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import { Footer } from './components/footer.jsx';
import NavBar from './components/NavBar.jsx';
import ExportDropdownButton from './components/DropdownExport.jsx';
import { Menu } from './components/Menu';
import { datab } from '../data';

import WikiAfricaTopArticles from './components/africanArticlesList.jsx';

import { useState } from 'react';
import ResultListArticles from './components/ResultListArticles.jsx';
import TopVisited from './components/TopVisited.jsx';
import ResultatGallery from './components/ResultatGallery.jsx';
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
            <NavBar />
            <ExportDropdownButton />
            <button onClick={handleClicked}>Toggle Articles/Gallery</button>
            {showArticles ? <ResultListArticles /> : <ResultatGallery />}

            <TopVisited />
            <SetDate />
            <Menu data={datab} title={titre} />
            <MostArticleByProject project='fr.wikipedia' />
            <Button text='submit' event={handleClick}></Button>
            <WikiAfricaTopArticles />
            <Footer />
        </div>
    );
}

export default App;
