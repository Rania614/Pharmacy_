import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, ShoppingCart } from 'lucide-react';
import { getProducts } from '../data/products';
import useCartStore from '../stores/cartStore';
import { useTranslation } from '../hooks/useTranslation';

function BestSellerProducts() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const { t } = useTranslation();

  useEffect(() => {
    getProducts().then((data) => {
      // عرض أول 8 منتجات كأفضل المنتجات مبيعاً
      setProducts(data.slice(0, 8));
    });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, Math.ceil(products.length / 4) - 1);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, Math.ceil(products.length / 4) - 1);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [products.length]);

  const handleAddToCart = (product) => {
    addItem(product);
  };

  const visibleProducts = products.slice(currentIndex * 4, (currentIndex + 1) * 4);
  const totalSlides = Math.ceil(products.length / 4);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative Floral Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary-200">
          <path
            d="M20 50 Q30 30 50 30 Q70 30 80 50 Q70 70 50 70 Q30 70 20 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="30" cy="40" r="3" fill="currentColor" />
          <circle cx="50" cy="35" r="3" fill="currentColor" />
          <circle cx="70" cy="40" r="3" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary-300">
          <path
            d="M20 50 Q30 30 50 30 Q70 30 80 50 Q70 70 50 70 Q30 70 20 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="50" cy="45" r="4" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Mobile */}
        <div className="md:hidden mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-right">
            {t('bestSeller.title')}
          </h2>
          <p className="text-sm text-gray-600 text-right leading-relaxed">
            {t('bestSeller.description')}
          </p>
        </div>

        {/* Header - Desktop */}
        <div className="hidden md:flex items-center justify-between mb-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-gray-900">
              {t('bestSeller.title')}
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              {t('bestSeller.description')}
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2 ml-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white hover:border-primary hover:bg-primary-50 transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border-2 border-gray-300 bg-white hover:border-primary hover:bg-primary-50 transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Design - Small Cards Grid */}
        <div className="md:hidden mb-8">
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Product Image */}
                <Link to={`/products/${product.id}`} className="block">
                  <div className="relative bg-gray-50 p-4 min-h-[120px] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain max-h-[100px]"
                      loading="lazy"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-3 text-center">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-base font-bold text-primary mb-2">
                    {product.price.toFixed(2)} {t('common.egp')}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-primary text-white rounded-full py-2 px-3 text-xs font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    {t('bestSeller.addToCart')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Design - Carousel */}
        <div className="hidden md:block relative mb-12">
          <div className="overflow-hidden">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Product Image */}
                    <Link to={`/products/${product.id}`} className="block">
                      <div className="relative bg-gray-50 p-8 min-h-[250px] flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain max-h-[200px] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-6 text-center">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4">
                        {product.price.toFixed(2)} {t('common.egp')}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full border-2 border-gray-900 rounded-full py-2 px-4 hover:bg-gray-900 hover:text-white transition-all font-semibold flex items-center justify-center gap-2"
                      >
                        <span>{t('bestSeller.addToCart')}</span>
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots - Desktop Only */}
        <div className="hidden md:flex justify-center gap-2 mb-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-gray-300 w-8' : 'bg-gray-900'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* See All Products Button - Mobile */}
        <div className="md:hidden text-center mb-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm"
          >
            <span>{t('bestSeller.seeAll')}</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* See All Products Button - Desktop */}
        <div className="hidden md:block relative flex justify-center">
          {/* Decorative Starbursts */}
          <div className="absolute -top-4 -left-4 w-6 h-6 text-primary-400">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5L12 2Z" />
            </svg>
          </div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 text-primary-400">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5L12 2Z" />
            </svg>
          </div>
          
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-900 rounded-full bg-white hover:bg-gray-900 hover:text-white transition-all font-semibold"
          >
            <span>{t('bestSeller.seeAll')}</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BestSellerProducts;

