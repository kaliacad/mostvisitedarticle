import ArticleViewsGraph from './ArticleViewsGraph';
import { useContext } from 'react';
import PageViewsContext from './Context';
export default function ArticlesGraph() {
    const [[dateType], [project], [article], [platform], [agent]] = useContext(PageViewsContext);
    const articleData = {
        article: encodeURIComponent(article),
        project: encodeURIComponent(project),
        acess: encodeURIComponent(platform),
        agents: encodeURIComponent(agent),
        dateType: encodeURIComponent(dateType),
        // start:`${todayYear}0101`,
        // end:`${todayYear}${todayMonth}${todayDay}`,
    };

    return <ArticleViewsGraph article={articleData} />;
}
