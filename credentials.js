import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'MyApp/1.0 (Contact: tresorsawsawa@example.com)'
  },
});

export default axiosInstance;

// import MostArticleByProject from './components/MostArticleByProject';
// import Button from './components/Button.jsx';
// import MostVisitedArticleByCounty from './pages/MostVisitedArtiliclesByCountryAndDate/MostVisitedArtiliclesByCountryAndDate';

// const App = () => {
//     return (
//         <>
//             <MostVisitedArticleByCounty />
//         </>
//     );
// };
// function App() {
//     const handleClick = () => {
//         alert('Button clicked!');
//     };
//     return (
//         <div>
//             <h2>Most visited wikimedia articles</h2>
//             <MostArticleByProject project='fr.wikipedia' />
//             <Button text='submit' event={handleClick}></Button>
//         </div>
//     );
// }

// export default App;
