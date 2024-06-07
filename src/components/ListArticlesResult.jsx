import getPageURL from '../helpers/getPageUrl';

export default function ListArticlesResult({ articlesData }) {
    return (
        <div className='p-4'>
            <div className='overflow-x-auto'>
                <table className='min-w-full border border-black'>
                    <thead>
                        <tr>
                            <th className='border border-black px-4 py-2 text-center'>Rank</th>
                            <th className='border border-black px-4 py-2 text-left'>Articles</th>
                            <th className='border border-black px-4 py-2 text-left'>Project</th>
                            <th className='border border-black px-4 py-2 text-left'>Views</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articlesData
                            ? articlesData.map((article) => (
                                  <tr key={article.rank}>
                                      <td className='border border-black px-4 py-2 text-center'>{article.rank}</td>
                                      <td className='border border-black px-4 py-2'>
                                          <a
                                              href={getPageURL(article.article, article.project)}
                                              target='_blank'
                                              className='text-black hover:text-blue-500'
                                          >
                                              {article.article}
                                          </a>
                                      </td>
                                      <td className='border border-black px-4 py-2'>{article.project}</td>
                                      <td className='border border-black px-4 py-2'>{article.views_ceil} views</td>
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
