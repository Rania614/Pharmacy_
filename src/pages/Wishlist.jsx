import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingCart, Trash2, Sparkles } from 'lucide-react';
import useWishlistStore from '../stores/wishlistStore';
import useCartStore from '../stores/cartStore';
import ProductCard from '../components/ProductCard';
import { useTranslation } from '../hooks/useTranslation';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';

function Wishlist() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useTranslation();
  const { toasts, showToast, removeToast } = useToast();
  const [filter, setFilter] = useState('all'); // 'all' or 'available'

  const handleAddToCart = (product) => {
    addItem(product);
    showToast(t('wishlist.addedToCart'), 'success');
  };

  const handleRemove = (productId) => {
    removeItem(productId);
    showToast(t('wishlist.removed'), 'error');
  };

  const handleAddAllToCart = () => {
    filteredItems.forEach((item) => addItem(item));
    showToast(t('wishlist.allAddedToCart'), 'success');
  };

  const handleClearAll = () => {
    clearWishlist();
    showToast(t('wishlist.cleared'), 'error');
  };

  // Filter items
  const filteredItems = useMemo(() => {
    if (filter === 'available') {
      // Assume all items are available for now
      return items;
    }
    return items;
  }, [items, filter]);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">{t('wishlist.title')}</h1>
        {items.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={handleAddAllToCart}
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-full hover:bg-green-600 transition font-semibold text-sm sm:text-base w-full sm:w-auto"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {t('wishlist.addAllToCart')}
            </button>
            <button
              onClick={handleClearAll}
              className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-full hover:bg-red-600 transition font-semibold text-sm sm:text-base w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              {t('wishlist.clearAll')}
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      {items.length > 0 && (
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition font-semibold ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('wishlist.all')}
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-full transition font-semibold ${
              filter === 'available'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('wishlist.availableOnly')}
          </button>
        </div>
      )}

      {/* Results Count */}
      {items.length > 0 && (
        <div className="mb-4 text-gray-600">
          {t('wishlist.found')} {filteredItems.length} {t('wishlist.items')}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <Heart className="w-24 h-24 text-gray-300 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('wishlist.empty')}</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">{t('wishlist.emptyDesc')}</p>
          
          {/* Suggestions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('wishlist.discoverNew')}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/categories/قلب"
                className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                {t('categories.heartMedicines')}
              </Link>
              <Link
                to="/categories?category=تجميل"
                className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                {t('categories.cosmetics')}
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                {t('products.allProducts')}
              </Link>
            </div>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
          >
            {t('wishlist.browse')}
            <ArrowRight className="mr-2 w-5 h-5" />
          </Link>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-2">{t('wishlist.noFilteredItems')}</p>
          <button
            onClick={() => setFilter('all')}
            className="text-primary hover:text-primary/80 font-semibold"
          >
            {t('wishlist.showAll')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative group">
              <ProductCard product={item} />
              
              {/* Action Buttons Overlay */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition shadow-lg"
                  title={t('wishlist.moveToCart')}
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                  title={t('wishlist.remove')}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Action Buttons */}
              <div className="md:hidden mt-2 flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition font-semibold"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm">{t('wishlist.moveToCart')}</span>
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
