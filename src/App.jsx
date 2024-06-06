import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';
import Button from './components/Button.jsx';
import WikiAfricaTopArticles from './components/africanArticlesList.jsx';
import ResultListArticles from './components/ResultListArticles.jsx';
function App() {
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <div>
            <ResultListArticles />
            <h2>Most visited wikimedia articles</h2>
            <SetDate />
            <MostArticleByProject project='fr.wikipedia' />
            <Button text='submit' event={handleClick}></Button>
            <WikiAfricaTopArticles />
        </div>
    );
}

export default App;
