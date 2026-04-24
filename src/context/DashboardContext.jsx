"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default demo budgets (can be made dynamic later)
  const [budgets, setBudgets] = useState([
    { id: 1, name: "Food", spent: 0, limit: 6000, color: "bg-green-500" },
    { id: 2, name: "Travel", spent: 0, limit: 5000, color: "bg-[#4988C4]" },
    { id: 3, name: "Shopping", spent: 0, limit: 4000, color: "bg-red-500" },
  ]);

  // 1. Fetch transactions from database on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        if (res.ok) {
          const data = await res.json();
          setTransactions(data);
          
          // Re-calculate budgets based on fetched transactions
          updateBudgetSpent(data);
        }
      } catch (err) {
        console.error("Failed to load transactions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const updateBudgetSpent = (txs) => {
    const updatedBudgets = budgets.map(b => {
      const spent = txs
        .filter(t => t.category === b.name && t.type === "Expense")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      return { ...b, spent };
    });
    setBudgets(updatedBudgets);
  };

  // 2. Persist new transaction to database
  const addTransaction = async (newTx) => {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTx),
      });

      if (res.ok) {
        const savedTx = await res.json();
        setTransactions(prev => [savedTx, ...prev]);

        // Update budget locally for immediate feedback
        if (savedTx.type === "Expense") {
          const absAmount = Math.abs(savedTx.amount);
          setBudgets(prev => prev.map(b => 
            b.name === savedTx.category 
              ? { ...b, spent: b.spent + absAmount } 
              : b
          ));
        }
        return { success: true };
      }
      return { success: false, message: "Server error" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const value = {
    transactions,
    budgets,
    addTransaction,
    loading
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
