import TopVisited from './components/TopVisited.jsx';
import { Footer } from './components/footer.jsx';
function App() {
    return (
        <div>
            <div className='container mx-auto py-4'>
                <TopVisited />
            </div>
            <Footer />
        </div>
    );
}
export default App;
