import { useState, useMemo } from 'react';
import { Download, Filter, Calendar, TrendingUp, DollarSign, Package, Users, FileText } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { getOrders } from '../data/orders';
import { getProducts } from '../data/products';
import { getCustomers } from '../data/customers';

function AdminReports() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('sales'); // sales, products, customers, inventory
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    category: 'all',
  });

  // Mock report data
  const salesData = useMemo(() => {
    // This would come from API in real app
    return {
      totalSales: 125000.50,
      totalOrders: 156,
      averageOrderValue: 801.28,
      growth: 12.5,
      monthlyData: [
        { month: 'يناير', sales: 25000, orders: 30 },
        { month: 'فبراير', sales: 30000, orders: 35 },
        { month: 'مارس', sales: 35000, orders: 40 },
        { month: 'أبريل', sales: 35000, orders: 42 },
      ],
      topCategories: [
        { name: 'أدوية', sales: 75000, percentage: 60 },
        { name: 'تجميل', sales: 50000, percentage: 40 },
      ],
    };
  }, []);

  const productsData = useMemo(() => {
    return {
      totalProducts: 50,
      lowStock: 8,
      topSelling: [
        { name: 'أسبرين 100 مجم', sales: 120, revenue: 3060 },
        { name: 'ميتفورمين 500 مجم', sales: 95, revenue: 2850 },
        { name: 'كريم مرطب للوجه', sales: 80, revenue: 10000 },
      ],
    };
  }, []);

  const customersData = useMemo(() => {
    return {
      totalCustomers: 156,
      newCustomers: 12,
      activeCustomers: 120,
      averageOrderValue: 801.28,
    };
  }, []);

  const handleExportPDF = () => {
    // In real app, this would generate a PDF
    alert(t('admin.reports.exportSuccess'));
  };

  const handleExportCSV = () => {
    // In real app, this would export CSV
    alert(t('admin.reports.exportSuccess'));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('admin.reports.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('admin.reports.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition font-semibold"
          >
            <FileText className="w-5 h-5" />
            {t('admin.reports.exportPDF')}
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition font-semibold"
          >
            <Download className="w-5 h-5" />
            {t('admin.reports.exportCSV')}
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'sales', label: t('admin.reports.sales'), icon: DollarSign },
            { id: 'products', label: t('admin.reports.products'), icon: Package },
            { id: 'customers', label: t('admin.reports.customers'), icon: Users },
            { id: 'inventory', label: t('admin.reports.inventory'), icon: Package },
          ].map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${
                  reportType === type.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">{t('admin.reports.filters')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.reports.dateFrom')}
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
              {t('admin.reports.dateTo')}
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('admin.reports.category')}
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">{t('admin.reports.allCategories')}</option>
              <option value="medicines">{t('admin.reports.medicines')}</option>
              <option value="cosmetics">{t('admin.reports.cosmetics')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sales Report */}
      {reportType === 'sales' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.totalSales')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {salesData.totalSales.toFixed(2)} {t('common.egp')}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.totalOrders')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{salesData.totalOrders}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Package className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.averageOrder')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {salesData.averageOrderValue.toFixed(2)} {t('common.egp')}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.growth')}</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                    +{salesData.growth}%
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Sales Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('admin.reports.monthlySales')}
            </h3>
            <div className="space-y-4">
              {salesData.monthlyData.map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{month.month}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {month.sales.toLocaleString()} {t('common.egp')} ({month.orders} {t('admin.reports.orders')})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${(month.sales / salesData.monthlyData.reduce((max, m) => Math.max(max, m.sales), 0)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('admin.reports.topCategories')}
            </h3>
            <div className="space-y-4">
              {salesData.topCategories.map((cat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{cat.name}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {cat.sales.toLocaleString()} {t('common.egp')} ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Report */}
      {reportType === 'products' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.totalProducts')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{productsData.totalProducts}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.lowStock')}</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{productsData.lowStock}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('admin.reports.topSelling')}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      {t('admin.reports.product')}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      {t('admin.reports.sales')}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      {t('admin.reports.revenue')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {productsData.topSelling.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.sales}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {product.revenue.toLocaleString()} {t('common.egp')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Customers Report */}
      {reportType === 'customers' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.totalCustomers')}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{customersData.totalCustomers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.newCustomers')}</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{customersData.newCustomers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.activeCustomers')}</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{customersData.activeCustomers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.reports.averageOrderValue')}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {customersData.averageOrderValue.toFixed(2)} {t('common.egp')}
            </p>
          </div>
        </div>
      )}

      {/* Inventory Report */}
      {reportType === 'inventory' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t('admin.reports.inventoryReport')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('admin.reports.inventoryReportDesc')}
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminReports;
