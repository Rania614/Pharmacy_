import { memo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import useCartStore from '../stores/cartStore';
import useWishlistStore from '../stores/wishlistStore';
import { useTranslation } from '../hooks/useTranslation';

const LazyImage = lazy(() => import('./LazyImage'));

const ProductCard = memo(({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const { t } = useTranslation();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Product Image Area - Top 2/3 */}
      <Link to={`/products/${product.id}`} className="relative block flex-[2] min-h-[200px] bg-gray-50 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center p-4">
          <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse" />}>
            <LazyImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain max-h-[200px]"
            />
          </Suspense>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Product Name */}
        <Link to={`/products/${product.id}`} className="block mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price and Quantity Row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-gray-900">
            {product.price.toFixed(2)} {t('common.egp')}
          </span>
          <span className="text-sm text-gray-500">
            25 {t('common.pieces')}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-auto">
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-full font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="truncate">{t('bestSeller.addToCart')}</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
              isInWishlist
                ? 'bg-primary border-primary text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-primary/50'
            }`}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist ? 'fill-current' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
