// Mock API - 50 منتج (أدوية وتجميل)
const products = [
  // أدوية القلب (15 منتج)
  { id: 1, name: 'أسبرين 100 مجم', brand: 'Bayer', category: 'أدوية', subCategory: 'قلب', price: 25.50, image: 'https://via.placeholder.com/300x300?text=Aspirin', description: 'أسبرين للوقاية من أمراض القلب والأوعية الدموية' },
  { id: 2, name: 'أتورفاستاتين 20 مجم', brand: 'Pfizer', category: 'أدوية', subCategory: 'قلب', price: 85.00, image: 'https://via.placeholder.com/300x300?text=Atorvastatin', description: 'خافض للكوليسترول والدهون الثلاثية' },
  { id: 3, name: 'أملوديبين 5 مجم', brand: 'Novartis', category: 'أدوية', subCategory: 'قلب', price: 45.75, image: 'https://via.placeholder.com/300x300?text=Amlodipine', description: 'خافض لضغط الدم المرتفع' },
  { id: 4, name: 'ميتوبرولول 50 مجم', brand: 'AstraZeneca', category: 'أدوية', subCategory: 'قلب', price: 35.25, image: 'https://via.placeholder.com/300x300?text=Metoprolol', description: 'علاج ارتفاع ضغط الدم وعدم انتظام ضربات القلب' },
  { id: 5, name: 'لوسارتان 50 مجم', brand: 'MSD', category: 'أدوية', subCategory: 'قلب', price: 55.00, image: 'https://via.placeholder.com/300x300?text=Losartan', description: 'خافض لضغط الدم' },
  { id: 6, name: 'راميبريل 5 مجم', brand: 'Sanofi', category: 'أدوية', subCategory: 'قلب', price: 42.50, image: 'https://via.placeholder.com/300x300?text=Ramipril', description: 'مثبط ACE لعلاج ارتفاع ضغط الدم' },
  { id: 7, name: 'كارفيديلول 25 مجم', brand: 'Roche', category: 'أدوية', subCategory: 'قلب', price: 65.00, image: 'https://via.placeholder.com/300x300?text=Carvedilol', description: 'حاصرات بيتا لعلاج قصور القلب' },
  { id: 8, name: 'فوروسيميد 40 مجم', brand: 'Sanofi', category: 'أدوية', subCategory: 'قلب', price: 28.75, image: 'https://via.placeholder.com/300x300?text=Furosemide', description: 'مدر للبول لعلاج الوذمة' },
  { id: 9, name: 'كلوبيدوجريل 75 مجم', brand: 'Sanofi', category: 'أدوية', subCategory: 'قلب', price: 95.00, image: 'https://via.placeholder.com/300x300?text=Clopidogrel', description: 'مضاد للصفيحات للوقاية من الجلطات' },
  { id: 10, name: 'دابيجاتران 150 مجم', brand: 'Boehringer', category: 'أدوية', subCategory: 'قلب', price: 120.00, image: 'https://via.placeholder.com/300x300?text=Dabigatran', description: 'مضاد للتخثر للوقاية من السكتة الدماغية' },
  { id: 11, name: 'ريفاروكسابان 20 مجم', brand: 'Bayer', category: 'أدوية', subCategory: 'قلب', price: 110.50, image: 'https://via.placeholder.com/300x300?text=Rivaroxaban', description: 'مضاد للتخثر' },
  { id: 12, name: 'إيزوسوربيد 20 مجم', brand: 'Pfizer', category: 'أدوية', subCategory: 'قلب', price: 38.00, image: 'https://via.placeholder.com/300x300?text=Isosorbide', description: 'علاج الذبحة الصدرية' },
  { id: 13, name: 'ديلتيازيم 120 مجم', brand: 'Abbott', category: 'أدوية', subCategory: 'قلب', price: 48.50, image: 'https://via.placeholder.com/300x300?text=Diltiazem', description: 'حاصرات قنوات الكالسيوم' },
  { id: 14, name: 'بروبرانولول 40 مجم', brand: 'AstraZeneca', category: 'أدوية', subCategory: 'قلب', price: 32.25, image: 'https://via.placeholder.com/300x300?text=Propranolol', description: 'حاصرات بيتا لعلاج عدم انتظام ضربات القلب' },
  { id: 15, name: 'إينالابريل 10 مجم', brand: 'MSD', category: 'أدوية', subCategory: 'قلب', price: 40.00, image: 'https://via.placeholder.com/300x300?text=Enalapril', description: 'مثبط ACE لعلاج ارتفاع ضغط الدم' },

  // أدوية السكر (15 منتج)
  { id: 16, name: 'ميتفورمين 500 مجم', brand: 'Merck', category: 'أدوية', subCategory: 'سكر', price: 30.00, image: 'https://via.placeholder.com/300x300?text=Metformin', description: 'علاج السكري من النوع الثاني' },
  { id: 17, name: 'جليبيزايد 5 مجم', brand: 'Pfizer', category: 'أدوية', subCategory: 'سكر', price: 45.50, image: 'https://via.placeholder.com/300x300?text=Glipizide', description: 'خافض لسكر الدم' },
  { id: 18, name: 'إنسولين جلارجين', brand: 'Sanofi', category: 'أدوية', subCategory: 'سكر', price: 180.00, image: 'https://via.placeholder.com/300x300?text=Insulin', description: 'إنسولين طويل المفعول' },
  { id: 19, name: 'إمباجليفلوزين 10 مجم', brand: 'Boehringer', category: 'أدوية', subCategory: 'سكر', price: 95.00, image: 'https://via.placeholder.com/300x300?text=Empagliflozin', description: 'مثبط SGLT2 لعلاج السكري' },
  { id: 20, name: 'سيتاجليبتين 100 مجم', brand: 'MSD', category: 'أدوية', subCategory: 'سكر', price: 85.50, image: 'https://via.placeholder.com/300x300?text=Sitagliptin', description: 'مثبط DPP-4 لعلاج السكري' },
  { id: 21, name: 'بيوجليتازون 30 مجم', brand: 'Takeda', category: 'أدوية', subCategory: 'سكر', price: 65.00, image: 'https://via.placeholder.com/300x300?text=Pioglitazone', description: 'محسّن لحساسية الإنسولين' },
  { id: 22, name: 'جليميبيريد 2 مجم', brand: 'Sanofi', category: 'أدوية', subCategory: 'سكر', price: 50.25, image: 'https://via.placeholder.com/300x300?text=Glimepiride', description: 'خافض لسكر الدم' },
  { id: 23, name: 'كاناجليفلوزين 100 مجم', brand: 'Janssen', category: 'أدوية', subCategory: 'سكر', price: 100.00, image: 'https://via.placeholder.com/300x300?text=Canagliflozin', description: 'مثبط SGLT2' },
  { id: 24, name: 'ليناجليبتين 5 مجم', brand: 'Novo Nordisk', category: 'أدوية', subCategory: 'سكر', price: 90.00, image: 'https://via.placeholder.com/300x300?text=Linagliptin', description: 'مثبط DPP-4' },
  { id: 25, name: 'إنسولين أسبارت', brand: 'Novo Nordisk', category: 'أدوية', subCategory: 'سكر', price: 165.00, image: 'https://via.placeholder.com/300x300?text=Insulin+Aspart', description: 'إنسولين سريع المفعول' },
  { id: 26, name: 'داباجليفلوزين 10 مجم', brand: 'AstraZeneca', category: 'أدوية', subCategory: 'سكر', price: 88.50, image: 'https://via.placeholder.com/300x300?text=Dapagliflozin', description: 'مثبط SGLT2' },
  { id: 27, name: 'أكاربوز 50 مجم', brand: 'Bayer', category: 'أدوية', subCategory: 'سكر', price: 42.00, image: 'https://via.placeholder.com/300x300?text=Acarbose', description: 'مثبط ألفا جلوكوسيداز' },
  { id: 28, name: 'روزيجليتازون 4 مجم', brand: 'GSK', category: 'أدوية', subCategory: 'سكر', price: 70.00, image: 'https://via.placeholder.com/300x300?text=Rosiglitazone', description: 'محسّن لحساسية الإنسولين' },
  { id: 29, name: 'إنسولين ديتمير', brand: 'Novo Nordisk', category: 'أدوية', subCategory: 'سكر', price: 175.00, image: 'https://via.placeholder.com/300x300?text=Insulin+Detemir', description: 'إنسولين طويل المفعول' },
  { id: 30, name: 'فيلداجليبتين 50 مجم', brand: 'Novartis', category: 'أدوية', subCategory: 'سكر', price: 82.00, image: 'https://via.placeholder.com/300x300?text=Vildagliptin', description: 'مثبط DPP-4' },

  // منتجات تجميل L\'Oréal (10 منتج)
  { id: 31, name: 'كريم مرطب للوجه', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'عناية', price: 125.00, image: 'https://via.placeholder.com/300x300?text=Loreal+Moisturizer', description: 'كريم مرطب يومي للبشرة الجافة' },
  { id: 32, name: 'ماسك الطين', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'عناية', price: 95.50, image: 'https://via.placeholder.com/300x300?text=Loreal+Clay+Mask', description: 'ماسك طين لتنظيف المسام' },
  { id: 33, name: 'سيروم فيتامين C', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'عناية', price: 180.00, image: 'https://via.placeholder.com/300x300?text=Loreal+Vitamin+C', description: 'سيروم فيتامين C لتفتيح البشرة' },
  { id: 34, name: 'واقي شمس SPF 50', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'عناية', price: 110.00, image: 'https://via.placeholder.com/300x300?text=Loreal+Sunscreen', description: 'واقي شمس عالي الحماية' },
  { id: 35, name: 'شامبو للشعر التالف', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'شعر', price: 85.00, image: 'https://via.placeholder.com/300x300?text=Loreal+Shampoo', description: 'شامبو لإصلاح الشعر التالف' },
  { id: 36, name: 'بلسم مرطب للشعر', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'شعر', price: 75.50, image: 'https://via.placeholder.com/300x300?text=Loreal+Conditioner', description: 'بلسم مرطب عميق للشعر' },
  { id: 37, name: 'ماسكارا طويلة الأمد', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'مكياج', price: 65.00, image: 'https://via.placeholder.com/300x300?text=Loreal+Mascara', description: 'ماسكارا مقاومة للماء' },
  { id: 38, name: 'أحمر شفاه سائل', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'مكياج', price: 90.00, image: 'https://via.placeholder.com/300x300?text=Loreal+Lipstick', description: 'أحمر شفاه طويل الأمد' },
  { id: 39, name: 'كونسيلر عالي التغطية', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'مكياج', price: 70.00, image: 'https://via.placeholder.com/300x300?text=Loreal+Concealer', description: 'كونسيلر لتغطية العيوب' },
  { id: 40, name: 'تونر للبشرة الدهنية', brand: 'L\'Oréal', category: 'تجميل', subCategory: 'عناية', price: 88.00, image: 'https://via.placeholder.com/300x300?text=Loreal+Toner', description: 'تونر لتنظيف وتوازن البشرة' },

  // منتجات تجميل Nivea (10 منتج)
  { id: 41, name: 'كريم الوجه المرطب', brand: 'Nivea', category: 'تجميل', subCategory: 'عناية', price: 55.00, image: 'https://via.placeholder.com/300x300?text=Nivea+Face+Cream', description: 'كريم مرطب يومي للوجه' },
  { id: 42, name: 'كريم الجسم المرطب', brand: 'Nivea', category: 'تجميل', subCategory: 'عناية', price: 45.50, image: 'https://via.placeholder.com/300x300?text=Nivea+Body+Cream', description: 'كريم مرطب للجسم' },
  { id: 43, name: 'لوشن مرطب للجسم', brand: 'Nivea', category: 'تجميل', subCategory: 'عناية', price: 48.00, image: 'https://via.placeholder.com/300x300?text=Nivea+Body+Lotion', description: 'لوشن مرطب سريع الامتصاص' },
  { id: 44, name: 'صابون مرطب', brand: 'Nivea', category: 'تجميل', subCategory: 'عناية', price: 25.00, image: 'https://via.placeholder.com/300x300?text=Nivea+Soap', description: 'صابون مرطب للبشرة الحساسة' },
  { id: 45, name: 'كريم اليدين', brand: 'Nivea', category: 'تجميل', subCategory: 'عناية', price: 35.00, image: 'https://via.placeholder.com/300x300?text=Nivea+Hand+Cream', description: 'كريم مرطب لليدين' },
  { id: 46, name: 'مزيل عرق رول أون', brand: 'Nivea', category: 'تجميل', subCategory: 'عناية', price: 42.00, image: 'https://via.placeholder.com/300x300?text=Nivea+Deodorant', description: 'مزيل عرق طويل الأمد' },
  { id: 47, name: 'شامبو للشعر العادي', brand: 'Nivea', category: 'تجميل', subCategory: 'شعر', price: 38.50, image: 'https://via.placeholder.com/300x300?text=Nivea+Shampoo', description: 'شامبو للعناية اليومية' },
  { id: 48, name: 'بلسم للشعر', brand: 'Nivea', category: 'تجميل', subCategory: 'شعر', price: 40.00, image: 'https://via.placeholder.com/300x300?text=Nivea+Conditioner', description: 'بلسم مرطب للشعر' },
  { id: 49, name: 'كريم واقي شمس SPF 30', brand: 'Nivea', category: 'تجميل', subCategory: 'عناية', price: 65.00, image: 'https://via.placeholder.com/300x300?text=Nivea+Sunscreen', description: 'واقي شمس للبشرة الحساسة' },
  { id: 50, name: 'تونر منعش للبشرة', brand: 'Nivea', category: 'تجميل', subCategory: 'عناية', price: 52.00, image: 'https://via.placeholder.com/300x300?text=Nivea+Toner', description: 'تونر منعش ومنظف للبشرة' },
];

// Mock API functions
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    }, 300);
  });
};

export const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = products.filter((p) => p.category === category);
      resolve(filtered);
    }, 400);
  });
};

export const getProductsByBrand = (brand) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = products.filter((p) => p.brand === brand);
      resolve(filtered);
    }, 400);
  });
};

export const getProductsBySubCategory = (subCategory) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = products.filter((p) => p.subCategory === subCategory);
      resolve(filtered);
    }, 400);
  });
};

export default products;
