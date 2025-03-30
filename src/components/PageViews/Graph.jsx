import ArticleViewsGraph from './ArticleViewsGraph';
import { useContext } from 'react';
import PageViewsContext from './Context';
export default function ArticlesGraph() {
    const { pages, dateType, project, platform, agent, dates } = useContext(PageViewsContext);
    const articlesData = pages.map((article) => ({
        article: encodeURIComponent(article),
        project: encodeURIComponent(project),
        acess: encodeURIComponent(platform),
        agents: encodeURIComponent(agent),
        dateType: encodeURIComponent(dateType),
        start: dates.start,
        end: dates.end,
    }));

    return <ArticleViewsGraph articles={articlesData} />;
}
