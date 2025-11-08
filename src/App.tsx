import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  return (
    <main className="contain">
      <h1 className="text-3xl font-bold text-center text-blue-600 ">
        Expense Management
      </h1>
      {/* create expense form */}
      <ExpenseForm />
      <ExpenseList />
    </main>
  );
}

export default App;
