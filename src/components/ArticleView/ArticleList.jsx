import getPageURL from '../../helpers/getPageUrl';
import { useTranslation } from 'react-i18next';

export default function ListArticlesResult({ articlesData }) {
    const { t } = useTranslation();

    return (
        <div className='p-4 text-white'>
            <div className='overflow-x-auto'>
                <table className='min-w-full'>
                    <thead>
                        <tr>
                            <th className='border-b border-solid border-black px-4 py-2 text-center'>{t('table.rank')}</th>
                            <th className='border-b border-solid border-black px-4 py-2 text-center'>{t('table.country')}</th>
                            <th className='border-b border-solid border-black px-4 py-2 text-left'>{t('table.articles')}</th>
                            <th className='border-b border-solid border-black px-4 py-2 text-left'>{t('table.project')}</th>
                            <th className='border-b border-solid border-black px-4 py-2 text-left'>{t('table.views')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articlesData
                            ? articlesData.map((article) => (
                                  <>
                                      {article.rank == 1 && (
                                          <tr className='text-center'>
                                              <td colSpan='5' className='text-xl pt-2 mb-3 border-b border-blue-500 border-solid'>
                                                  <b>{article.country}</b>
                                              </td>
                                          </tr>
                                      )}
                                      <tr key={article.rank}>
                                          <td className='border border-black px-4 py-2 text-center'>{article.rank}</td>
                                          <td className='border border-black px-4 py-2 text-center'>{article.country}</td>
                                          <td className='border border-black px-4 py-2'>
                                              <a
                                                  href={getPageURL(article.title, article.project)}
                                                  target='_blank'
                                                  className='text-blue-300 hover:text-blue-500'
                                              >
                                                  {article.title}
                                              </a>
                                          </td>
                                          <td className='border border-black px-4 py-2'>{article.project}</td>
                                          <td className='border border-black px-4 py-2'>{article.views}</td>
                                      </tr>
                                  </>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
