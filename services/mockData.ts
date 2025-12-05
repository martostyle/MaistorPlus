
import { Master, Project, Lead, FurnitureItem, CommissionRecord, InsuranceOption, DocumentTemplate, PartnerCoupon, ChatSession } from '../types';

export const MOCK_MASTERS: Master[] = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    phoneNumber: '+359 888 123 456',
    specialty: 'ВиК Услуги',
    location: 'София',
    rating: 4.9,
    reviews: 124,
    verified: true,
    isAvailable: true,
    hourlyRate: 45,
    imageUrl: 'https://picsum.photos/200/200?random=1',
    description: 'Специалист с над 15 години опит в цялостно изграждане на ВиК инсталации.',
    tags: ['Спешни ремонти', 'Бани', 'Водопроводи'],
    eik: '123456789',
    certificates: ['Майсторско свидетелство', 'ISO 9001'],
    gallery: [
      { id: 'g1', imageUrl: 'https://picsum.photos/300/200?random=101', title: 'Ремонт на баня', rating: 5, clientReview: 'Отлична работа!' },
      { id: 'g2', imageUrl: 'https://picsum.photos/300/200?random=102', title: 'ВиК инсталация', rating: 4 }
    ],
    services: [
      { id: 's1', name: 'Монтаж на мивка', price: 60, unit: 'бр.' },
      { id: 's2', name: 'Смяна на щранг', price: 120, unit: 'л.м.' },
      { id: 's3', name: 'Отпушване на канал', price: 80, unit: 'бр.' }
    ],
    subscriptionTier: 'plus'
  },
  {
    id: '2',
    name: 'Строителна Бригада "Основа"',
    email: 'osnova@example.com',
    phoneNumber: '+359 899 987 654',
    specialty: 'Груб Строеж & Саниране',
    location: 'Пловдив',
    rating: 4.7,
    reviews: 89,
    verified: true,
    isAvailable: false,
    imageUrl: 'https://picsum.photos/200/200?random=2',
    description: 'Комплексни решения за вашия дом. Работим с договори и гаранции.',
    tags: ['Саниране', 'Покриви', 'Изолация'],
    eik: '987654321',
    certificates: ['Лиценз за строеж'],
    gallery: [],
    services: [
      { id: 's1', name: 'Топлоизолация', price: 45, unit: 'кв.м' },
      { id: 's2', name: 'Шпакловка', price: 15, unit: 'кв.м' }
    ],
    subscriptionTier: 'plus'
  },
  {
    id: '3',
    name: 'Георги Димитров',
    email: 'georgi.dimitrov@example.com',
    phoneNumber: '+359 877 555 333',
    specialty: 'Електротехник',
    location: 'Варна',
    rating: 5.0,
    reviews: 42,
    verified: true,
    isAvailable: true,
    hourlyRate: 50,
    imageUrl: 'https://picsum.photos/200/200?random=3',
    description: 'Лицензиран електротехник. Проектиране и изграждане на ел. инсталации.',
    tags: ['Ел. Табла', 'Осветление', 'Умен дом'],
    eik: '1122334455',
    certificates: ['Ел. безопасност IV група'],
    gallery: [],
    services: [
      { id: 's1', name: 'Монтаж на контакт', price: 10, unit: 'бр.' },
      { id: 's2', name: 'Свързване на табло', price: 150, unit: 'бр.' }
    ],
    subscriptionTier: 'free'
  },
  {
    id: '4',
    name: 'Арт Дизайн Студио',
    email: 'design@example.com',
    phoneNumber: '+359 888 000 111',
    specialty: 'Интериорен Дизайн',
    location: 'София',
    rating: 4.8,
    reviews: 210,
    verified: true,
    isAvailable: true,
    imageUrl: 'https://picsum.photos/200/200?random=4',
    description: 'Превръщаме вашите идеи в реалност с 3D визуализации и авторски надзор.',
    tags: ['3D Проекти', 'Обзавеждане', 'Декорация'],
    eik: '5566778899',
    certificates: ['Интериорен дизайн диплома'],
    gallery: [],
    services: [
      { id: 's1', name: '3D Визуализация', price: 30, unit: 'кв.м' },
      { id: 's2', name: 'Консултация', price: 100, unit: 'час' }
    ],
    subscriptionTier: 'free'
  }
];

export const CLIENT_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Основен ремонт на баня',
    status: 'pending',
    amount: 3500,
    escrowSecured: true,
    date: '2023-10-15',
    furnitureDiscountActive: false,
    hasWarranty: true, // > 500 BGN
    offers: [
      { 
        id: 'o1', 
        masterId: '1', 
        masterName: 'Иван Петров', 
        masterRating: 4.9, 
        price: 3200, 
        duration: '10 дни', 
        comment: 'Включва къртене и извозване. Гаранция по договор.', 
        status: 'pending' 
      },
      { 
        id: 'o2', 
        masterId: '3', 
        masterName: 'Бригада София', 
        masterRating: 4.5, 
        price: 2900, 
        duration: '7 дни', 
        comment: 'Можем да започнем веднага.', 
        status: 'pending' 
      }
    ]
  },
  {
    id: 'p2',
    title: 'Смяна на ел. табло',
    status: 'completed',
    amount: 250,
    escrowSecured: false,
    masterName: 'Георги Димитров',
    date: '2023-09-01',
    furnitureDiscountActive: false,
    hasWarranty: false // < 500 BGN
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    title: 'Ремонт на покрив на къща',
    category: 'Покриви',
    location: 'София, Бояна',
    budget: 'Голям (> 5000 лв)',
    description: 'Търся бригада за пренареждане на керемиди и смяна на улуци.',
    date: 'Преди 2 часа',
    phoneNumber: '+359 877 123 456',
    isHighPriority: true,
    isPlusOnly: true, // Only for PLUS subscribers
    imagesCount: 5
  },
  {
    id: 'l2',
    title: 'Монтаж на бойлер',
    category: 'ВиК',
    location: 'София, Люлин',
    budget: 'Малък',
    description: 'Смяна на стар бойлер с нов 80л.',
    date: 'Преди 4 часа',
    phoneNumber: '+359 888 999 888',
    isHighPriority: false,
    isPlusOnly: false,
    imagesCount: 2
  },
  {
    id: 'l3',
    title: 'Окабеляване на офис',
    category: 'Електро',
    location: 'Пловдив',
    budget: 'Среден',
    description: 'Нуждаем се от нови контакти и LAN мрежа за 10 работни места.',
    date: 'Вчера',
    phoneNumber: '+359 899 111 222',
    isHighPriority: true,
    isPlusOnly: true, // Only for PLUS subscribers
    imagesCount: 0
  }
];

export const MASTER_PROJECTS: Project[] = [
  {
    id: 'mp1',
    title: 'Ремонт на покрив - Драгалевци',
    status: 'active',
    amount: 12000,
    escrowSecured: true,
    date: '2023-10-20',
    furnitureDiscountActive: false,
    hasWarranty: true
  },
  {
    id: 'mp2',
    title: 'Шпакловка и боя - Център',
    status: 'pending',
    amount: 1800,
    escrowSecured: true,
    date: '2023-10-22',
    furnitureDiscountActive: false,
    hasWarranty: true
  }
];

export const INCOME_DATA = [
  { name: 'Яну', income: 2400 },
  { name: 'Фев', income: 1398 },
  { name: 'Мар', income: 9800 },
  { name: 'Апр', income: 3908 },
  { name: 'Май', income: 4800 },
  { name: 'Юни', income: 3800 },
  { name: 'Юли', income: 4300 },
];

export const MOCK_FURNITURE_CATALOG: FurnitureItem[] = [
    { id: 'f1', name: 'Модулна Кухня "Елеганс"', category: 'Кухни', retailPrice: 2400, partnerPrice: 1950, imageUrl: 'https://picsum.photos/300/200?random=20' },
    { id: 'f2', name: 'Диван "Комфорт Плюс"', category: 'Мека Мебел', retailPrice: 1200, partnerPrice: 980, imageUrl: 'https://picsum.photos/300/200?random=21' },
    { id: 'f3', name: 'Секция за Баня', category: 'Баня', retailPrice: 850, partnerPrice: 690, imageUrl: 'https://picsum.photos/300/200?random=22' },
    { id: 'f4', name: 'Трапезна Маса Дъб', category: 'Трапезария', retailPrice: 600, partnerPrice: 480, imageUrl: 'https://picsum.photos/300/200?random=23' },
    { id: 'f5', name: 'Огледало LED', category: 'Баня', retailPrice: 250, partnerPrice: 190, imageUrl: 'https://picsum.photos/300/200?random=24' },
];

export const MOCK_COMMISSIONS: CommissionRecord[] = [
    { id: 'c1', date: '2023-10-05', itemName: 'Кухня "Елеганс"', amount: 195, projectName: 'Ремонт кухня - И. Петров' },
    { id: 'c2', date: '2023-10-12', itemName: 'Диван "Комфорт"', amount: 98, projectName: 'Хол ремонт - Г. Иванов' }
];

export const INSURANCE_OPTIONS: InsuranceOption[] = [
  { id: 'i1', providerName: 'Bulstrad Vienna Insurance', coverageAmount: 50000, pricePerYear: 180, logoUrl: 'https://via.placeholder.com/50' },
  { id: 'i2', providerName: 'Allianz Bulgaria', coverageAmount: 100000, pricePerYear: 320, logoUrl: 'https://via.placeholder.com/50' }
];

export const DOC_TEMPLATES: DocumentTemplate[] = [
  { id: 't1', title: 'Професионална Оферта', type: 'offer', description: 'Шаблон за изготвяне на детайлна оферта с включени етапи.' },
  { id: 't2', title: 'Протокол за Приемане', type: 'protocol', description: 'Официален протокол за предаване на работа (задължителен за гаранция).' },
  { id: 't3', title: 'Договор за СМР + Гаранция', type: 'contract', description: 'Договор с включена 1 година гаранционна клауза (Фонд Качество).' }
];

export const MOCK_PARTNER_COUPONS: PartnerCoupon[] = [
  { id: 'pc1', partnerName: 'Мебели Виденов', website: 'videnov.bg', discountPercentage: 10, code: 'MAISTOR10', category: 'Мебели', logoUrl: 'https://via.placeholder.com/50' },
  { id: 'pc2', partnerName: 'Практикер', website: 'praktiker.bg', discountPercentage: 10, code: 'MPLUS2024', category: 'Строителство', logoUrl: 'https://via.placeholder.com/50' },
  { id: 'pc3', partnerName: 'Баня Стил', website: 'banyastyle.com', discountPercentage: 10, code: 'BATH10', category: 'Баня', logoUrl: 'https://via.placeholder.com/50' },
  { id: 'pc4', partnerName: 'CarpetMax', website: 'carpetmax.bg', discountPercentage: 10, code: 'FLOOR10', category: 'Настилки', logoUrl: 'https://via.placeholder.com/50' },
];

export const MOCK_CHATS: ChatSession[] = [
  {
    id: 'c1',
    partnerId: 'u2',
    partnerName: 'Мария Иванова (Клиент)',
    partnerAvatar: 'https://picsum.photos/200/200?random=30',
    lastMessage: 'Кога можете да дойдете за оглед?',
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'u2', text: 'Здравейте, интересувам се от офертата ви.', timestamp: '10:30' },
      { id: 'm2', senderId: 'me', text: 'Здравейте! Мога да мина утре.', timestamp: '10:35' },
      { id: 'm3', senderId: 'u2', text: 'Кога можете да дойдете за оглед?', timestamp: '10:36' }
    ]
  },
  {
    id: 'c2',
    partnerId: 'u3',
    partnerName: 'Петър Стоянов',
    partnerAvatar: 'https://picsum.photos/200/200?random=31',
    lastMessage: 'Разбрахме се.',
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'me', text: 'Цената е крайна.', timestamp: 'Вчера' },
      { id: 'm2', senderId: 'u3', text: 'Разбрахме се.', timestamp: 'Вчера' }
    ]
  }
];
