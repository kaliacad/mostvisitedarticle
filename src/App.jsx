import Button from './components/Button.jsx';

function App() {
    const handleClick = () => {
        alert('Button clicked!');
    };
    return (
        <div>
            <h2>Most visited wikimedia articles</h2>
            <Button text='submit' event={handleClick}></Button>
        </div>
    );
}

export default App;
