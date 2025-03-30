import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const defaultEvent = () => {
    const { t } = useTranslation();
    toast.info(t('button.eventRequired'));
};

export default function Button({ text, event, className }) {
    const { t } = useTranslation();
    const text2 = t('button.textRequired');

    return (
        <>
            <button onClick={event || defaultEvent} className={className}>
                {text || text2}
            </button>
        </>
    );
}
