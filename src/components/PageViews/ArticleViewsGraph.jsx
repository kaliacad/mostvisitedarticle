import { useEffect, useState } from 'react';
import fetchPageViewsCount from '../../api/fetchPageViewsCount';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Loading from '../common/loading';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ArticleViewsGraph = ({ articles }) => {
    const [viewData, setViewData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllViews = async () => {
            try {
                const allDataPromises = articles.map(async (article) => {
                    const response = await fetchPageViewsCount(article);
                    const views = response.items;
                    const dates = views.map((view) => {
                        const year = view.timestamp.substring(0, 4);
                        const month = view.timestamp.substring(4, 6);
                        const day = view.timestamp.substring(6, 8);

                        const dateString = `${year}-${month}-${day}`;
                        const date = new Date(dateString);
                        return date.toLocaleDateString();
                    });
                    const counts = views.map((view) => view.views);
                    return { article: article.article, dates, counts };
                });

                const allData = await Promise.all(allDataPromises);

                const combinedDates = [...new Set(allData.flatMap((data) => data.dates))].sort((a, b) => new Date(a) - new Date(b));
                const datasets = allData.map((data, index) => ({
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

                setLoading(false);
            } catch (error) {
                setLoading(true);
                return;
            }
        };

        fetchAllViews();
    }, [articles]);

    return (
        <div className='graph w-full flex flex-col items-center'>
            <h2 className='font-bold text-white text-xl self-start'>Views for Multiple Articles</h2>
            {loading ? <Loading /> : viewData.labels ? <Line data={viewData} /> : <p>No data available.</p>}
        </div>
    );
};

export default ArticleViewsGraph;
