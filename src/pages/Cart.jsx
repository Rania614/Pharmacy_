import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Plus, Minus, Trash2 } from 'lucide-react';
import useCartStore from '../stores/cartStore';
import { useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

function Cart() {
  const { t } = useTranslation();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotal());
  }, [items, getTotal]);

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
    setTotal(getTotal());
  };

  const handleRemove = (productId) => {
    removeItem(productId);
    setTotal(getTotal());
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">{t('cart.empty')}</p>
          <p className="text-gray-400 mb-6">{t('cart.emptyDesc')}</p>
          <Link
            to="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            {t('cart.browse')}
            <ArrowRight className="mr-2 w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                  <p className="text-lg font-bold text-blue-600 mb-3">
                    {item.price.toFixed(2)} {t('common.egp')}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-full">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    {t('cart.total')}: {(item.price * item.quantity).toFixed(2)} {t('common.egp')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">{t('cart.title')}</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.quantity')}:</span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}:</span>
                  <span>{total.toFixed(2)} {t('common.egp')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.shipping')}:</span>
                  <span className="text-green-600">{t('cart.free')}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>{t('cart.total')}:</span>
                  <span className="text-blue-600">{total.toFixed(2)} {t('common.egp')}</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary/90 transition font-semibold mb-3">
                {t('cart.checkout')}
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition font-semibold"
              >
                {t('cart.clear')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
