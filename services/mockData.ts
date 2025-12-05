import { Master, Project } from '../types';

export const MOCK_MASTERS: Master[] = [
  {
    id: '1',
    name: 'Иван Петров',
    specialty: 'ВиК Услуги',
    location: 'София',
    rating: 4.9,
    reviews: 124,
    verified: true,
    hourlyRate: 45,
    imageUrl: 'https://picsum.photos/200/200?random=1',
    description: 'Специалист с над 15 години опит в цялостно изграждане на ВиК инсталации.',
    tags: ['Спешни ремонти', 'Бани', 'Водопроводи']
  },
  {
    id: '2',
    name: 'Строителна Бригада "Основа"',
    specialty: 'Груб Строеж & Саниране',
    location: 'Пловдив',
    rating: 4.7,
    reviews: 89,
    verified: true,
    imageUrl: 'https://picsum.photos/200/200?random=2',
    description: 'Комплексни решения за вашия дом. Работим с договори и гаранции.',
    tags: ['Саниране', 'Покриви', 'Изолация']
  },
  {
    id: '3',
    name: 'Георги Димитров',
    specialty: 'Електротехник',
    location: 'Варна',
    rating: 5.0,
    reviews: 42,
    verified: true,
    hourlyRate: 50,
    imageUrl: 'https://picsum.photos/200/200?random=3',
    description: 'Лицензиран електротехник. Проектиране и изграждане на ел. инсталации.',
    tags: ['Ел. Табла', 'Осветление', 'Умен дом']
  },
  {
    id: '4',
    name: 'Арт Дизайн Студио',
    specialty: 'Интериорен Дизайн',
    location: 'София',
    rating: 4.8,
    reviews: 210,
    verified: true,
    imageUrl: 'https://picsum.photos/200/200?random=4',
    description: 'Превръщаме вашите идеи в реалност с 3D визуализации и авторски надзор.',
    tags: ['3D Проекти', 'Обзавеждане', 'Декорация']
  }
];

export const CLIENT_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Основен ремонт на баня',
    status: 'active',
    amount: 3500,
    escrowSecured: true,
    masterName: 'Иван Петров',
    date: '2023-10-15',
    furnitureDiscountActive: true
  },
  {
    id: 'p2',
    title: 'Смяна на ел. табло',
    status: 'completed',
    amount: 250,
    escrowSecured: false,
    masterName: 'Георги Димитров',
    date: '2023-09-01',
    furnitureDiscountActive: false
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
    furnitureDiscountActive: false
  },
  {
    id: 'mp2',
    title: 'Шпакловка и боя - Център',
    status: 'pending',
    amount: 1800,
    escrowSecured: true,
    date: '2023-10-22',
    furnitureDiscountActive: false
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
