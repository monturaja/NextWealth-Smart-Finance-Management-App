"use client";
import React from "react";
import BudgetProgress from "@/sections/BudgetProgress";
import { useDashboard } from "@/context/DashboardContext";

export default function BudgetPage() {
  const { budgets } = useDashboard();

  return (
    <div className="space-y-12">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-[#666A86] tracking-tight">
          Budget Tracker
        </h1>
        <p className="text-gray-500 font-medium text-lg mt-2">Manage your spending limits and track your monthly budget progress.</p>
      </header>

      {/* Budget Breakdown Section */}
      <BudgetProgress budgets={budgets} />
    </div>
  );
}
