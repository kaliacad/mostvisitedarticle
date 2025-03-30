import { createContext } from 'react';

const PageViewsContext = createContext({
    dates: { start: '', end: '' },
    setDates: () => {},
    pages: [],
    setPages: () => {},
    dateType: 'Daily',
    setDateType: () => {},
    project: 'fr.wikipedia.org',
    setProject: () => {},
    platform: 'all-access',
    setPlatform: () => {},
    agent: 'user',
    setAgent: () => {},
});

export default PageViewsContext;
