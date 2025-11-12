
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="py-8 px-6 lg:px-8 border-t-2 border-(--accent-cyan)/30 footer">
      <div className="max-w-7xl mx-auto text-center">
        <p className="cyber-caption text-gray-400">
          {t('footer.designedBy')}{' '} 
          <span
            className="text-(--accent-cyan)"
            style={{ textShadow: '0 0 10px var(--accent-cyan)' }}
          >
            {t('footer.designerName')} 
          </span>
          {' '}· {t('footer.builtWith')} 
        </p>
        <p className="cyber-caption text-gray-600 mt-2 text-xs">
          {t('footer.copyright')} 
        </p>
      </div>
    </footer>
  );
}

export default Footer