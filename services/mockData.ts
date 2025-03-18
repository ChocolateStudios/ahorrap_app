import { FinancialGoal } from '../types/financialGoals';

export const mockFinancialGoals: FinancialGoal[] = [
  { 
    id: "1", 
    name: "Vivienda", 
    currentAmount: 5000, 
    targetAmount: 15000, 
    icon: "home", 
    color: "#6665DD" 
  },
  { 
    id: "2", 
    name: "Vacaciones", 
    currentAmount: 2000, 
    targetAmount: 5000, 
    icon: "airplane", 
    color: "#FF6B6B" 
  },
  { 
    id: "3", 
    name: "Educación", 
    currentAmount: 3500, 
    targetAmount: 10000, 
    icon: "school", 
    color: "#22A9A2" 
  }
];

export const mockFinancialGoalsDetailed = [
  {
    id: "1",
    title: "Fondo de emergencia",
    targetAmount: 10000,
    currentAmount: 6500,
    deadline: "31/12/2023",
    icon: "shield-half-full",
    iconBgColor: "#22C55E"
  },
  {
    id: "2",
    title: "Vacaciones",
    targetAmount: 5000,
    currentAmount: 2800,
    deadline: "15/10/2023",
    icon: "airplane",
    iconBgColor: "#3B82F6"
  },
  {
    id: "3",
    title: "Nuevo auto",
    targetAmount: 30000,
    currentAmount: 12000,
    deadline: "30/6/2024",
    icon: "car",
    iconBgColor: "#A855F7"
  },
  {
    id: "4",
    title: "Educación",
    targetAmount: 15000,
    currentAmount: 1800,
    deadline: "15/01/2024",
    icon: "notebook",
    iconBgColor: "#F97316"
  }
]; 