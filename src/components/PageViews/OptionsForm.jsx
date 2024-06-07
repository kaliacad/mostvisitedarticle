import { useContext } from 'react';
import PageViewsContext from './Context';

const OptionsForm = () => {
    const [[dateType, setDateType], [project, setProject], [article, setArticle], [platform, setPlatform], [agent, setAgent]] =
        useContext(PageViewsContext);
    return (
        <div className='options-form'>
            <h3>Options:</h3>
            <div className='form-group'>
                <label htmlFor='project'>Project</label>
                <input type='text' id='project' value={project} onChange={(e) => setProject(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='project'>Article Name</label>
                <input type='text' id='project' value={article} onChange={(e) => setArticle(e.target.value)} />
            </div>
            {/* <div className='form-group'>
                <label htmlFor='dates'>Dates</label>
                <input type='text' id='date-range' value={dates} onChange={(e) => setDates(e.target.value)} />
            </div> */}
            <div className='form-group'>
                <label htmlFor='dateType'>Date type</label>
                <select id='dateType' value={dateType} onChange={(e) => setDateType(e.target.value)}>
                    <option>Daily</option>
                    <option>Monthly</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='platform'>Platform</label>
                <select id='platform' value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    <option value={'all-access'}>All</option>
                    <option value='desktop'>Desktop</option>
                    <option value='mobile-web'>Mobile Web</option>
                    <option value='mobile-app'>Apps</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='agent'>Agent</label>
                <select id='agent' value={agent} onChange={(e) => setAgent(e.target.value)}>
                    <option>User</option>
                    <option>Spider</option>
                    <option>Bot</option>
                </select>
            </div>
        </div>
    );
};

export default OptionsForm;
