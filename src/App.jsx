import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import { Footer } from './components/footer.jsx';
import ResultatGallery from './components/ResultatGallery.jsx';
import NavBar from './components/NavBar.jsx';
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
            <NavBar />
            <ExportDropdownButton />
            <ResultatGallery />
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
