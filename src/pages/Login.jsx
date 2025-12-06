import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Truck, HeadphonesIcon, Star, Phone } from 'lucide-react';
import { getProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryCarousel from '../components/CategoryCarousel';
import BestSellerProducts from '../components/BestSellerProducts';
import DailyOffers from '../components/DailyOffers';
import { useTranslation } from '../hooks/useTranslation';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getProducts().then((products) => {
      setFeaturedProducts(products.slice(0, 8));
    });
  }, []);

  return (
    <div className="pb-16 md:pb-0">
      {/* Hero Banner - MediHeal Style with Mauve Palette */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary text-white py-16 md:py-24 overflow-hidden">
        {/* Background Text */}
        <div className="absolute bottom-0 left-0 text-[200px] md:text-[300px] font-black text-white/5 leading-none">
          PHARM
            </div>

        {/* Logo for Mobile - Top Right of Screen */}
        <div className="md:hidden absolute top-4 right-4 z-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary text-2xl font-bold">🌿</span>
            </div>
            <span className="text-xl font-bold text-white">MediHeal</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 relative z-10">

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {t('hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                {/* Top Row: Phone Icon + Shop Now Button (Mobile) */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  {/* Contact Icon - Only visible on Mobile */}
                  <button className="md:hidden inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-full hover:bg-white/30 transition flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </button>
                  
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center bg-primary-50 text-primary px-6 md:px-8 py-3 rounded-full font-bold hover:bg-primary-100 transition shadow-lg flex-1 md:flex-initial"
                  >
                    {t('hero.shopNow')}
                  </Link>
                </div>
                
                {/* Bottom Row: Explore More Button */}
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center border-2 border-white text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition w-full md:w-auto"
                >
                  {t('hero.exploreMore')}
                </Link>
            </div>

              {/* Rating/Social Proof */}
              <div className="flex items-center gap-3 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary-200 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-primary-300 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-primary-400 border-2 border-white"></div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-white/80">{t('hero.ratedBy')} 2,400+ {t('hero.families')}</span>
          </div>
                </div>
                  </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Image Placeholder - يمكن استبدالها بصورة حقيقية */}
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center">
                    <div className="w-full h-96 bg-white/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">👩‍⚕️</div>
                        <p className="text-white/80">صورة الطبيبة</p>
                  </div>
                </div>
              </div>

                  {/* Product Card Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-xl p-3 shadow-xl max-w-[180px]">
                    <div className="flex items-start gap-2">
                      <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">💊</span>
                </div>
                  <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-800 mb-1">Hyaluronic Acid</p>
                        <p className="text-xs text-gray-500">Quamtrax nutrition acid</p>
                      </div>
                      <button className="text-primary">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                    </button>
                </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Daily Offers */}
      <DailyOffers />

      {/* Shop by Category - Carousel */}
      <CategoryCarousel />

      {/* Best Seller Products */}
      <BestSellerProducts />

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
            </div>
              <h3 className="text-xl font-bold mb-2">{t('features.authentic')}</h3>
              <p className="text-gray-600">{t('features.authenticDesc')}</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary" />
          </div>
              <h3 className="text-xl font-bold mb-2">{t('features.fastDelivery')}</h3>
              <p className="text-gray-600">{t('features.fastDeliveryDesc')}</p>
                </div>

            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('features.support')}</h3>
              <p className="text-gray-600">{t('features.supportDesc')}</p>
                </div>
              </div>
                </div>
      </section>

      {/* Featured Products - Hidden on Mobile */}
      <section className="hidden md:block py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{t('products.title')}</h2>
            <Link
              to="/products"
              className="text-primary hover:text-primary/80 font-semibold flex items-center"
            >
              {t('products.seeAll')}
              <ArrowLeft className="mr-1 w-4 h-4" />
            </Link>
              </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            </div>
          </div>
        </section>
    </div>
  );
}

export default Home; 
