import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

function NotFound() {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">{t('notFound.title')}</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">{t('notFound.subtitle')}</h2>
      <p className="text-gray-500 mb-8">
        {t('notFound.description')}
      </p>
      <Link
        to="/"
        className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition"
      >
        <Home className="w-5 h-5 mr-2" />
        {t('notFound.goHome')}
      </Link>
    </div>
  );
}

export default NotFound;
