import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PageViewsContext from './Context';
import Interval from './Interval';

const OptionsForm = () => {
    const { dateType, setDateType, project, setProject, platform, setPlatform, agent, setAgent } = useContext(PageViewsContext);
    const { t } = useTranslation();

    return (
        <div className='options-form w-1/5 p-4 border border-gray-300 rounded-md bg-white'>
            <h3>{t('pageViews.title')}:</h3>
            <div className='form-group'>
                <label htmlFor='project'>{t('article.project')}</label>
                <input type='text' id='project' value={project} onChange={(e) => setProject(e.target.value)} />
            </div>
            <Interval />
            <div className='form-group'>
                <label htmlFor='dateType'>{t('form.date')}</label>
                <select id='dateType' value={dateType} onChange={(e) => setDateType(e.target.value)}>
                    <option>Daily</option>
                    <option>Monthly</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='platform'>{t('form.platform')}</label>
                <select id='platform' value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    <option value='all-access'>{t('form.allAccess')}</option>
                    <option value='desktop'>{t('form.desktop')}</option>
                    <option value='mobile-web'>{t('form.mobileWeb')}</option>
                    <option value='mobile-app'>{t('form.mobileApp')}</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='agent'>Agent</label>
                <select id='agent' value={agent} onChange={(e) => setAgent(e.target.value)}>
                    <option value='all-agent'>{t('form.allAccess')}</option>
                    <option value='user'>User</option>
                    <option value='spider'>Spider</option>
                    <option value='automated'>Bot</option>
                </select>
            </div>
        </div>
    );
};

export default OptionsForm;
