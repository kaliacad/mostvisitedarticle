// PLACEHOLDER DATA

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
            <div>
                {data
                    ? data.map((article) => (
                          <div key={article.rank} style={{ display: 'flex', alignItems: 'center', padding: 10, borderBottom: '1px solid #ccc' }}>
                              <span style={{ fontWeight: 'bold', marginRight: 10 }}>{article.rank}</span>
                              <span style={{ flex: 1 }}>{article.article}</span>
                              <span>{article.project}</span>
                              <span style={{ fontSize: 14, color: '#666' }}>{article.views_ceil} views</span>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
