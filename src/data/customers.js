// Mock Customers Data
const customers = [
  {
    id: 1,
    name: 'أحمد محمد علي',
    phone: '+20 123 456 7890',
    email: 'ahmed@example.com',
    birthDate: '1990-01-15',
    gender: 'male',
    registrationDate: '2023-06-15',
    status: 'active', // active, inactive, blocked
    totalOrders: 12,
    totalSpent: 5400.50,
    lastOrderDate: '2024-01-15',
    addresses: [
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
    ],
    orders: [1, 2, 4], // Order IDs
    prescriptions: [
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
    ],
    preferences: {
      language: 'ar',
      notifications: true,
      emailNotifications: true,
    },
  },
  {
    id: 2,
    name: 'فاطمة أحمد',
    phone: '+20 987 654 3210',
    email: 'fatima@example.com',
    birthDate: '1995-03-22',
    gender: 'female',
    registrationDate: '2023-08-20',
    status: 'active',
    totalOrders: 8,
    totalSpent: 3200.00,
    lastOrderDate: '2024-01-16',
    addresses: [
      {
        id: 1,
        title: 'المنزل',
        address: '789 شارع رمسيس، القاهرة',
        isDefault: true,
      },
    ],
    orders: [2],
    prescriptions: [
      {
        id: 1,
        name: 'وصفة طبية - يناير 2024',
        uploadDate: '2024-01-10',
        expiryDate: '2024-07-10',
        file: 'prescription-3.pdf',
      },
    ],
    preferences: {
      language: 'ar',
      notifications: true,
      emailNotifications: false,
    },
  },
  {
    id: 3,
    name: 'محمد حسن',
    phone: '+20 555 123 4567',
    email: 'mohamed@example.com',
    birthDate: '1988-07-10',
    gender: 'male',
    registrationDate: '2023-05-10',
    status: 'active',
    totalOrders: 25,
    totalSpent: 12500.75,
    lastOrderDate: '2024-01-17',
    addresses: [
      {
        id: 1,
        title: 'المنزل',
        address: '321 شارع الهرم، الجيزة',
        isDefault: true,
      },
      {
        id: 2,
        title: 'العمل',
        address: '654 شارع كورنيش النيل، القاهرة',
        isDefault: false,
      },
    ],
    orders: [3, 4],
    prescriptions: [],
    preferences: {
      language: 'ar',
      notifications: true,
      emailNotifications: true,
    },
  },
  {
    id: 4,
    name: 'سارة محمود',
    phone: '+20 111 222 3333',
    email: 'sara@example.com',
    birthDate: '1992-11-05',
    gender: 'female',
    registrationDate: '2023-09-12',
    status: 'active',
    totalOrders: 5,
    totalSpent: 1800.00,
    lastOrderDate: '2024-01-14',
    addresses: [
      {
        id: 1,
        title: 'المنزل',
        address: '987 شارع الأهرام، الجيزة',
        isDefault: true,
      },
    ],
    orders: [4],
    prescriptions: [
      {
        id: 1,
        name: 'وصفة طبية - نوفمبر 2023',
        uploadDate: '2023-11-15',
        expiryDate: '2024-05-15',
        file: 'prescription-4.pdf',
      },
    ],
    preferences: {
      language: 'ar',
      notifications: false,
      emailNotifications: false,
    },
  },
  {
    id: 5,
    name: 'خالد إبراهيم',
    phone: '+20 444 555 6666',
    email: 'khaled@example.com',
    birthDate: '1985-04-18',
    gender: 'male',
    registrationDate: '2023-07-25',
    status: 'active',
    totalOrders: 18,
    totalSpent: 8900.25,
    lastOrderDate: '2024-01-18',
    addresses: [
      {
        id: 1,
        title: 'المنزل',
        address: '555 شارع المعادي، القاهرة',
        isDefault: true,
      },
    ],
    orders: [5],
    prescriptions: [],
    preferences: {
      language: 'ar',
      notifications: true,
      emailNotifications: true,
    },
  },
  {
    id: 6,
    name: 'نورا سعيد',
    phone: '+20 777 888 9999',
    email: 'nora@example.com',
    birthDate: '1993-09-30',
    gender: 'female',
    registrationDate: '2023-10-05',
    status: 'inactive',
    totalOrders: 2,
    totalSpent: 450.00,
    lastOrderDate: '2023-12-10',
    addresses: [
      {
        id: 1,
        title: 'المنزل',
        address: '222 شارع الزمالك، القاهرة',
        isDefault: true,
      },
    ],
    orders: [6],
    prescriptions: [],
    preferences: {
      language: 'ar',
      notifications: true,
      emailNotifications: true,
    },
  },
];

// Mock API functions
export const getCustomers = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...customers]), 500);
  });
};

export const getCustomerById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const customer = customers.find((c) => c.id === parseInt(id));
      if (customer) {
        resolve(customer);
      } else {
        reject(new Error('Customer not found'));
      }
    }, 300);
  });
};

export const updateCustomer = (id, customerData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const customer = customers.find((c) => c.id === parseInt(id));
      if (customer) {
        Object.assign(customer, customerData);
        resolve(customer);
      } else {
        reject(new Error('Customer not found'));
      }
    }, 300);
  });
};

export const deleteCustomer = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = customers.findIndex((c) => c.id === parseInt(id));
      if (index !== -1) {
        customers.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error('Customer not found'));
      }
    }, 300);
  });
};

export default customers;
