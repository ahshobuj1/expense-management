import {useExpense} from '../hooks/useExpenses';

const BudgetTracker = () => {
  const {expenses, budget} = useExpense();

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const totalSpentThisMonth = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((total, expense) => total + expense.amount, 0);

  const percentage = (totalSpentThisMonth / budget) * 100;
  const isOverBudget = totalSpentThisMonth > budget;

  const barColor = isOverBudget ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className="my-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Monthly Budget Progress</h2>

      <div className="mb-2 flex justify-between font-medium">
        <span>Spent: ${totalSpentThisMonth.toFixed(2)}</span>
        <span
          className={isOverBudget ? 'text-red-600 font-bold' : 'text-gray-700'}>
          Budget: ${budget.toFixed(2)}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
        <div
          className={`h-5 rounded-full transition-all duration-300 ${barColor}`}
          style={{width: `${Math.min(percentage, 100)}%`}}></div>
      </div>

      {isOverBudget && (
        <p className="text-red-600 text-sm font-semibold mt-3 text-center">
          Warning: You are ${(totalSpentThisMonth - budget).toFixed(2)} over
          budget!
        </p>
      )}
    </div>
  );
};

export default BudgetTracker;
