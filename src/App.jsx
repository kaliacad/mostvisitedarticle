import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import { Footer } from './components/footer.jsx';
import ResultatGallery from './components/ResultatGallery.jsx';
import { datab } from '../data.js';
import { Menu } from './components/Menu';
function App() {
    const titre = 'Pays';
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <div>
            <h2>Most visited wikimedia articles</h2>
            <ResultatGallery />
            <SetDate />
            <MostArticleByProject project='fr.wikipedia' />
            <Button text='submit' event={handleClick}></Button>
            <WikiAfricaTopArticles />
            <Menu data={datab} title={titre} />
            <Footer />
        </div>
    );
}

export default App;
