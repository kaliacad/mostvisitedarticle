import { useEffect, useState } from 'react';
import fetchPageViewsCount from '../../api/fetchPageViewsCount';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Loading from '../loading';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ArticleViewsGraph = ({ article }) => {
    const [viewData, setViewData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchViews = async () => {
            try {
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

                setViewData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Views',
                            data: counts,
                            fill: false,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                        },
                    ],
                });
                setLoading(false);
            } catch (error) {
                setLoading(true);

                return;
            }
        };

        fetchViews();
    }, [article]);

    return (
        <div className='graph'>
            <h2>Views for {decodeURIComponent(article.article)}</h2>
            {loading ? <Loading /> : viewData.labels ? <Line data={viewData} /> : <p>No data available.</p>}
        </div>
    );
};

export default ArticleViewsGraph;
