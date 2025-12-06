import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, Wallet, Globe, ArrowRight, CheckCircle, X, Plus, Minus, Trash2 } from 'lucide-react';
import useCartStore from '../stores/cartStore';
import useAuthStore from '../stores/authStore';
import { useTranslation } from '../hooks/useTranslation';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';

function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();
  const { isAuthenticated, user } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Shipping address form
  const [shippingAddress, setShippingAddress] = useState({
    title: 'المنزل',
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: 'القاهرة',
    district: '',
    building: '',
    floor: '',
    apartment: '',
    notes: '',
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('cash'); // cash, card, online

  // Shipping method
  const [shippingMethod, setShippingMethod] = useState('standard'); // standard, express

  // Card details (for card payment)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    const subtotalValue = getTotal();
    const shipping = shippingMethod === 'express' ? 50 : 0;
    setSubtotal(subtotalValue);
    setShippingCost(shipping);
    setTotal(subtotalValue + shipping);
  }, [items, shippingMethod, getTotal]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = (productId) => {
    removeItem(productId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      showToast(t('checkout.loginRequired'), 'error');
      navigate('/login');
      return;
    }

    // Validate address
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address) {
      showToast(t('checkout.fillRequiredFields'), 'error');
      return;
    }

    // Validate card details if card payment
    if (paymentMethod === 'card' && (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv)) {
      showToast(t('checkout.fillCardDetails'), 'error');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showToast(t('checkout.orderPlaced'), 'success');
      clearCart();
      navigate('/profile?tab=orders');
    }, 2000);
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="mb-6">
        <Link to="/cart" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-4">
          <ArrowRight className="w-5 h-5 rotate-180" />
          {t('checkout.backToCart')}
        </Link>
        <h1 className="text-3xl font-bold">{t('checkout.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t('checkout.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              {t('checkout.shippingAddress')}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('checkout.addressTitle')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={shippingAddress.title}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="المنزل">{t('checkout.home')}</option>
                    <option value="العمل">{t('checkout.work')}</option>
                    <option value="أخرى">{t('checkout.other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('checkout.fullName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('checkout.phone')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('checkout.address')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('checkout.city')}
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('checkout.district')}
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.district}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, district: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('checkout.building')}
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.building}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, building: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('checkout.notes')}
                </label>
                <textarea
                  value={shippingAddress.notes}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, notes: e.target.value })}
                  rows="2"
                  placeholder={t('checkout.notesPlaceholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">{t('checkout.shippingMethod')}</h2>
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                shippingMethod === 'standard'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-600 hover:border-primary/50'
              }`}>
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-5 h-5 text-primary"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">{t('checkout.standardShipping')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('checkout.standardShippingDesc')}</div>
                  <div className="text-sm font-semibold text-green-600 mt-1">{t('checkout.free')}</div>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                shippingMethod === 'express'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-600 hover:border-primary/50'
              }`}>
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-5 h-5 text-primary"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">{t('checkout.expressShipping')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('checkout.expressShippingDesc')}</div>
                  <div className="text-sm font-semibold text-primary mt-1">50 {t('common.egp')}</div>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-primary" />
              {t('checkout.paymentMethod')}
            </h2>
            <div className="space-y-3 mb-4">
              <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                paymentMethod === 'cash'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-600 hover:border-primary/50'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-primary"
                />
                <Wallet className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">{t('checkout.cashOnDelivery')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('checkout.cashOnDeliveryDesc')}</div>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                paymentMethod === 'card'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-600 hover:border-primary/50'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-primary"
                />
                <CreditCard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">{t('checkout.cardPayment')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('checkout.cardPaymentDesc')}</div>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                paymentMethod === 'online'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-600 hover:border-primary/50'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-primary"
                />
                <Globe className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">{t('checkout.onlinePayment')}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('checkout.onlinePaymentDesc')}</div>
                </div>
              </label>
            </div>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('checkout.cardNumber')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim() })}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required={paymentMethod === 'card'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('checkout.cardName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cardName}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                    placeholder={t('checkout.cardNamePlaceholder')}
                    required={paymentMethod === 'card'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('checkout.expiryDate')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiryDate}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5) })}
                      placeholder="MM/YY"
                      maxLength="5"
                      required={paymentMethod === 'card'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('checkout.cvv')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').substring(0, 3) })}
                      placeholder="123"
                      maxLength="3"
                      required={paymentMethod === 'card'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
            <h2 className="text-xl font-bold mb-4">{t('checkout.orderSummary')}</h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{item.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.brand}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {(item.price * item.quantity).toFixed(2)} {t('common.egp')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-3 mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{t('checkout.subtotal')}:</span>
                <span>{subtotal.toFixed(2)} {t('common.egp')}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{t('checkout.shipping')}:</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">{t('checkout.free')}</span>
                  ) : (
                    `${shippingCost.toFixed(2)} ${t('common.egp')}`
                  )}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>{t('checkout.total')}:</span>
                <span className="text-primary">{total.toFixed(2)} {t('common.egp')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary/90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {t('checkout.processing')}
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {t('checkout.placeOrder')}
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              {t('checkout.terms')}
            </p>
          </div>
        </div>
      </form>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default Checkout;
