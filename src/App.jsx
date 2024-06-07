import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import ExportDropdownButton from './components/DropdownExport.jsx';
import { Menu } from './components/Menu';
import { datab } from '../data';

import { useState } from 'react';
import ResultListArticles from './components/ResultListArticles.jsx';
import TopVisited from './components/TopVisited.jsx';
import ResultatGallery from './components/ResultatGallery.jsx';
import NavBar from './components/NavBar.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import { Footer } from './components/footer.jsx';

function App() {
    const titre = 'Pays';
    const handleClick = () => {};
    const [showArticles, setShowArticles] = useState(false);

    const handleClicked = () => {
        setShowArticles(!showArticles);
    };
    return (
        <div>
            <NavBar />
            <div className='container mx-auto py-4'>
                <div className='flex align-center justify-center'>
                    <ExportDropdownButton />
                    <button onClick={handleClicked}>Toggle Articles/Gallery</button>
                </div>

                <div className='bg-slate-100 py-8 my-8 px-4 rounded-md'>{showArticles ? <ResultListArticles /> : <ResultatGallery />}</div>

                <TopVisited />
                <SetDate />
                <Menu data={datab} title={titre} />
                <MostArticleByProject project='fr.wikipedia' />
                <Button text='submit' event={handleClick}></Button>
                <WikiAfricaTopArticles />
            </div>
            <Footer />
        </div>
    );
}

export default App;
