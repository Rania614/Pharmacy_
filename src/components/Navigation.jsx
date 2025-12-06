import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid3x3, ShoppingCart, Heart, User, Search, ChevronDown, Pill, Phone, Languages } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import useCartStore from '../stores/cartStore';
import useWishlistStore from '../stores/wishlistStore';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import { getProducts } from '../data/products';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const categoriesRef = useRef(null);
  const searchRef = useRef(null);
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  const isActive = (path) => location.pathname === path;

  // Load products for search
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  // Search autocomplete
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm, products]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategories(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setShowSearchResults(false);
      setSearchTerm('');
    }
  };

  const handleSearchResultClick = (productId) => {
    navigate(`/products/${productId}`);
    setShowSearchResults(false);
    setSearchTerm('');
  };

  const mainCategories = [
    { name: t('categories.heartMedicines'), path: '/categories/قلب' },
    { name: t('categories.diabetesMedicines'), path: '/categories/سكر' },
    { name: t('categories.cosmetics'), path: '/categories' },
    { name: t('categories.supplements'), path: '/categories' },
    { name: t('categories.medicalDevices'), path: '/categories' },
    { name: t('categories.personalCare'), path: '/categories' },
  ];

  return (
    <>
      {/* Desktop Top Navigation - Transparent Background */}
      <nav className="hidden md:block sticky top-8 z-50 px-4">
        <div className="container mx-auto">
          <div className="bg-primary/50 backdrop-blur-lg rounded-full shadow-xl px-6 py-3 flex items-center justify-between gap-4 border border-white/30">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary text-xl font-bold">🌿</span>
              </div>
              <span className="text-xl font-bold text-white">MediHeal</span>
            </Link>

            {/* Categories Dropdown */}
            <div className="relative flex-shrink-0" ref={categoriesRef}>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center gap-1 px-4 py-2 text-white hover:text-primary-50 transition rounded-full hover:bg-white/10 font-semibold"
              >
                <Grid3x3 className="w-5 h-5" />
                <span>{t('nav.categories')}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showCategories && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-2xl p-2 min-w-[250px] z-50 border border-gray-100">
                  {mainCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      to={cat.path}
                      className="block px-4 py-2 hover:bg-primary/10 rounded-full text-right transition"
                      onClick={() => setShowCategories(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar with Autocomplete */}
            <div className="flex-1 max-w-2xl relative" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm && setShowSearchResults(true)}
                  className="w-full pr-12 pl-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </form>

              {/* Autocomplete Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl rounded-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchResultClick(product.id)}
                      className="w-full px-4 py-3 hover:bg-gray-50 text-right flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand} - {product.category}</p>
                      </div>
                      <span className="text-primary font-bold">{product.price.toFixed(2)} {t('common.egp')}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 text-white/80 hover:text-white transition rounded-full hover:bg-white/10 flex-shrink-0"
              title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Languages className="w-5 h-5" />
              <span className="text-sm font-semibold">{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative flex-shrink-0 p-2 text-white/80 hover:text-white transition rounded-full hover:bg-white/10"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex-shrink-0 p-2 text-white/80 hover:text-white transition rounded-full hover:bg-white/10"
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Contact Pharmacist Button */}
            <button className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full hover:bg-primary-50 transition flex-shrink-0 font-semibold">
              <Phone className="w-5 h-5" />
              <span className="hidden lg:inline">{t('nav.contactPharmacist')}</span>
            </button>

            {/* Profile */}
            <Link
              to="/login"
              className="flex-shrink-0 p-2 text-white/80 hover:text-white transition rounded-full hover:bg-white/10"
            >
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex items-center justify-around h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center flex-1 h-full transition ${
              isActive('/') ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <Home className={`w-6 h-6 ${isActive('/') ? 'text-primary' : ''}`} />
            <span className="text-xs mt-1">{t('nav.home')}</span>
          </Link>

          <Link
            to="/categories"
            className={`flex flex-col items-center justify-center flex-1 h-full transition ${
              isActive('/categories') ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <Grid3x3 className={`w-6 h-6 ${isActive('/categories') ? 'text-primary' : ''}`} />
            <span className="text-xs mt-1">{t('nav.categories')}</span>
          </Link>

          <Link
            to="/cart"
            className={`relative flex flex-col items-center justify-center flex-1 h-full transition ${
              isActive('/cart') ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <ShoppingCart className={`w-6 h-6 ${isActive('/cart') ? 'text-primary' : ''}`} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1/2 translate-x-4 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
            <span className="text-xs mt-1">{t('nav.cart')}</span>
          </Link>

          <Link
            to="/wishlist"
            className={`relative flex flex-col items-center justify-center flex-1 h-full transition ${
              isActive('/wishlist') ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <Heart className={`w-6 h-6 ${isActive('/wishlist') ? 'text-primary' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1/2 translate-x-4 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
            <span className="text-xs mt-1">{t('nav.wishlist')}</span>
          </Link>

          <Link
            to="/login"
            className={`flex flex-col items-center justify-center flex-1 h-full transition ${
              isActive('/login') ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <User className={`w-6 h-6 ${isActive('/login') ? 'text-primary' : ''}`} />
            <span className="text-xs mt-1">{t('nav.profile')}</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
