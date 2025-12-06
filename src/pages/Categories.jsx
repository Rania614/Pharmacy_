import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, X, ArrowRight, Home, Heart, Pill, Sparkles, Stethoscope, Droplet } from 'lucide-react';
import { getProductsBySubCategory, getProductsByBrand, getProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useTranslation } from '../hooks/useTranslation';

function Categories() {
  const { subCategory, brand } = useParams();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('bestSeller');
  const [selectedFilters, setSelectedFilters] = useState({
    skinType: '',
    hairType: '',
    priceRange: [0, 500],
  });

  // Main categories to display
  const mainCategories = [
    {
      name: t('categories.heartMedicines'),
      nameEn: 'Medicines',
      subCategory: 'قلب',
      icon: '💊',
      color: 'from-red-50 to-red-100',
      path: '/categories/قلب',
    },
    {
      name: t('categories.diabetesMedicines'),
      nameEn: 'Diabetes Medicines',
      subCategory: 'سكر',
      icon: '💉',
      color: 'from-blue-50 to-blue-100',
      path: '/categories/سكر',
    },
    {
      name: t('categories.cosmetics'),
      nameEn: 'Cosmetics',
      category: 'تجميل',
      icon: '✨',
      color: 'from-pink-50 to-pink-100',
      path: '/categories?category=تجميل',
    },
    {
      name: t('categories.supplements'),
      nameEn: 'Supplements',
      icon: '💊',
      color: 'from-green-50 to-green-100',
      path: '/categories',
    },
    {
      name: t('categories.medicalDevices'),
      nameEn: 'Medical Devices',
      icon: '🩺',
      color: 'from-purple-50 to-purple-100',
      path: '/categories',
    },
    {
      name: t('categories.personalCare'),
      nameEn: 'Personal Care',
      icon: '🧴',
      color: 'from-yellow-50 to-yellow-100',
      path: '/categories',
    },
  ];

  // Brands for cosmetics
  const cosmeticBrands = [
    { name: "L'Oréal", brand: "L'Oréal", icon: '✨' },
    { name: 'Nivea', brand: 'Nivea', icon: '🧴' },
  ];

  // Get category name
  const getCategoryName = () => {
    if (subCategory) {
      return subCategory === 'قلب' ? t('categories.heartMedicines') : 
             subCategory === 'سكر' ? t('categories.diabetesMedicines') : subCategory;
    }
    if (brand) return brand;
    if (categoryParam) {
      return categoryParam === 'تجميل' ? t('categories.cosmetics') : categoryParam;
    }
    return t('nav.categories');
  };

  // Check if we're viewing a specific category or showing all categories
  const isViewingCategory = subCategory || brand || categoryParam;

  // Load products
  useEffect(() => {
    if (!isViewingCategory) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const loadProducts = async () => {
      let data = [];
      if (subCategory) {
        data = await getProductsBySubCategory(subCategory);
      } else if (brand) {
        data = await getProductsByBrand(brand);
      } else if (categoryParam) {
        data = await getProducts();
        data = data.filter(p => p.category === categoryParam);
      } else {
        data = await getProducts();
      }
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, [subCategory, brand, categoryParam, isViewingCategory]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!isViewingCategory) return [];
    
    let filtered = [...products];

    // Apply filters
    if (selectedFilters.skinType) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(selectedFilters.skinType.toLowerCase()) ||
        p.description?.toLowerCase().includes(selectedFilters.skinType.toLowerCase())
      );
    }
    if (selectedFilters.hairType) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(selectedFilters.hairType.toLowerCase()) ||
        p.description?.toLowerCase().includes(selectedFilters.hairType.toLowerCase())
      );
    }
    if (selectedFilters.priceRange[0] > 0 || selectedFilters.priceRange[1] < 500) {
      filtered = filtered.filter(p => 
        p.price >= selectedFilters.priceRange[0] && p.price <= selectedFilters.priceRange[1]
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'bestSeller':
        return filtered;
      case 'newest':
        return [...filtered].sort((a, b) => b.id - a.id);
      case 'priceLow':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return [...filtered].sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [products, selectedFilters, sortBy, isViewingCategory]);

  // Get related products (different category)
  const relatedProducts = useMemo(() => {
    if (!isViewingCategory) return [];
    const currentCategory = subCategory || brand || categoryParam;
    return products
      .filter(p => p.category !== currentCategory && p.subCategory !== currentCategory && p.brand !== currentCategory)
      .slice(0, 4);
  }, [products, subCategory, brand, categoryParam, isViewingCategory]);

  const clearFilters = () => {
    setSelectedFilters({
      skinType: '',
      hairType: '',
      priceRange: [0, 500],
    });
  };

  // Breadcrumbs
  const breadcrumbs = [
    { name: t('nav.home'), path: '/' },
    ...(categoryParam ? [{ name: getCategoryName(), path: `/categories?category=${categoryParam}` }] : []),
    ...(subCategory ? [{ name: getCategoryName(), path: `/categories/${subCategory}` }] : []),
    ...(brand ? [{ name: brand, path: `/brand/${brand}` }] : []),
  ];

  // Filter options based on category
  const getFilterOptions = () => {
    if (categoryParam === 'تجميل' || brand === "L'Oréal" || brand === 'Nivea') {
      return {
        skinType: [
          { value: 'جافة', label: t('filters.drySkin') },
          { value: 'دهنية', label: t('filters.oilySkin') },
          { value: 'مختلطة', label: t('filters.combinationSkin') },
          { value: 'حساسة', label: t('filters.sensitiveSkin') },
        ],
        hairType: [
          { value: 'جاف', label: t('filters.dryHair') },
          { value: 'دهني', label: t('filters.oilyHair') },
          { value: 'تالف', label: t('filters.damagedHair') },
          { value: 'عادي', label: t('filters.normalHair') },
        ],
      };
    }
    return { skinType: [], hairType: [] };
  };

  const filterOptions = getFilterOptions();

  // If not viewing a specific category, show category selection
  if (!isViewingCategory) {
    return (
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-primary transition">
                {t('nav.home')}
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-gray-900 font-semibold">{t('nav.categories')}</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {t('nav.categories')}
        </h1>

        {/* Main Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('categories.allCategories')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {mainCategories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.path}
                className="group"
              >
                <div className={`bg-gradient-to-br ${cat.color} rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col`}>
                  <div className="p-8 flex items-center justify-center min-h-[200px]">
                    <div className="text-7xl transform group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-gray-900 text-center">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Cosmetics Brands (if viewing cosmetics category) */}
        {categoryParam === 'تجميل' && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('categories.cosmeticsBrands')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl">
              {cosmeticBrands.map((brandItem) => (
                <Link
                  key={brandItem.brand}
                  to={`/brand/${brandItem.brand}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-primary p-8 text-center">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {brandItem.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {brandItem.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // If viewing a specific category, show products
  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronLeft className="w-4 h-4" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-semibold">{crumb.name}</span>
              ) : (
                <Link to={crumb.path} className="hover:text-primary transition">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {getCategoryName()}
          </h1>
          <Link
            to="/categories"
            className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('categories.backToCategories')}
          </Link>
        </div>
        <p className="text-gray-600">
          {t('categories.found')} {filteredAndSortedProducts.length} {t('categories.products')}
        </p>
      </div>

      {/* Filters and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 md:hidden"
        >
          <Filter className="w-5 h-5" />
          {t('products.filters')}
        </button>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">{t('categories.sortBy')}:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="bestSeller">{t('categories.bestSeller')}</option>
            <option value="newest">{t('categories.newest')}</option>
            <option value="priceLow">{t('categories.priceLow')}</option>
            <option value="priceHigh">{t('categories.priceHigh')}</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters Panel */}
        <div className={`md:col-span-1 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{t('products.filters')}</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                {t('products.clearAll')}
              </button>
            </div>

            <div className="space-y-6">
              {/* Skin Type Filter (for cosmetics) */}
              {filterOptions.skinType.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('filters.skinType')}
                  </label>
                  <div className="space-y-2">
                    {filterOptions.skinType.map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="skinType"
                          value={option.value}
                          checked={selectedFilters.skinType === option.value}
                          onChange={(e) => setSelectedFilters({ ...selectedFilters, skinType: e.target.value })}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Hair Type Filter (for cosmetics) */}
              {filterOptions.hairType.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('filters.hairType')}
                  </label>
                  <div className="space-y-2">
                    {filterOptions.hairType.map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hairType"
                          value={option.value}
                          checked={selectedFilters.hairType === option.value}
                          onChange={(e) => setSelectedFilters({ ...selectedFilters, hairType: e.target.value })}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('products.price')}: {selectedFilters.priceRange[0]} - {selectedFilters.priceRange[1]} {t('common.egp')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={selectedFilters.priceRange[0]}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        priceRange: [parseInt(e.target.value) || 0, selectedFilters.priceRange[1]],
                      })
                    }
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('products.from')}
                  />
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={selectedFilters.priceRange[1]}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        priceRange: [selectedFilters.priceRange[0], parseInt(e.target.value) || 500],
                      })
                    }
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('products.to')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64" />
              ))}
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-2">{t('products.noProducts')}</p>
              <p className="text-gray-400">{t('products.tryFilters')}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t('categories.relatedProducts')}
                    </h2>
                    <Link
                      to="/products"
                      className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1"
                    >
                      {t('products.seeAll')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
