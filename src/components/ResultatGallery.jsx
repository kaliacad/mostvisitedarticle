import { useEffect, useState } from 'react';
import fetchTopArticles from '../api';
import ArticleCard from './ArticleView/ArticleCard';
// import TopVisited from '../components/TopVisited'

export default function ResultatGallery() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function laodAPI() {
            setIsLoading(true);
            const d = await fetchTopArticles({
                countryCode: 'CD',
                access: 'all-access',
                year: '2023',
                month: '07',
                day: '01',
            });
            const resp = await d.items[0].articles;
            setData(resp);
            setIsLoading(false);
        }
        laodAPI();
    }, []);
    // props { rank, article, views }

    // NOTE
    //**IN YOUR LOCAL FUNCTION */
    /*
        export default function ResultatGallery({ rank, article, views }) {}
    */
    // **USE THIS LIKE THIS**
    // <ResulatGallery rank={rank} article={article} views={views} />

    return (
        <>
            <div style={{ margin: '2rem' }}>
                <div className='flex flex-wrap justify-center mx-auto  max-w-[50rem]'>
                    {isLoading ? (
                        <div className='loading-spinner'></div>
                    ) : data ? (
                        data.map((art, i) => (
                            <div className='w-1/2 p-4' key={i}>
                                <ArticleCard article={art.article} rank={art.rank} views_ceil={art.views_ceil} project={art.project} />
                            </div>
                        ))
                    ) : (
                        <div className='flex items-center justify-center h-full w-full'>
                            <p>No data Founds</p>
                        </div>
                    )}
                </div>
            </div>

            {/* <TopVisited /> */}
        </>
    );
}
