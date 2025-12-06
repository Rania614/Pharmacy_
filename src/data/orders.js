// Mock Orders Data
const orders = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    customerName: 'أحمد محمد علي',
    customerPhone: '+20 123 456 7890',
    customerEmail: 'ahmed@example.com',
    date: '2024-01-15',
    status: 'shipped', // new, preparing, shipped, delivered, cancelled
    total: 450.00,
    items: [
      { id: 1, name: 'أسبرين 100 مجم', brand: 'Bayer', quantity: 2, price: 25.50, image: 'https://via.placeholder.com/100x100?text=Aspirin' },
      { id: 2, name: 'ميتفورمين 500 مجم', brand: 'Merck', quantity: 1, price: 30.00, image: 'https://via.placeholder.com/100x100?text=Metformin' },
      { id: 3, name: 'كريم مرطب للوجه', brand: 'L\'Oréal', quantity: 1, price: 125.00, image: 'https://via.placeholder.com/100x100?text=Loreal' },
    ],
    shippingAddress: {
      title: 'المنزل',
      address: '123 شارع التحرير، القاهرة، مصر',
      lat: 30.0444,
      lng: 31.2357,
    },
    paymentMethod: 'cash', // cash, card, online
    shippingMethod: 'standard', // standard, express
    estimatedDelivery: '2024-01-18',
    trackingNumber: 'TRK-2024-001',
    notes: 'يرجى التوصيل قبل الساعة 6 مساءً',
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    customerName: 'فاطمة أحمد',
    customerPhone: '+20 987 654 3210',
    customerEmail: 'fatima@example.com',
    date: '2024-01-16',
    status: 'preparing',
    total: 320.50,
    items: [
      { id: 4, name: 'أتورفاستاتين 20 مجم', brand: 'Pfizer', quantity: 1, price: 85.00, image: 'https://via.placeholder.com/100x100?text=Atorvastatin' },
      { id: 5, name: 'سيروم فيتامين C', brand: 'L\'Oréal', quantity: 1, price: 180.00, image: 'https://via.placeholder.com/100x100?text=Vitamin+C' },
    ],
    shippingAddress: {
      title: 'العمل',
      address: '456 شارع النيل، الجيزة، مصر',
      lat: 30.0131,
      lng: 31.2089,
    },
    paymentMethod: 'card',
    shippingMethod: 'express',
    estimatedDelivery: '2024-01-17',
    trackingNumber: null,
    notes: '',
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    customerName: 'محمد حسن',
    customerPhone: '+20 555 123 4567',
    customerEmail: 'mohamed@example.com',
    date: '2024-01-17',
    status: 'new',
    total: 195.75,
    items: [
      { id: 6, name: 'أملوديبين 5 مجم', brand: 'Novartis', quantity: 3, price: 45.75, image: 'https://via.placeholder.com/100x100?text=Amlodipine' },
      { id: 7, name: 'كريم الوجه المرطب', brand: 'Nivea', quantity: 1, price: 55.00, image: 'https://via.placeholder.com/100x100?text=Nivea' },
    ],
    shippingAddress: {
      title: 'المنزل',
      address: '789 شارع رمسيس، القاهرة، مصر',
      lat: 30.0626,
      lng: 31.2497,
    },
    paymentMethod: 'online',
    shippingMethod: 'standard',
    estimatedDelivery: '2024-01-20',
    trackingNumber: null,
    notes: '',
  },
  {
    id: 4,
    orderNumber: 'ORD-2024-004',
    customerName: 'سارة محمود',
    customerPhone: '+20 111 222 3333',
    customerEmail: 'sara@example.com',
    date: '2024-01-14',
    status: 'delivered',
    total: 280.00,
    items: [
      { id: 8, name: 'ميتوبرولول 50 مجم', brand: 'AstraZeneca', quantity: 2, price: 35.25, image: 'https://via.placeholder.com/100x100?text=Metoprolol' },
      { id: 9, name: 'واقي شمس SPF 50', brand: 'L\'Oréal', quantity: 1, price: 110.00, image: 'https://via.placeholder.com/100x100?text=Sunscreen' },
      { id: 10, name: 'شامبو للشعر التالف', brand: 'L\'Oréal', quantity: 1, price: 85.00, image: 'https://via.placeholder.com/100x100?text=Shampoo' },
    ],
    shippingAddress: {
      title: 'المنزل',
      address: '321 شارع الهرم، الجيزة، مصر',
      lat: 29.9792,
      lng: 31.1342,
    },
    paymentMethod: 'cash',
    shippingMethod: 'standard',
    estimatedDelivery: '2024-01-16',
    trackingNumber: 'TRK-2024-004',
    notes: '',
    deliveredDate: '2024-01-16',
  },
  {
    id: 5,
    orderNumber: 'ORD-2024-005',
    customerName: 'خالد إبراهيم',
    customerPhone: '+20 444 555 6666',
    customerEmail: 'khaled@example.com',
    date: '2024-01-18',
    status: 'new',
    total: 550.25,
    items: [
      { id: 11, name: 'لوسارتان 50 مجم', brand: 'MSD', quantity: 2, price: 55.00, image: 'https://via.placeholder.com/100x100?text=Losartan' },
      { id: 12, name: 'إنسولين جلارجين', brand: 'Sanofi', quantity: 1, price: 180.00, image: 'https://via.placeholder.com/100x100?text=Insulin' },
      { id: 13, name: 'ماسك الطين', brand: 'L\'Oréal', quantity: 1, price: 95.50, image: 'https://via.placeholder.com/100x100?text=Clay+Mask' },
      { id: 14, name: 'بلسم مرطب للشعر', brand: 'L\'Oréal', quantity: 1, price: 75.50, image: 'https://via.placeholder.com/100x100?text=Conditioner' },
    ],
    shippingAddress: {
      title: 'العمل',
      address: '654 شارع كورنيش النيل، القاهرة، مصر',
      lat: 30.0444,
      lng: 31.2357,
    },
    paymentMethod: 'card',
    shippingMethod: 'express',
    estimatedDelivery: '2024-01-19',
    trackingNumber: null,
    notes: 'يرجى الاتصال قبل التوصيل',
  },
  {
    id: 6,
    orderNumber: 'ORD-2024-006',
    customerName: 'نورا سعيد',
    customerPhone: '+20 777 888 9999',
    customerEmail: 'nora@example.com',
    date: '2024-01-13',
    status: 'cancelled',
    total: 125.00,
    items: [
      { id: 15, name: 'راميبريل 5 مجم', brand: 'Sanofi', quantity: 1, price: 42.50, image: 'https://via.placeholder.com/100x100?text=Ramipril' },
      { id: 16, name: 'كريم الجسم المرطب', brand: 'Nivea', quantity: 1, price: 45.50, image: 'https://via.placeholder.com/100x100?text=Body+Cream' },
    ],
    shippingAddress: {
      title: 'المنزل',
      address: '987 شارع الأهرام، الجيزة، مصر',
      lat: 30.0131,
      lng: 31.2089,
    },
    paymentMethod: 'online',
    shippingMethod: 'standard',
    estimatedDelivery: '2024-01-15',
    trackingNumber: null,
    notes: '',
    cancelledDate: '2024-01-14',
    cancellationReason: 'طلب العميل',
  },
];

// Mock API functions
export const getOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...orders]), 500);
  });
};

export const getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = orders.find((o) => o.id === parseInt(id));
      if (order) {
        resolve(order);
      } else {
        reject(new Error('Order not found'));
      }
    }, 300);
  });
};

export const updateOrderStatus = (orderId, newStatus) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = orders.find((o) => o.id === parseInt(orderId));
      if (order) {
        order.status = newStatus;
        if (newStatus === 'shipped' && !order.trackingNumber) {
          order.trackingNumber = `TRK-2024-${String(orderId).padStart(3, '0')}`;
        }
        if (newStatus === 'delivered') {
          order.deliveredDate = new Date().toISOString().split('T')[0];
        }
        resolve(order);
      } else {
        reject(new Error('Order not found'));
      }
    }, 300);
  });
};

export default orders;
