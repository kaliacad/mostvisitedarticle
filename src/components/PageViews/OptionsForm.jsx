import { useContext } from 'react';
import PageViewsContext from './Context';
import Interval from './Interval';
const OptionsForm = () => {
    const { dateType, setDateType, project, setProject, platform, setPlatform, agent, setAgent } = useContext(PageViewsContext);
    return (
        <div className='options-form w-1/5 p-4 border border-gray-300 rounded-md bg-white'>
            <h3>Options:</h3>
            <div className='form-group'>
                <label htmlFor='project'>Project</label>
                <input type='text' id='project' value={project} onChange={(e) => setProject(e.target.value)} />
            </div>
            <Interval />
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
                    <option value='all-access'>All</option>
                    <option value='desktop'>Desktop</option>
                    <option value='mobile-web'>Mobile Web</option>
                    <option value='mobile-app'>Apps</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='agent'>Agent</label>
                <select id='agent' value={agent} onChange={(e) => setAgent(e.target.value)}>
                    <option value='all-agent'>All</option>
                    <option value='user'>User</option>
                    <option value='spider'>Spider</option>
                    <option value={'automated'}>Bot</option>
                </select>
            </div>
        </div>
    );
};

export default OptionsForm;
