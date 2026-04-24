"use client";
import React from "react";
import ReportsAnalytics from "@/sections/ReportsAnalytics";
import { useDashboard } from "@/context/DashboardContext";

export default function ReportsPage() {
  const { transactions } = useDashboard();

  return (
    <div className="space-y-12">
      <header className="mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-black text-[#666A86] tracking-tight">
          Financial Reports
        </h1>
        <p className="text-gray-500 font-medium text-lg mt-2">Visualize your spending patterns and asset performance over time.</p>
      </header>

      {/* Reports and Charts Section */}
      <div className="-mt-12">
        <ReportsAnalytics transactions={transactions} />
      </div>
    </div>
  );
}
