import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Heart, Minus, Plus, Star, ChevronDown, ChevronUp, Phone, Truck, Package, AlertTriangle } from 'lucide-react';
import { getProductById, getProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import useCartStore from '../stores/cartStore';
import useWishlistStore from '../stores/wishlistStore';
import { useTranslation } from '../hooks/useTranslation';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedQA, setExpandedQA] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const addItem = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) =>
    product ? state.isInWishlist(product.id) : false
  );
  const { t } = useTranslation();

  // Get category name for breadcrumb
  const getCategoryName = () => {
    if (!product) return '';
    
    // If subCategory exists, use it (e.g., "قلب" -> "أدوية القلب", "سكر" -> "أدوية السكر")
    if (product.subCategory) {
      if (product.subCategory === 'قلب') return t('categories.heartMedicines');
      if (product.subCategory === 'سكر') return t('categories.diabetesMedicines');
      return product.subCategory;
    }
    
    // Otherwise use category (e.g., "تجميل" -> "منتجات التجميل")
    if (product.category === 'تجميل') return t('categories.cosmetics');
    return product.category || t('nav.products');
  };

  // Get category path for breadcrumb
  const getCategoryPath = () => {
    if (!product) return '/products';
    
    // If subCategory exists, link to subCategory page
    if (product.subCategory) {
      if (product.subCategory === 'قلب' || product.subCategory === 'سكر') {
        return `/categories/${product.subCategory}`;
      }
    }
    
    // If category is "تجميل", link to cosmetics category
    if (product.category === 'تجميل') {
      return '/categories?category=تجميل';
    }
    
    return '/products';
  };

  // Mock images gallery (using same image for now, but can be extended)
  const productImages = product ? [
    product.image,
    product.image,
    product.image,
  ] : [];

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await getProductById(parseInt(id));
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: 'أحمد محمد',
      rating: 5,
      date: '2024-01-15',
      comment: 'منتج ممتاز وفعال جداً، أنصح به بشدة',
    },
    {
      id: 2,
      name: 'فاطمة علي',
      rating: 4,
      date: '2024-01-10',
      comment: 'جودة عالية وسعر مناسب',
    },
  ];

  // Mock Q&A
  const qa = [
    {
      id: 1,
      question: 'ما هي الجرعة الموصى بها؟',
      answer: 'الجرعة الموصى بها هي قرص واحد يومياً بعد الأكل.',
    },
    {
      id: 2,
      question: 'هل يمكن استخدامه مع أدوية أخرى؟',
      answer: 'يُنصح باستشارة الطبيب قبل الاستخدام مع أدوية أخرى.',
    },
    {
      id: 3,
      question: 'ما هي مدة الصلاحية؟',
      answer: 'مدة الصلاحية 24 شهراً من تاريخ الإنتاج.',
    },
  ];

  // Get similar products
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    if (product) {
      getProducts().then((products) => {
        const similar = products
          .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
          .slice(0, 4);
        setSimilarProducts(similar);
      });
    }
  }, [product]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-200 animate-pulse rounded-lg h-96" />
          <div className="space-y-4">
            <div className="bg-gray-200 animate-pulse rounded-lg h-8" />
            <div className="bg-gray-200 animate-pulse rounded-lg h-8" />
            <div className="bg-gray-200 animate-pulse rounded-lg h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-lg">{t('productDetail.notFound')}</p>
        <Link to="/products" className="text-primary hover:text-primary/80 font-semibold mt-4 inline-block">
          {t('productDetail.back')}
        </Link>
      </div>
    );
  }

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
            <ArrowRight className="w-4 h-4" />
            <Link to={getCategoryPath()} className="hover:text-primary transition">
              {getCategoryName()}
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Image Gallery */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-8">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-2 p-4 border-t border-gray-200">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === index
                        ? 'border-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Product Info & Sidebar */}
        <div className="md:col-span-1 space-y-6">
          {/* Product Basic Info */}
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-primary">
                {product.price.toFixed(2)} {t('common.egp')}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.5) - {reviews.length} {t('productDetail.reviews')}</span>
            </div>
          </div>

          {/* Dosage */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">{t('productDetail.dosage')}</p>
                <p className="text-sm text-gray-700">{t('productDetail.dosageInfo')}</p>
              </div>
            </div>
          </div>

          {/* Medical Warnings */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-red-900 mb-1">{t('productDetail.warnings')}</p>
                <p className="text-sm text-red-800">{t('productDetail.warningsInfo')}</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('productDetail.quantity')}
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 rounded-full transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 min-w-[4rem] text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 rounded-full transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full hover:bg-primary/90 transition font-semibold text-lg mb-4"
            >
              <ShoppingCart className="w-6 h-6" />
              {t('productDetail.addToCart')}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full transition font-semibold mb-4 ${
                isInWishlist
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              {isInWishlist ? t('productDetail.inWishlist') : t('productDetail.addToWishlist')}
            </button>

            {/* Expected Delivery */}
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t('productDetail.expectedDelivery')}</p>
                  <p className="text-sm text-gray-600">{t('productDetail.deliveryTime')}</p>
                </div>
              </div>
            </div>

            {/* Consult Pharmacist Button */}
            <button className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-full hover:bg-primary/10 transition font-semibold">
              <Phone className="w-5 h-5" />
              {t('productDetail.consultPharmacist')}
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('productDetail.description')}</h2>
            <p className={`text-gray-700 leading-relaxed ${!showFullDescription ? 'line-clamp-3' : ''}`}>
              {product.description || t('productDetail.descriptionPlaceholder')}
            </p>
            {product.description && product.description.length > 150 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-primary hover:text-primary/80 font-semibold mt-2"
              >
                {showFullDescription ? t('productDetail.showLess') : t('productDetail.showMore')}
              </button>
            )}
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('productDetail.ingredients')}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t('productDetail.ingredientsInfo')}
            </p>
          </div>

          {/* Product Details Table */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('productDetail.details')}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">{t('productDetail.category')}:</span>
                <span className="text-gray-600">{product.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">{t('productDetail.subCategory')}:</span>
                <span className="text-gray-600">{product.subCategory}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">{t('productDetail.brand')}:</span>
                <span className="text-gray-600">{product.brand}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-semibold text-gray-700">{t('productDetail.price')}:</span>
                <span className="text-gray-600">{product.price.toFixed(2)} {t('common.egp')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('productDetail.reviews')} ({reviews.length})
            </h2>
          </div>

          {/* Add Review Form */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('productDetail.addReview')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('productDetail.rating')}
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('productDetail.comment')}
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('productDetail.commentPlaceholder')}
                />
              </div>
              <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition font-semibold">
                {t('productDetail.submitReview')}
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Q&A Section */}
      <div className="mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('productDetail.questionsAnswers')}
          </h2>
          <div className="space-y-4">
            {qa.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedQA(expandedQA === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 text-right">{item.question}</span>
                  {expandedQA === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                {expandedQA === item.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Products Carousel */}
      {similarProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('productDetail.similarProducts')}
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
            {similarProducts.map((similarProduct) => (
              <ProductCard key={similarProduct.id} product={similarProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
