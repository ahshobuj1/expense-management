import {useState} from 'react';
import {useExpense} from '../hooks/useExpenses';
import type {TCategory, TExpense} from '../types';
import {toast} from 'sonner';

const ExpenseItem = ({expense}: {expense: TExpense}) => {
  const {editExpense, removeExpense} = useExpense();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Food',
  });

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.category) {
      toast.error('Please fill in all fields');
      return;
    }

    console.log(form);

    editExpense(expense.id, form.title, form.category as TCategory);
    setForm({
      title: '',
      category: 'Food',
    });

    toast.success('Expense added successfully');
    setIsEditing(false);
  };

  return (
    <tr
      key={expense.id}
      className="border-2 border-gray-300 hover:shadow-lg bg-blue-50 rounded-md shadow-sm text-center ">
      {isEditing ? (
        <td className="w-full py-3 px-3">
          <form onSubmit={handleSubmit} className="flex gap-3 ">
            <input
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              type="text"
              id="title"
              className="input w-full py-1"
              placeholder="Enter expense title"
            />

            <select
              id="category"
              className="input w-full py-1"
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}>
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select>

            <button
              type="submit"
              className="px-4 py-0 cursor-pointer hover:bg-green-700 transition bg-green-600 text-white rounded-md">
              Save
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-0 cursor-pointer hover:bg-red-700 transition bg-red-600 text-white rounded-md">
              Cancel
            </button>
          </form>
        </td>
      ) : (
        <>
          <td className="px-4 py-3 border-b text-lg font-medium">
            {expense.title}
          </td>
          <td className="px-4 py-2 border-b text-gray-500">
            ${expense.amount.toFixed(2)}
          </td>
          <td className="px-4 py-2 border-b text-gray-500 capitalize">
            {expense.category}
          </td>
          <td className="px-4 py-2 border-b text-gray-500">
            {new Date(expense.date).toLocaleDateString()}
          </td>
          <td className="px-4 py-2 flex gap-2 justify-center">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300 text-blue-700 transition px-2 py-0">
              Edit
            </button>
            <button
              onClick={() => removeExpense(expense.id)}
              className="rounded-md cursor-pointer bg-red-200 hover:bg-red-300 text-red-700 transition px-2 py-0">
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default ExpenseItem;
