import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import Metadata from './components/metadata/metadata.jsx';
import { Footer } from './components/footer.jsx';
import ResultatGallery from './components/ResultatGallery.jsx';

import NavBar from './components/NavBar.jsx';
import ArticleCard from './components/ArticleCard.jsx';
import ExportDropdownButton from './components/DropdownExport.jsx';
import { Menu } from './components/Menu';
import { datab } from '../data';

function App() {
    const titre = 'Pays';
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <div>
            <Metadata />
            <h2>Most visited wikimedia articles</h2>
            <ResultatGallery />
            <SetDate />
            <Menu data={datab} title={titre} />
            <MostArticleByProject project='fr.wikipedia' />
            <Button text='submit' event={handleClick}></Button>
            <WikiAfricaTopArticles />
            <NavBar />
            <ArticleCard />
            <ExportDropdownButton />
            <Footer />
        </div>
    );
}

export default App;
