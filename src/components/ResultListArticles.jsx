const data = [
    {
        rank: 1,
        article: 'Article 1',
        views: 2849,
    },
    {
        rank: 2,
        article: 'Article 2',
        views: 23,
    },
    {
        rank: 3,
        article: 'Article 3',
        views: 3,
    },
    {
        rank: 4,
        article: 'Article 4',
        views: 3,
    },
];

// PLACEHOLDER DATA

export default function ResultListArticles() {
    // props { rank, article, views }

    // NOTE

    // <ResulatList
    return (
        <div>
            <div>
                {data
                    ? data.map((article) => (
                          <div key={article.rank} style={{ display: 'flex', alignItems: 'center', padding: 10, borderBottom: '1px solid #ccc' }}>
                              <span style={{ fontWeight: 'bold', marginRight: 10 }}>{article.rank}</span>
                              <span style={{ flex: 1 }}>{article.article}</span>
                              <span style={{ fontSize: 14, color: '#666' }}>{article.views} views</span>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
}
