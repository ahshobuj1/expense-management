import React, {createContext} from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage';
import type {TCategory, TExpense, TExpenseContext} from '../types';

// eslint-disable-next-line react-refresh/only-export-components
export const ExpenseContext = createContext<TExpenseContext | undefined>(
  undefined
);

export const ExpenseProvider = ({children}: {children: React.ReactNode}) => {
  const key = 'expense';
  const [expenses, setExpenses] = useLocalStorage(key, []);

  const addExpense = (
    title: string,
    amount: number,
    category: TCategory,
    date: string
  ) => {
    const newExpense: TExpense = {
      id: Date.now().toString(),
      title,
      amount,
      category,
      date,
    };

    setExpenses((prev: TExpense[]) => [...prev, newExpense]);
  };

  const editExpense = (id: string, title: string, category: TCategory) => {
    setExpenses((prev: TExpense[]) =>
      prev.map((expense) =>
        expense.id === id ? {...expense, title, category} : expense
      )
    );
  };

  const removeExpense = (id: string) =>
    setExpenses((prev: TExpense[]) =>
      prev.filter((expense) => expense.id !== id)
    );

  const clearExpenses = () => setExpenses([]);

  const expenseInfo = {
    expenses,
    setExpenses,
    addExpense,
    editExpense,
    removeExpense,
    clearExpenses,
  };

  return (
    <ExpenseContext.Provider value={expenseInfo}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
