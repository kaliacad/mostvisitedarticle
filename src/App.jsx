import ArticleCard from './components/ArticleCard';
import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import { Footer } from './components/footer.jsx';
import { datab } from '../data.js';
import { Menu } from './components/Menu.jsx';
function App() {
    const titre = 'Pays';
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <div>
            <h2>Most visited wikimedia articles</h2>
            <ArticleCard />
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
