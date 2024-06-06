import { useEffect, useState } from 'react';
import fetchTopArticles from '../api';
import ArticleCard from './ArticleCard';
// import TopVisited from '../components/TopVisited'

export default function ResultatGallery() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function laodAPI() {
            const d = await fetchTopArticles({
                countryCode: 'CD',
                access: 'all-access',
                year: '2023',
                month: '07',
                day: '01',
            });
            const resp = await d.items[0].articles;
            setData(resp);
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
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: '5rem' }}>
                    {data
                        ? data.map((art, i) => (
                              <ArticleCard key={i} article={art.article} rank={art.rank} views_ceil={art.views_ceil} project={art.project} />
                          ))
                        : null}
                </div>
            </div>

            {/* <TopVisited /> */}
        </>
    );
}
