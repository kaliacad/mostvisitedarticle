import SetDate from './components/setdate/setdate';
import MostArticleByProject from './components/MostArticleByProject';

function App() {
    return (
        <div>
            <h2>Most visited wikimedia articles</h2>
            <SetDate />
            <MostArticleByProject project='fr.wikipedia' />
        </div>
    );
}

export default App;
