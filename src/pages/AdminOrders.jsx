import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, Eye, Edit, MapPin, Package, Calendar, DollarSign, User, Phone, Mail, Truck, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../data/orders';
import { useTranslation } from '../hooks/useTranslation';

function AdminOrders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filters, setFilters] = useState({
    status: 'all',
    paymentMethod: 'all',
    shippingMethod: 'all',
    dateFrom: '',
    dateTo: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Load orders
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  // Filtered and sorted orders
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(o =>
        o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerPhone.includes(searchTerm) ||
        o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(o => o.status === filters.status);
    }

    // Payment method filter
    if (filters.paymentMethod !== 'all') {
      filtered = filtered.filter(o => o.paymentMethod === filters.paymentMethod);
    }

    // Shipping method filter
    if (filters.shippingMethod !== 'all') {
      filtered = filtered.filter(o => o.shippingMethod === filters.shippingMethod);
    }

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(o => o.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(o => o.date <= filters.dateTo);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'total':
          return b.total - a.total;
        case 'customer':
          return a.customerName.localeCompare(b.customerName);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [orders, searchTerm, filters, sortBy]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Order Number', 'Customer', 'Date', 'Status', 'Total', 'Items'].join(','),
      ...filteredOrders.map(o => [
        o.orderNumber,
        o.customerName,
        o.date,
        o.status,
        o.total,
        o.items.length,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4" />;
      case 'preparing':
        return <Clock className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    return t(`admin.orders.status.${status}`);
  };

  const getPaymentMethodText = (method) => {
    return t(`admin.orders.payment.${method}`);
  };

  const getShippingMethodText = (method) => {
    return t(`admin.orders.shipping.${method}`);
  };

  const getMapUrl = (order) => {
    if (!order.shippingAddress?.lat || !order.shippingAddress?.lng) {
      return null;
    }
    // Using OpenStreetMap for free map embedding
    return `https://www.openstreetmap.org/export/embed.html?bbox=${order.shippingAddress.lng - 0.01},${order.shippingAddress.lat - 0.01},${order.shippingAddress.lng + 0.01},${order.shippingAddress.lat + 0.01}&layer=mapnik&marker=${order.shippingAddress.lat},${order.shippingAddress.lng}`;
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
            {t('admin.orders.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('admin.orders.subtitle')}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition font-semibold"
        >
          <Download className="w-5 h-5" />
          {t('admin.orders.export')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { status: 'new', label: t('admin.orders.stats.new'), count: orders.filter(o => o.status === 'new').length },
          { status: 'preparing', label: t('admin.orders.stats.preparing'), count: orders.filter(o => o.status === 'preparing').length },
          { status: 'shipped', label: t('admin.orders.stats.shipped'), count: orders.filter(o => o.status === 'shipped').length },
          { status: 'delivered', label: t('admin.orders.stats.delivered'), count: orders.filter(o => o.status === 'delivered').length },
        ].map((stat) => (
          <div key={stat.status} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.count}</p>
              </div>
              <div className={`p-3 rounded-lg ${getStatusColor(stat.status)}`}>
                {getStatusIcon(stat.status)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('admin.orders.search')}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="date">{t('admin.orders.sortByDate')}</option>
            <option value="total">{t('admin.orders.sortByTotal')}</option>
            <option value="customer">{t('admin.orders.sortByCustomer')}</option>
            <option value="status">{t('admin.orders.sortByStatus')}</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              showFilters
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Filter className="w-5 h-5" />
            {t('admin.orders.filters')}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.orders.status')}
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">{t('admin.orders.allStatuses')}</option>
                <option value="new">{t('admin.orders.status.new')}</option>
                <option value="preparing">{t('admin.orders.status.preparing')}</option>
                <option value="shipped">{t('admin.orders.status.shipped')}</option>
                <option value="delivered">{t('admin.orders.status.delivered')}</option>
                <option value="cancelled">{t('admin.orders.status.cancelled')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.orders.paymentMethod')}
              </label>
              <select
                value={filters.paymentMethod}
                onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">{t('admin.orders.allPaymentMethods')}</option>
                <option value="cash">{t('admin.orders.payment.cash')}</option>
                <option value="card">{t('admin.orders.payment.card')}</option>
                <option value="online">{t('admin.orders.payment.online')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.orders.shippingMethod')}
              </label>
              <select
                value={filters.shippingMethod}
                onChange={(e) => setFilters({ ...filters, shippingMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">{t('admin.orders.allShippingMethods')}</option>
                <option value="standard">{t('admin.orders.shipping.standard')}</option>
                <option value="express">{t('admin.orders.shipping.express')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.orders.dateFrom')}
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.orders.dateTo')}
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.orders.table.orderNumber')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.orders.table.customer')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.orders.table.date')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.orders.table.status')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.orders.table.total')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.orders.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">{t('admin.orders.noOrders')}</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{order.customerName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {order.total.toFixed(2)} {t('common.egp')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="text-primary hover:text-primary/80 transition"
                          title={t('admin.orders.viewDetails')}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                          >
                            <option value="new">{t('admin.orders.status.new')}</option>
                            <option value="preparing">{t('admin.orders.status.preparing')}</option>
                            <option value="shipped">{t('admin.orders.status.shipped')}</option>
                            {order.status === 'shipped' && (
                              <option value="delivered">{t('admin.orders.status.delivered')}</option>
                            )}
                          </select>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('admin.orders.orderDetails')} - {selectedOrder.orderNumber}
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {t('admin.orders.customerInfo')}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-900 dark:text-white"><strong>{t('admin.orders.customerName')}:</strong> {selectedOrder.customerName}</p>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {selectedOrder.customerPhone}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedOrder.customerEmail}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    {t('admin.orders.orderInfo')}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-900 dark:text-white"><strong>{t('admin.orders.date')}:</strong> {selectedOrder.date}</p>
                    <p className="text-gray-900 dark:text-white">
                      <strong>{t('admin.orders.status')}:</strong>{' '}
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        {getStatusText(selectedOrder.status)}
                      </span>
                    </p>
                    <p className="text-gray-900 dark:text-white"><strong>{t('admin.orders.paymentMethod')}:</strong> {getPaymentMethodText(selectedOrder.paymentMethod)}</p>
                    <p className="text-gray-900 dark:text-white"><strong>{t('admin.orders.shippingMethod')}:</strong> {getShippingMethodText(selectedOrder.shippingMethod)}</p>
                    {selectedOrder.trackingNumber && (
                      <p className="text-gray-900 dark:text-white"><strong>{t('admin.orders.trackingNumber')}:</strong> {selectedOrder.trackingNumber}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t('admin.orders.shippingAddress')}
                </h3>
                <p className="text-gray-900 dark:text-white mb-4">
                  <strong>{selectedOrder.shippingAddress.title}:</strong> {selectedOrder.shippingAddress.address}
                </p>
                {getMapUrl(selectedOrder) && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    <iframe
                      width="100%"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src={getMapUrl(selectedOrder)}
                      title={t('admin.orders.deliveryLocation')}
                    ></iframe>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  {t('admin.orders.orderItems')} ({selectedOrder.items.length})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.orders.quantity')}: {item.quantity}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{(item.price * item.quantity).toFixed(2)} {t('common.egp')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{t('admin.orders.total')}:</span>
                  <span className="text-2xl font-bold text-primary">{selectedOrder.total.toFixed(2)} {t('common.egp')}</span>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">{t('admin.orders.notes')}</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Update Status */}
              {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('admin.orders.updateStatus')}</h4>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="new">{t('admin.orders.status.new')}</option>
                    <option value="preparing">{t('admin.orders.status.preparing')}</option>
                    <option value="shipped">{t('admin.orders.status.shipped')}</option>
                    {selectedOrder.status === 'shipped' && (
                      <option value="delivered">{t('admin.orders.status.delivered')}</option>
                    )}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
