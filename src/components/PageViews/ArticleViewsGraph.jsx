import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageViewsContext from './Context';
import Graph from './Graph';
import fetchPageViewsCount from '../../api/fetchPageViewsCount';

export default function ArticleViewsGraph() {
    const { pages, dateType, project, platform, agent, dates } = useContext(PageViewsContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            if (pages.length === 0 || !dates.start || !dates.end) {
                setData([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const results = await Promise.all(
                    pages.map((page) =>
                        fetchPageViewsCount({
                            article: page,
                            project,
                            acess: platform,
                            agents: agent,
                            dateType: dateType.toLowerCase(),
                            start: dates.start,
                            end: dates.end
                        }),
                    ),
                );

                setData(results);
            } catch (err) {
                setError(t('common.error'));
                console.error('Error fetching page views:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllViews();
    }, [articles]);

    return (
        <div className='graph w-full flex flex-col items-center p-4 bg-white border border-gray-300 rounded-md'>
            <h2 className='font-bold text-black text-xl self-start'>Views for Multiple Articles</h2>
            {loading ? (
                <Loading />
            ) : viewData.labels ? (
                <Line data={viewData} options={{ responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    }
                }} />
            ) : (
                <p className='text-white text-2xl absolute top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2'>No data available.</p>
            )}
        </div>
    );
};

export default ArticleViewsGraph;
