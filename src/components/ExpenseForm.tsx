import {useState} from 'react';
import {toast} from 'sonner';
import {useExpense} from '../hooks/useExpenses';
import type {TCategory} from '../types';

const ExpenseForm = () => {
  const {addExpense} = useExpense();
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: '',
  });

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    if (!form.title || !form.amount || !form.category || !form.date) {
      toast.error('Please fill in all fields');
      return;
    }

    console.log(form);

    addExpense(
      form.title,
      Number(form.amount),
      form.category as TCategory,
      form.date
    );
    setForm({
      title: '',
      amount: '',
      category: 'Food',
      date: '',
    });

    toast.success('Expense added successfully');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className=" mt-16 flex gap-3">
        <input
          value={form.title}
          onChange={(e) => setForm({...form, title: e.target.value})}
          type="text"
          id="title"
          className="input"
          placeholder="Enter expense title"
        />

        <input
          value={form.amount}
          onChange={(e) => setForm({...form, amount: e.target.value})}
          type="number"
          id="amount"
          className="input"
          placeholder="Enter expense amount"
        />

        <select
          id="category"
          className="input"
          value={form.category}
          onChange={(e) => setForm({...form, category: e.target.value})}>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
        </select>

        <input
          value={form.date}
          onChange={(e) => setForm({...form, date: e.target.value})}
          type="date"
          id="date"
          className="input"
        />

        <button
          type="submit"
          className="px-4 py-0 cursor-pointer hover:bg-blue-700 transition bg-blue-600 text-white rounded-md">
          + Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
