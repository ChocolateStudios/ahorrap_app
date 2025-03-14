// services/api.ts
export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string; // e.g. "2023-12-31"
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  amount: number;
}

export interface Movement {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: string; // e.g. "2023-03-12"
}

export async function fetchGoals(): Promise<Goal[]> {
  // Simula un retardo
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 6500,
      deadline: '2023-12-31',
    },
    {
      id: '2',
      title: 'Vacation',
      targetAmount: 5000,
      currentAmount: 2800,
      deadline: '2023-10-15',
    },
    {
      id: '3',
      title: 'New Car',
      targetAmount: 30000,
      currentAmount: 12000,
      deadline: '2024-06-30',
    },
    {
      id: '4',
      title: 'Education',
      targetAmount: 15000,
      currentAmount: 0,
      deadline: '2025-01-15',
    },
  ];
}

export async function fetchCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 'cat1', name: 'Alimentos', type: 'expense', amount: 450 },
    { id: 'cat2', name: 'Transporte', type: 'expense', amount: 200 },
    { id: 'cat3', name: 'Vivienda', type: 'expense', amount: 1000 },
    { id: 'cat4', name: 'Entretenimiento', type: 'expense', amount: 150 },
    { id: 'cat5', name: 'Salud', type: 'expense', amount: 300 },
    { id: 'cat6', name: 'Inversiones', type: 'income', amount: 120 },
    { id: 'cat7', name: 'Freelance', type: 'income', amount: 800 },
  ];
}

export async function fetchRecentMovements(): Promise<Movement[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: 'm1',
      description: 'Consulta médica',
      category: 'Salud',
      amount: 300,
      type: 'expense',
      date: '2025-03-10',
    },
    {
      id: 'm2',
      description: 'Dividendos',
      category: 'Inversiones',
      amount: 120,
      type: 'income',
      date: '2025-03-09',
    },
    {
      id: 'm3',
      description: 'Cine y cena',
      category: 'Entretenimiento',
      amount: 150,
      type: 'expense',
      date: '2025-03-08',
    },
    {
      id: 'm4',
      description: 'Proyecto freelance',
      category: 'Freelance',
      amount: 800,
      type: 'income',
      date: '2025-03-07',
    },
    {
      id: 'm5',
      description: 'Gasolina',
      category: 'Transporte',
      amount: 200,
      type: 'expense',
      date: '2025-03-07',
    },
  ];
}
