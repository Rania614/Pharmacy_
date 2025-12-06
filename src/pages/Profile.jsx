import { useState } from 'react';
import { User, Package, FileText, Settings, MapPin, Plus, Edit, Trash2, Eye, Upload, Calendar, Phone, Mail, Lock, Bell, Globe, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';

function Profile() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showUploadPrescription, setShowUploadPrescription] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'أحمد محمد',
    phone: '+20 123 456 7890',
    email: 'ahmed@example.com',
    birthDate: '1990-01-15',
  });

  // Mock addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'المنزل',
      address: '123 شارع التحرير، القاهرة',
      isDefault: true,
    },
    {
      id: 2,
      title: 'العمل',
      address: '456 شارع النيل، الجيزة',
      isDefault: false,
    },
  ]);

  // Mock orders
  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'shipped',
      total: 450.00,
      items: 3,
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'preparing',
      total: 320.50,
      items: 2,
    },
  ];

  // Mock prescriptions
  const prescriptions = [
    {
      id: 1,
      name: 'وصفة طبية - يناير 2024',
      uploadDate: '2024-01-15',
      expiryDate: '2024-07-15',
      file: 'prescription-1.pdf',
    },
    {
      id: 2,
      name: 'وصفة طبية - ديسمبر 2023',
      uploadDate: '2023-12-20',
      expiryDate: '2024-06-20',
      file: 'prescription-2.pdf',
    },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleAddAddress = () => {
    // Here you would add new address
    setShowAddAddress(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleUploadPrescription = () => {
    // Here you would upload prescription
    setShowUploadPrescription(false);
  };

  const tabs = [
    { id: 'account', label: t('profile.accountInfo'), icon: User },
    { id: 'orders', label: t('profile.myOrders'), icon: Package },
    { id: 'prescriptions', label: t('profile.myPrescriptions'), icon: FileText },
    { id: 'settings', label: t('profile.settings'), icon: Settings },
  ];

  const getStatusColor = (status) => {
    if (status === 'shipped') return 'bg-green-100 text-green-800';
    if (status === 'preparing') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    if (status === 'shipped') return t('profile.shipped');
    if (status === 'preparing') return t('profile.preparing');
    return t('profile.pending');
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t('profile.title')}</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-white border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Account Info Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t('profile.accountInfo')}</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition font-semibold"
                  >
                    <Edit className="w-4 h-4" />
                    {t('profile.edit')}
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.name')}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.phone')}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-900">
                      <Phone className="w-4 h-4" />
                      {userData.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.email')}
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-900">
                      <Mail className="w-4 h-4" />
                      {userData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.birthDate')}
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={userData.birthDate}
                      onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-900">
                      <Calendar className="w-4 h-4" />
                      {userData.birthDate}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition font-semibold"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {t('profile.save')}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition font-semibold"
                  >
                    <X className="w-4 h-4" />
                    {t('profile.cancel')}
                  </button>
                </div>
              )}

              {/* Saved Addresses */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                  <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t('profile.savedAddresses')}
                  </h3>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition font-semibold text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4" />
                    {t('profile.addAddress')}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border border-gray-200 rounded-lg p-3 sm:p-4 relative"
                    >
                      {address.isDefault && (
                        <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                          {t('profile.default')}
                        </span>
                      )}
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base pr-16 sm:pr-20">{address.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">{address.address}</p>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button className="flex items-center justify-center gap-1.5 sm:gap-2 text-primary hover:text-primary/80 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:py-2 border border-primary rounded-full hover:bg-primary/10 transition">
                          <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>{t('profile.edit')}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 text-red-500 hover:text-red-600 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:py-2 border border-red-500 rounded-full hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>{t('profile.delete')}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{t('profile.myOrders')}</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t('profile.noOrders')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {t('profile.orderDate')}: {order.date}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.items} {t('profile.items')} - {order.total.toFixed(2)} {t('common.egp')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition font-semibold text-sm">
                            <Eye className="w-4 h-4" />
                            {t('profile.viewDetails')}
                          </button>
                          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition font-semibold text-sm">
                            <Package className="w-4 h-4" />
                            {t('profile.reorder')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t('profile.myPrescriptions')}</h2>
                <button
                  onClick={() => setShowUploadPrescription(true)}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition font-semibold"
                >
                  <Upload className="w-4 h-4" />
                  {t('profile.uploadPrescription')}
                </button>
              </div>

              {prescriptions.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">{t('profile.noPrescriptions')}</p>
                  <button
                    onClick={() => setShowUploadPrescription(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition font-semibold mx-auto"
                  >
                    <Upload className="w-4 h-4" />
                    {t('profile.uploadPrescription')}
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {prescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{prescription.name}</h3>
                        <button className="text-primary hover:text-primary/80">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          {t('profile.uploadDate')}: {prescription.uploadDate}
                        </p>
                        <p>
                          {t('profile.expiryDate')}: {prescription.expiryDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{t('profile.settings')}</h2>

              {/* Change Password */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{t('profile.changePassword')}</h3>
                </div>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder={t('profile.currentPassword')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder={t('profile.newPassword')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder={t('profile.confirmPassword')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition font-semibold">
                    {t('profile.updatePassword')}
                  </button>
                </div>
              </div>

              {/* Language */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{t('profile.language')}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleLanguage}
                    className={`px-6 py-2 rounded-full font-semibold transition ${
                      language === 'ar'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={toggleLanguage}
                    className={`px-6 py-2 rounded-full font-semibold transition ${
                      language === 'en'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{t('profile.notifications')}</h3>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-primary" />
                    <span>{t('profile.pushNotifications')}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-primary" />
                    <span>{t('profile.emailNotifications')}</span>
                  </label>
                </div>
              </div>

              {/* Delete Account */}
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-900">{t('profile.deleteAccount')}</h3>
                </div>
                <p className="text-sm text-red-800 mb-4">{t('profile.deleteAccountWarning')}</p>
                <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition font-semibold">
                  {t('profile.deleteAccount')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{t('profile.addAddress')}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t('profile.addressTitle')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <textarea
                placeholder={t('profile.addressDetails')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleAddAddress}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition font-semibold"
                >
                  {t('profile.save')}
                </button>
                <button
                  onClick={() => setShowAddAddress(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition font-semibold"
                >
                  {t('profile.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Prescription Modal */}
      {showUploadPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{t('profile.uploadPrescription')}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t('profile.prescriptionName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleUploadPrescription}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition font-semibold"
                >
                  {t('profile.upload')}
                </button>
                <button
                  onClick={() => setShowUploadPrescription(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition font-semibold"
                >
                  {t('profile.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
