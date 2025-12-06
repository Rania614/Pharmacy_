import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, AlertTriangle, Package, Calendar, TrendingDown, ShoppingCart, CheckCircle, XCircle, Clock } from 'lucide-react';
import { getProducts } from '../data/products';
import { useTranslation } from '../hooks/useTranslation';

function AdminInventory() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    alertType: 'all', // all, lowStock, expiring, expired
    minStock: '',
    maxStock: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showSupplierOrder, setShowSupplierOrder] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Calculate alerts
  const alerts = useMemo(() => {
    const lowStock = products.filter(p => (p.stock || 0) < 10);
    const expiring = products.filter(p => {
      if (!p.expiryDate) return false;
      const expiry = new Date(p.expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    });
    const expired = products.filter(p => {
      if (!p.expiryDate) return false;
      return new Date(p.expiryDate) < new Date();
    });

    return { lowStock, expiring, expired };
  }, [products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Alert type filter
    if (filters.alertType === 'lowStock') {
      filtered = filtered.filter(p => (p.stock || 0) < 10);
    } else if (filters.alertType === 'expiring') {
      filtered = filtered.filter(p => {
        if (!p.expiryDate) return false;
        const expiry = new Date(p.expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
      });
    } else if (filters.alertType === 'expired') {
      filtered = filtered.filter(p => {
        if (!p.expiryDate) return false;
        return new Date(p.expiryDate) < new Date();
      });
    }

    // Stock range filter
    if (filters.minStock) {
      filtered = filtered.filter(p => (p.stock || 0) >= parseInt(filters.minStock));
    }
    if (filters.maxStock) {
      filtered = filtered.filter(p => (p.stock || 0) <= parseInt(filters.maxStock));
    }

    return filtered;
  }, [products, searchTerm, filters]);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  // Calculate inventory statistics
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
    const lowStockCount = alerts.lowStock.length;
    const expiringCount = alerts.expiring.length;
    const expiredCount = alerts.expired.length;

    return {
      totalProducts,
      totalStock,
      totalValue,
      lowStockCount,
      expiringCount,
      expiredCount,
    };
  }, [products, alerts]);

  const isLowStock = (stock) => {
    return (stock || 0) < 10;
  };

  const isExpiring = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  const handleExport = () => {
    const csv = [
      ['Product Name', 'Brand', 'Category', 'Stock', 'Price', 'Total Value', 'Expiry Date', 'Status'].join(','),
      ...filteredProducts.map(p => [
        p.name,
        p.brand,
        p.category,
        p.stock || 0,
        p.price,
        (p.price * (p.stock || 0)).toFixed(2),
        p.expiryDate || 'N/A',
        isExpired(p.expiryDate) ? 'Expired' : isExpiring(p.expiryDate) ? 'Expiring' : isLowStock(p.stock) ? 'Low Stock' : 'OK',
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleSelectProduct = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('admin.inventory.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('admin.inventory.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSupplierOrder(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition font-semibold"
          >
            <ShoppingCart className="w-5 h-5" />
            {t('admin.inventory.orderFromSupplier')}
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition font-semibold"
          >
            <Download className="w-5 h-5" />
            {t('admin.inventory.export')}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.inventory.stats.totalProducts')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalProducts}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.inventory.stats.totalStock')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalStock}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingDown className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.inventory.stats.totalValue')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stats.totalValue.toFixed(2)} {t('common.egp')}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Package className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.inventory.stats.alerts')}</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                {stats.lowStockCount + stats.expiringCount + stats.expiredCount}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {(alerts.lowStock.length > 0 || alerts.expiring.length > 0 || alerts.expired.length > 0) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            {t('admin.inventory.alerts')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.expired.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h3 className="font-semibold text-red-900 dark:text-red-200">
                    {t('admin.inventory.expired')} ({alerts.expired.length})
                  </h3>
                </div>
                <ul className="text-sm text-red-800 dark:text-red-300 space-y-1">
                  {alerts.expired.slice(0, 3).map(p => (
                    <li key={p.id}>• {p.name}</li>
                  ))}
                  {alerts.expired.length > 3 && (
                    <li className="text-red-600 dark:text-red-400">+{alerts.expired.length - 3} {t('admin.inventory.more')}</li>
                  )}
                </ul>
              </div>
            )}

            {alerts.expiring.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-200">
                    {t('admin.inventory.expiring')} ({alerts.expiring.length})
                  </h3>
                </div>
                <ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
                  {alerts.expiring.slice(0, 3).map(p => (
                    <li key={p.id}>• {p.name} ({getDaysUntilExpiry(p.expiryDate)} {t('admin.inventory.days')})</li>
                  ))}
                  {alerts.expiring.length > 3 && (
                    <li className="text-yellow-600 dark:text-yellow-400">+{alerts.expiring.length - 3} {t('admin.inventory.more')}</li>
                  )}
                </ul>
              </div>
            )}

            {alerts.lowStock.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <h3 className="font-semibold text-orange-900 dark:text-orange-200">
                    {t('admin.inventory.lowStock')} ({alerts.lowStock.length})
                  </h3>
                </div>
                <ul className="text-sm text-orange-800 dark:text-orange-300 space-y-1">
                  {alerts.lowStock.slice(0, 3).map(p => (
                    <li key={p.id}>• {p.name} ({p.stock || 0} {t('admin.inventory.units')})</li>
                  ))}
                  {alerts.lowStock.length > 3 && (
                    <li className="text-orange-600 dark:text-orange-400">+{alerts.lowStock.length - 3} {t('admin.inventory.more')}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('admin.inventory.search')}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              showFilters
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Filter className="w-5 h-5" />
            {t('admin.inventory.filters')}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.inventory.category')}
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">{t('admin.inventory.allCategories')}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.inventory.alertType')}
              </label>
              <select
                value={filters.alertType}
                onChange={(e) => setFilters({ ...filters, alertType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">{t('admin.inventory.allAlerts')}</option>
                <option value="lowStock">{t('admin.inventory.lowStock')}</option>
                <option value="expiring">{t('admin.inventory.expiring')}</option>
                <option value="expired">{t('admin.inventory.expired')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.inventory.minStock')}
              </label>
              <input
                type="number"
                value={filters.minStock}
                onChange={(e) => setFilters({ ...filters, minStock: e.target.value })}
                placeholder={t('admin.inventory.minStock')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.inventory.maxStock')}
              </label>
              <input
                type="number"
                value={filters.maxStock}
                onChange={(e) => setFilters({ ...filters, maxStock: e.target.value })}
                placeholder={t('admin.inventory.maxStock')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.inventory.table.product')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.inventory.table.category')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.inventory.table.stock')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.inventory.table.price')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.inventory.table.totalValue')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.inventory.table.expiryDate')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.inventory.table.status')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">{t('admin.inventory.noProducts')}</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const stock = product.stock || 0;
                  const expired = isExpired(product.expiryDate);
                  const expiring = isExpiring(product.expiryDate);
                  const lowStock = isLowStock(stock);
                  const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate);

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{product.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${lowStock ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                          {stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {product.price.toFixed(2)} {t('common.egp')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {(product.price * stock).toFixed(2)} {t('common.egp')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${expired ? 'text-red-600 dark:text-red-400' : expiring ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'}`}>
                          {product.expiryDate || 'N/A'}
                          {daysUntilExpiry !== null && daysUntilExpiry <= 30 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ({daysUntilExpiry} {t('admin.inventory.days')})
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {expired ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            <XCircle className="w-4 h-4" />
                            {t('admin.inventory.expired')}
                          </span>
                        ) : expiring ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <Clock className="w-4 h-4" />
                            {t('admin.inventory.expiring')}
                          </span>
                        ) : lowStock ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                            <AlertTriangle className="w-4 h-4" />
                            {t('admin.inventory.lowStock')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircle className="w-4 h-4" />
                            {t('admin.inventory.ok')}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Order Modal */}
      {showSupplierOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('admin.inventory.orderFromSupplier')}
              </h2>
              <button
                onClick={() => setShowSupplierOrder(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {t('admin.inventory.supplierOrderDesc')}
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  {t('admin.inventory.supplierOrderNote')}
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowSupplierOrder(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={() => {
                    // Handle supplier order
                    setShowSupplierOrder(false);
                  }}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  {t('admin.inventory.submitOrder')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminInventory;
