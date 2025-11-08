import ExpenseChart from './components/ExpenseChart';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  return (
    <main className="contain">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mt-10 ">
        Expense Management
      </h1>

      <ExpenseForm />
      <ExpenseList />
      <ExpenseChart />
    </main>
  );
}

export default App;
