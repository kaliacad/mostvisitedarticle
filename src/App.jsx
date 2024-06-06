import ArticleCard from './components/ArticleCard';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';

function App() {
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <div>
            <h2>Most visited wikimedia articles</h2>
            <ArticleCard />
            <MostArticleByProject project='fr.wikipedia' />
            <Button text='submit' event={handleClick}></Button>
        </div>
    );
}

export default App;
