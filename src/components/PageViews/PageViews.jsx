import './pageviews.css';
import OptionsForm from './OptionsForm';
import ArticlesGraph from './Graph';
import { useState } from 'react';
import PageViewsContext from './Context';
export default function PageViews() {
    // const [dates, setDates] = useState('5/17/2024 - 6/6/2024');
    const [dateType, setDateType] = useState('Daily');
    const [project, setProject] = useState('en.wikipedia.org');
    const [article, setArticle] = useState('Julie_Gayet');
    const [platform, setPlatform] = useState('all-access');
    const [agent, setAgent] = useState('user');
    return (
        <div className='page-views flex flex-wrap justify-center gap-4 w-full p-4 mr-10'>
            <PageViewsContext.Provider
                value={[
                    // [dates, setDates],
                    [dateType, setDateType],
                    [project, setProject],
                    [article, setArticle],
                    [platform, setPlatform],
                    [agent, setAgent],
                ]}
            >
                <OptionsForm />
                <ArticlesGraph />
            </PageViewsContext.Provider>
        </div>
    );
}
