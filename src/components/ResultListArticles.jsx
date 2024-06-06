import { useEffect, useState } from 'react';
import fetchTopArticles from '../api';

export default function ResultListArticles() {
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
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Articles List</h1>
            <table style={{ border: '1px solid black', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black' }}>Rank</th>
                        <th style={{ border: '1px solid black' }}>Articles</th>
                        <th style={{ border: '1px solid black' }}>Project</th>
                        <th style={{ border: '1px solid black' }}>Views</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        ? data.map((article) => (
                              <tr key={article.rank}>
                                  <td style={{ border: '1px solid black', textAlign: 'center' }}>{article.rank}</td>
                                  <td style={{ border: '1px solid black' }}>{article.article}</td>
                                  <td style={{ border: '1px solid black' }}>{article.project}</td>
                                  <td style={{ border: '1px solid black' }}>{article.views_ceil} views</td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </table>
        </div>
    );
}
