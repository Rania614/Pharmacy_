import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, AlertTriangle, Calendar, DollarSign } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

function AdminDashboard() {
  const { t } = useTranslation();

  // Mock metrics
  const metrics = [
    {
      title: t('admin.metrics.totalSales'),
      value: 'EGP 125,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-blue-500',
    },
    {
      title: t('admin.metrics.todayOrders'),
      value: '45',
      change: '+8',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-green-500',
    },
    {
      title: t('admin.metrics.lowStock'),
      value: '12',
      change: '-3',
      trend: 'down',
      icon: Package,
      color: 'bg-yellow-500',
    },
    {
      title: t('admin.metrics.newCustomers'),
      value: '28',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  // Mock alerts
  const alerts = [
    {
      type: 'expiry',
      message: t('admin.alerts.expiredMedicines'),
      count: 5,
      priority: 'high',
    },
    {
      type: 'pending',
      message: t('admin.alerts.pendingOrders'),
      count: 12,
      priority: 'medium',
    },
    {
      type: 'lowStock',
      message: t('admin.alerts.lowStockItems'),
      count: 8,
      priority: 'medium',
    },
  ];

  // Mock top products
  const topProducts = [
    { name: 'Panadol Extra', sales: 450, revenue: 'EGP 22,500' },
    { name: 'Aspirin', sales: 320, revenue: 'EGP 16,000' },
    { name: 'Paracetamol', sales: 280, revenue: 'EGP 14,000' },
    { name: 'Ibuprofen', sales: 250, revenue: 'EGP 12,500' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('admin.dashboard.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('admin.dashboard.subtitle')}
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {metric.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {metric.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts and Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('admin.dashboard.monthlySales')}
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              {t('admin.dashboard.chartPlaceholder')}
            </p>
          </div>
        </div>

        {/* Quick Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t('admin.dashboard.quickAlerts')}
          </h2>
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
                      {alert.message}
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('admin.dashboard.topMedicines')}
        </h2>
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
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    #{index + 1}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {product.sales} {t('admin.dashboard.units')}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {product.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
