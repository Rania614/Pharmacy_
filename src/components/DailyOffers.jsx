import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

function DailyOffers() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const offers = [
    {
      id: 1,
      name: 'Panadol Extra',
      nameAr: 'بانادول إكسترا',
      brand: 'Panadol',
      originalPrice: 120,
      discountedPrice: 89,
      discount: 26,
      image: '💊',
      path: '/products/1',
    },
    {
      id: 2,
      name: 'L\'Oréal Paris Revitalift',
      nameAr: 'لوريال باريس ريفيتاليفت',
      brand: 'L\'Oréal',
      originalPrice: 450,
      discountedPrice: 320,
      discount: 29,
      image: '✨',
      path: '/products/2',
    },
    {
      id: 3,
      name: 'Nivea Soft Moisturizing Cream',
      nameAr: 'نيفيا سوفت كريم مرطب',
      brand: 'Nivea',
      originalPrice: 85,
      discountedPrice: 65,
      discount: 24,
      image: '🧴',
      path: '/products/3',
    },
    {
      id: 4,
      name: 'Aspirin Protect',
      nameAr: 'أسبرين بروتكت',
      brand: 'Aspirin',
      originalPrice: 95,
      discountedPrice: 70,
      discount: 26,
      image: '💊',
      path: '/products/4',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(offers.length / 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(offers.length / 2)) % Math.ceil(offers.length / 2));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const visibleOffers = offers.slice(currentIndex * 2, currentIndex * 2 + 2);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {t('dailyOffers.title')}
            </h2>
            <p className="text-gray-600">
              {t('dailyOffers.subtitle')}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
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

        {/* Offers Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {Array.from({ length: Math.ceil(offers.length / 2) }).map((_, slideIndex) => (
              <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                {offers.slice(slideIndex * 2, slideIndex * 2 + 2).map((offer) => (
                  <Link
                    key={offer.id}
                    to={offer.path}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-primary/20">
                      {/* Discount Badge */}
                      <div className="relative">
                        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{offer.discount}%
                        </div>
                        <div className="p-8 flex items-center justify-center min-h-[250px] bg-white/50">
                          <div className="text-8xl transform group-hover:scale-110 transition-transform duration-300">
                            {offer.image}
                          </div>
                        </div>
                      </div>

                      {/* Offer Info */}
                      <div className="p-6 bg-white">
                        <p className="text-sm text-gray-500 mb-1">{offer.brand}</p>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                          {offer.name}
                        </h3>

                        {/* Prices */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-bold text-primary">
                            {offer.discountedPrice.toFixed(2)} {t('common.egp')}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            {offer.originalPrice.toFixed(2)} {t('common.egp')}
                          </span>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full bg-primary text-white py-3 px-4 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                          {t('dailyOffers.addToCart')}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(offers.length / 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* See All Offers */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
          >
            <span>{t('dailyOffers.seeAll')}</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DailyOffers;
