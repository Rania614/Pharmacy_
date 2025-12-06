import { useState } from 'react';
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, AlertTriangle, Calendar, DollarSign, Clock, CheckCircle, XCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

function AdminDashboard() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('month'); // 'today', 'week', 'month'

  // Mock daily sales data
  const dailySales = [
    { day: 'السبت', sales: 4500 },
    { day: 'الأحد', sales: 5200 },
    { day: 'الاثنين', sales: 4800 },
    { day: 'الثلاثاء', sales: 6100 },
    { day: 'الأربعاء', sales: 5500 },
    { day: 'الخميس', sales: 5800 },
    { day: 'الجمعة', sales: 6200 },
  ];

  const maxSales = Math.max(...dailySales.map(d => d.sales));

  // Mock metrics
  const metrics = [
    {
      title: t('admin.metrics.dailySales'),
      value: 'EGP 12,500',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-blue-500',
      description: t('admin.metrics.vsYesterday'),
    },
    {
      title: t('admin.metrics.currentOrders'),
      value: '23',
      change: '+5',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-green-500',
      description: t('admin.metrics.activeOrders'),
    },
    {
      title: t('admin.metrics.newCustomers'),
      value: '12',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500',
      description: t('admin.metrics.today'),
    },
    {
      title: t('admin.metrics.stockStatus'),
      value: '85%',
      change: '-5%',
      trend: 'down',
      icon: Package,
      color: 'bg-yellow-500',
      description: t('admin.metrics.available'),
    },
  ];

  // Mock alerts
  const alerts = [
    {
      type: 'expiry',
      title: t('admin.alerts.expiredMedicines'),
      message: t('admin.alerts.expiredMedicinesDesc'),
      count: 5,
      priority: 'high',
      items: ['Panadol Extra - Batch #1234', 'Aspirin - Batch #5678'],
    },
    {
      type: 'pending',
      title: t('admin.alerts.pendingOrders'),
      message: t('admin.alerts.pendingOrdersDesc'),
      count: 12,
      priority: 'medium',
      items: ['ORD-2024-045', 'ORD-2024-046', 'ORD-2024-047'],
    },
    {
      type: 'lowStock',
      title: t('admin.alerts.lowStockItems'),
      message: t('admin.alerts.lowStockItemsDesc'),
      count: 8,
      priority: 'medium',
      items: ['Paracetamol', 'Ibuprofen'],
    },
  ];

  // Mock top products
  const topProducts = [
    { name: 'Panadol Extra', sales: 450, revenue: 'EGP 22,500', growth: '+12%', image: '💊' },
    { name: 'Aspirin', sales: 320, revenue: 'EGP 16,000', growth: '+8%', image: '💊' },
    { name: 'Paracetamol', sales: 280, revenue: 'EGP 14,000', growth: '+15%', image: '💊' },
    { name: 'Ibuprofen', sales: 250, revenue: 'EGP 12,500', growth: '+5%', image: '💊' },
    { name: 'Vitamin C', sales: 220, revenue: 'EGP 11,000', growth: '+20%', image: '💊' },
  ];

  // Mock monthly sales chart data
  const monthlySales = [
    { month: 'يناير', sales: 45000 },
    { month: 'فبراير', sales: 52000 },
    { month: 'مارس', sales: 48000 },
    { month: 'أبريل', sales: 61000 },
    { month: 'مايو', sales: 55000 },
    { month: 'يونيو', sales: 58000 },
  ];

  const maxMonthlySales = Math.max(...monthlySales.map(m => m.sales));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('admin.dashboard.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('admin.dashboard.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          {['today', 'week', 'month'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedPeriod === period
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t(`admin.dashboard.${period}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {metric.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {metric.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('admin.dashboard.monthlySales')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('admin.dashboard.last6Months')}
              </p>
            </div>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {monthlySales.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{item.month}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">EGP {item.sales.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${(item.sales / maxMonthlySales) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('admin.dashboard.dailySales')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('admin.dashboard.last7Days')}
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {dailySales.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center" style={{ height: '100%' }}>
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary/80"
                    style={{ height: `${(item.sales / maxSales) * 100}%` }}
                    title={`EGP ${item.sales.toLocaleString()}`}
                  />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {item.day}
                </span>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  {item.sales.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts and Top Products Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Alerts */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('admin.dashboard.quickAlerts')}
            </h2>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.priority === 'high'
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {alert.title}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    alert.priority === 'high'
                      ? 'bg-red-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {alert.count}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {alert.message}
                </p>
                <div className="flex flex-wrap gap-1">
                  {alert.items.slice(0, 2).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                  {alert.items.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                      +{alert.items.length - 2} {t('admin.dashboard.more')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('admin.dashboard.topMedicines')}
            </h2>
            <Package className="w-5 h-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {t('admin.dashboard.rank')}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {t('admin.dashboard.product')}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {t('admin.dashboard.sales')}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {t('admin.dashboard.revenue')}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {t('admin.dashboard.growth')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          #{index + 1}
                        </span>
                        {index === 0 && <TrendingUp className="w-4 h-4 text-green-500" />}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.image}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {product.sales} {t('admin.dashboard.units')}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                      {product.revenue}
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                        <ArrowUp className="w-4 h-4" />
                        {product.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('admin.dashboard.recentActivity')}
        </h2>
        <div className="space-y-3">
          {[
            { type: 'order', message: t('admin.dashboard.newOrder'), time: 'منذ 5 دقائق', status: 'success' },
            { type: 'stock', message: t('admin.dashboard.lowStockAlert'), time: 'منذ 15 دقيقة', status: 'warning' },
            { type: 'customer', message: t('admin.dashboard.newCustomer'), time: 'منذ 30 دقيقة', status: 'success' },
            { type: 'expiry', message: t('admin.dashboard.expiryWarning'), time: 'منذ ساعة', status: 'error' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                'bg-red-100 dark:bg-red-900/20'
              }`}>
                {activity.status === 'success' ? (
                  <CheckCircle className={`w-5 h-5 ${
                    activity.status === 'success' ? 'text-green-600' :
                    activity.status === 'warning' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                ) : (
                  <AlertTriangle className={`w-5 h-5 ${
                    activity.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
