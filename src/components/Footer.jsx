import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Clock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">🌿</span>
              </div>
              <span className="text-xl font-bold">MediHeal</span>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition">
                  {t('nav.categories')}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition">
                  {t('nav.cart')}
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-white transition">
                  {t('nav.wishlist')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition">
                  {t('nav.profile')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.categories')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/قلب" className="text-gray-400 hover:text-white transition">
                  {t('categories.heartMedicines')}
                </Link>
              </li>
              <li>
                <Link to="/categories/سكر" className="text-gray-400 hover:text-white transition">
                  {t('categories.diabetesMedicines')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition">
                  {t('categories.cosmetics')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition">
                  {t('categories.supplements')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition">
                  {t('categories.medicalDevices')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition">
                  {t('categories.personalCare')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">{t('footer.phone')}</p>
                  <a href="tel:+201234567890" className="text-white hover:text-primary transition">
                    +20 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">{t('footer.email')}</p>
                  <a href="mailto:info@mediheal.com" className="text-white hover:text-primary transition">
                    info@mediheal.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">{t('footer.address')}</p>
                  <p className="text-white">
                    {t('footer.addressLine1')}<br />
                    {t('footer.addressLine2')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">{t('footer.workingHours')}</p>
                  <p className="text-white">
                    {t('footer.workingHoursTime')}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MediHeal. {t('footer.allRightsReserved')}
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-gray-400 hover:text-white transition">
                {t('footer.terms')}
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition">
                {t('footer.privacy')}
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition">
                {t('footer.about')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
