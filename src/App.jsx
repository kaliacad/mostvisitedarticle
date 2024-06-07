import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import ExportDropdownButton from './components/DropdownExport.jsx';
import { Menu } from './components/Menu';
import { datab } from '../data';
import Items from '../dataItem';
import { ListItems } from './components/ListeItem';
import { useState } from 'react';
import TopVisited from './components/TopVisited.jsx';
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
            <div className='container mx-auto py-4'>
                <div className='flex align-center justify-center py-8'>
                    <ExportDropdownButton />
                    <button onClick={handleClicked}>Toggle Articles/Gallery</button>
                </div>

                <TopVisited />
                <SetDate />
                <Menu data={datab} title={titre} />
                <MostArticleByProject project='fr.wikipedia' />
                <ListItems item={Items} />
                <Button text='submit' event={handleClick}></Button>
                <WikiAfricaTopArticles />
            </div>
            <Footer />
        </div>
    );
}
export default App;
