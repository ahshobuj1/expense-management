export type TExpense = {
  id: string;
  title: string;
  amount: number;
  category: TCategory;
  date: string;
};

export type TCategory = 'Food' | 'Utilities' | 'Transport' | 'Other';

export type TExpenseContext = {
  expenses: TExpense[];
  addExpense: (
    title: string,
    amount: number,
    category: TCategory,
    date: string
  ) => void;
  removeExpense: (id: string) => void;
  editExpense: (id: string, title: string, category: TCategory) => void;
  clearExpenses: () => void;
};
