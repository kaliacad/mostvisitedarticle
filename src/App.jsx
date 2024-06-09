import { Footer } from './components/footer.jsx';
import TopVisited from './components/TopVisited.jsx';
function App() {
    return (
        <div>
            <div className='container mx-auto py-4 mb-8'>
                <TopVisited />
            </div>
            <Footer />
        </div>
    );
}
export default App;
