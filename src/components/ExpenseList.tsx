import {useState} from 'react';
import {useExpense} from '../hooks/useExpenses';
import type {TExpense} from '../types';
import ExpenseItem from './ExpenseItem';

const ExpenseList = () => {
  const {expenses} = useExpense();

  //  add category filter state
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredExpenses =
    categoryFilter === 'all'
      ? expenses
      : expenses.filter((e) => e.category === categoryFilter);

  return (
    <div className="my-6">
      <div className="mb-4 flex gap-2">
        {['all', 'Food', 'Transport', 'Utilities', 'Others'].map((c) => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={`capitalize px-3 py-0 rounded cursor-pointer  ${
              categoryFilter === c
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}>
            {c}
          </button>
        ))}
      </div>

      {filteredExpenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Amount</th>
                <th className="px-4 py-2 border-b">Category</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense: TExpense) => (
                <ExpenseItem expense={expense} key={expense.id} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
