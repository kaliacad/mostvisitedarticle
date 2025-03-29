import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import ExportDropdownButton from './components/DropdownExport.jsx';
import { Menu } from './components/Menu';
import { datab } from '../data';
import { useState } from 'react';
import TopVisited from './components/TopVisited.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import { Footer } from './components/footer.jsx';
import Background from './components/backgr.jsx'; // Importez le composant Background

function App() {
    const titre = 'Pays';
    const handleClick = () => {};
    const [showArticles, setShowArticles] = useState(false);
    const handleClicked = () => {
        setShowArticles(!showArticles);
    };

    return (
        <Background>
            {' '}
            {/* Encapsulez tout votre contenu avec le Background */}
            <div className='container mx-auto py-4 relative z-10'>
                {' '}
                {/* Ajoutez relative z-10 pour que le contenu apparaisse au-dessus du fond */}
                <div className='flex align-center justify-center py-8'>
                    <ExportDropdownButton />
                    <button onClick={handleClicked}>Toggle Articles/Gallery</button>
                </div>
                <TopVisited />
                <SetDate />
                <Menu data={datab} title={titre} />
                <MostArticleByProject project='fr.wikipedia' />
                <Button text='submit' event={handleClick}></Button>
                <WikiAfricaTopArticles />
            </div>
            <Footer className='relative z-10' /> {/* Assurez-vous que le footer est aussi au-dessus du fond */}
        </Background>
    );
}

export default App;
