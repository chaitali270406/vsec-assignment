
import { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [month, setMonth] = useState(new Date().toLocaleDateString("en-CA").slice(0, 7));
  const [expenses, setExpenses] = useState([]);

  const API = "http://localhost:5000/api/expenses";

  async function getExpenses() {
    const response = await fetch(`${API}/${month}`);
    const data = await response.json();
    setExpenses(data);
  }

  useEffect(() => {
    getExpenses();
  }, [month]);

  async function addExpense(e) {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        amount: Number(amount),
        date: date
      })
    });

    setName("");
    setAmount("");
    getExpenses();
  }

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div>
      <h1>Monthly Expense Tracker</h1>

      <form onSubmit={addExpense}>
        <input
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Add Expense</button>
      </form>

      <h3>Select Month</h3>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <h2>Monthly Total: ₹{total}</h2>

      <h3>Expenses</h3>

      {expenses.map((expense) => (
        <p key={expense._id}>
          {expense.name} - ₹{expense.amount} - {expense.date}
        </p>
      ))}
    </div>
  );
}

export default App;
