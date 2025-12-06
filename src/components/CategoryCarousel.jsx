import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

function CategoryCarousel() {
  const { t } = useTranslation();

  const categories = [
    {
      name: t('categories.heartMedicines'),
      nameEn: 'Medicines',
      path: '/categories/قلب',
      image: '💊',
    },
    {
      name: t('categories.medicalDevices'),
      nameEn: 'Medical Devices',
      path: '/categories',
      image: '🩺',
    },
    {
      name: t('categories.personalCare'),
      nameEn: 'Personal Care',
      path: '/categories',
      image: '🧴',
    },
    {
      name: t('categories.healthWellness'),
      nameEn: 'Health & Wellness',
      path: '/categories',
      image: '❤️',
    },
    {
      name: t('categories.supplements'),
      nameEn: 'Vitamins',
      path: '/categories',
      image: '💊',
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            {t('categories.title')}
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Custom layout - 2 top, 1 middle full width, 2 bottom */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
            {/* Top Row - Two Cards */}
            <Link
              to={categories[0].path}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="flex-1 p-4 sm:p-6 flex items-center justify-center min-h-[120px] sm:min-h-[150px] bg-gray-50">
                  <div className="text-5xl sm:text-6xl transform group-hover:scale-110 transition-transform duration-300">
                    {categories[0].image}
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-white">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center line-clamp-2">
                    {categories[0].name}
                  </h3>
                </div>
              </div>
            </Link>

            <Link
              to={categories[1].path}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="flex-1 p-4 sm:p-6 flex items-center justify-center min-h-[120px] sm:min-h-[150px] bg-gray-50">
                  <div className="text-5xl sm:text-6xl transform group-hover:scale-110 transition-transform duration-300">
                    {categories[1].image}
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-white">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center line-clamp-2">
                    {categories[1].name}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Middle Row - Full Width Card */}
            <Link
              to={categories[2].path}
              className="group col-span-2"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="flex-1 p-6 sm:p-8 flex items-center justify-center min-h-[150px] sm:min-h-[180px] bg-gray-50">
                  <div className="text-6xl sm:text-7xl transform group-hover:scale-110 transition-transform duration-300">
                    {categories[2].image}
                  </div>
                </div>
                <div className="p-4 sm:p-5 bg-white">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center">
                    {categories[2].name}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Bottom Row - Two Cards */}
            <Link
              to={categories[3].path}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="flex-1 p-4 sm:p-6 flex items-center justify-center min-h-[120px] sm:min-h-[150px] bg-gray-50">
                  <div className="text-5xl sm:text-6xl transform group-hover:scale-110 transition-transform duration-300">
                    {categories[3].image}
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-white">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center line-clamp-2">
                    {categories[3].name}
                  </h3>
                </div>
              </div>
            </Link>

            <Link
              to={categories[4].path}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="flex-1 p-4 sm:p-6 flex items-center justify-center min-h-[120px] sm:min-h-[150px] bg-gray-50">
                  <div className="text-5xl sm:text-6xl transform group-hover:scale-110 transition-transform duration-300">
                    {categories[4].image}
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-white">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center line-clamp-2">
                    {categories[4].name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop: Asymmetric 3-column layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {/* Left Column - Two Cards Stacked */}
            <div className="flex flex-col gap-6">
              <Link
                to={categories[0].path}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="flex-1 p-8 flex items-center justify-center min-h-[200px] bg-gray-50">
                    <div className="text-7xl md:text-8xl transform group-hover:scale-110 transition-transform duration-300">
                      {categories[0].image}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      {categories[0].name}
                    </h3>
                  </div>
                </div>
              </Link>

              <Link
                to={categories[1].path}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="flex-1 p-8 flex items-center justify-center min-h-[200px] bg-gray-50">
                    <div className="text-7xl md:text-8xl transform group-hover:scale-110 transition-transform duration-300">
                      {categories[1].image}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      {categories[1].name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>

            {/* Center Card - Taller */}
            <Link
              to={categories[2].path}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="flex-1 p-8 flex items-center justify-center min-h-[450px] bg-gray-50">
                  <div className="text-7xl md:text-8xl transform group-hover:scale-110 transition-transform duration-300">
                    {categories[2].image}
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold text-gray-900 text-left">
                    {categories[2].name}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Right Column - Two Cards Stacked */}
            <div className="flex flex-col gap-6">
              <Link
                to={categories[3].path}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="flex-1 p-8 flex items-center justify-center min-h-[200px] bg-gray-50">
                    <div className="text-7xl md:text-8xl transform group-hover:scale-110 transition-transform duration-300">
                      {categories[3].image}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      {categories[3].name}
                    </h3>
                  </div>
                </div>
              </Link>

              <Link
                to={categories[4].path}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="flex-1 p-8 flex items-center justify-center min-h-[200px] bg-gray-50">
                    <div className="text-7xl md:text-8xl transform group-hover:scale-110 transition-transform duration-300">
                      {categories[4].image}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      {categories[4].name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryCarousel;
