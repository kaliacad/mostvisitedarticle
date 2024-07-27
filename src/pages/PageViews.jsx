import '../styles/pageviews.css';
import OptionsForm from '../components/PageViews/OptionsForm';
import ArticlesGraph from '../components/PageViews/Graph';
import { useState } from 'react';
import PageViewsContext from '../components/PageViews/Context';
import Pages from '../components/PageViews/Pages';
import { todayDay, todayMonth, todayYear } from '../helpers/dateNowSpliter';

export default function PageViews() {
    const [dates, setDates] = useState({ start: `${todayYear}0101`, end: `${todayYear}${todayMonth}${todayDay}` });
    const [pages, setPages] = useState([]);
    const [dateType, setDateType] = useState('Daily');
    const [project, setProject] = useState('fr.wikipedia.org');
    const [platform, setPlatform] = useState('all-access');
    const [agent, setAgent] = useState('user');
    return (
        <div className='page-views flex flex-wrap justify-center gap-4 w-full p-4 mr-10'>
            <PageViewsContext.Provider
                value={{
                    dates,
                    setDates,
                    pages,
                    setPages,
                    dateType,
                    setDateType,
                    project,
                    setProject,
                    platform,
                    setPlatform,
                    agent,
                    setAgent,
                }}
            >
                <OptionsForm />
                <div className='w-3/4'>
                    <Pages />
                    <ArticlesGraph />
                </div>
            </PageViewsContext.Provider>
        </div>
    );
}
