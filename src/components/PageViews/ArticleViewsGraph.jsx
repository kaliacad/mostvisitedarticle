import { useContext, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import PageViewsContext from './Context';
import Loading from '../common/loading';
import fetchPageViewsCount from '../../api/fetchPageViewsCount';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ArticleViewsGraph() {
    const { pages, dateType, project, platform, agent, dates } = useContext(PageViewsContext);
    const [viewData, setViewData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t, ready } = useTranslation('common', { useSuspense: false });

    const fetchData = useCallback(async () => {
        if (!ready || pages.length === 0 || !dates.start || !dates.end) {
            setViewData({});
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const results = await Promise.all(
                pages.map(async (page) => {
                    const response = await fetchPageViewsCount({
                        article: page,
                        project,
                        acess: platform,
                        agents: agent,
                        dateType: dateType?.toLowerCase(),
                        start: dates.start,
                        end: dates.end,
                    });

                    if (!response?.items) {
                        throw new Error('Invalid response format');
                    }

                    const views = response.items;
                    const dates = views.map((view) => {
                        const year = view.timestamp.substring(0, 4);
                        const month = view.timestamp.substring(4, 6);
                        const day = view.timestamp.substring(6, 8);
                        return `${year}-${month}-${day}`;
                    });
                    const counts = views.map((view) => view.views);
                    return { article: page, dates, counts };
                }),
            );

            const combinedDates = [...new Set(results.flatMap((data) => data.dates))].sort();
            const datasets = results.map((data, index) => ({
                label: decodeURIComponent(data.article),
                data: combinedDates.map((date) => {
                    const viewIndex = data.dates.indexOf(date);
                    return viewIndex !== -1 ? data.counts[viewIndex] : 0;
                }),
                fill: false,
                backgroundColor: `rgba(${75 + index * 50}, 192, 192, 0.6)`,
                borderColor: `rgba(${75 + index * 50}, 192, 192, 1)`,
            }));

            setViewData({
                labels: combinedDates,
                datasets,
            });
        } catch (err) {
            setError(t('common.error', 'An error occurred while fetching data'));
            setViewData({});
        } finally {
            setLoading(false);
        }
    }, [pages, dateType, project, platform, agent, dates, t, ready]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!ready) {
        return <Loading />;
    }

    return (
        <div className='graph w-full flex flex-col items-center p-4 bg-white border border-gray-300 rounded-md'>
            <h2 className='font-bold text-black text-xl self-start'>{t('pageViews.title', 'Page Views')}</h2>
            {error ? (
                <div className='text-red-500 text-center py-4'>{error}</div>
            ) : loading ? (
                <Loading />
            ) : viewData.labels && viewData.labels.length > 0 ? (
                <Line
                    data={viewData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    color: '#374151',
                                },
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#374151',
                                },
                            },
                            x: {
                                ticks: {
                                    color: '#374151',
                                },
                            },
                        },
                    }}
                />
            ) : (
                <div className='text-gray-500 text-center py-4'>{t('common.noData', 'No data available')}</div>
            )}
        </div>
    );
}
