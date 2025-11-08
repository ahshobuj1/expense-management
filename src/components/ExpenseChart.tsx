import {useMemo} from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {useExpense} from '../hooks/useExpenses';

const COLORS = {
  Food: '#0088FE',
  Transport: '#00C49F',
  Utilities: '#FFBB28',
  Other: '#FF8042',
  Others: '#FF8042',
};

const ExpenseChart = () => {
  const {expenses} = useExpense();
  const chartData = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      const {category, amount} = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {} as {[key: string]: number});

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No expense data to display in chart.
      </div>
    );
  }

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Spending by Category
      </h2>
      <div style={{width: '100%', height: 300}}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({name, percent}) =>
                `${name} ${((percent as number) * 100).toFixed(0)}%`
              }>
              {chartData.map((entry) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[entry.name as keyof typeof COLORS]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
