"use client";
import React from "react";
import RecentTransactions from "@/sections/RecentTransaction";
import { useDashboard } from "@/context/DashboardContext";
import { History, Search, Filter, Download } from "lucide-react";

export default function TransactionsPage() {
  const { transactions, addTransaction } = useDashboard();

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-sky-500/10 text-sky-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-sky-500/20 w-fit">
             <History size={14} />
             Forensic Ledger
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter italic leading-none">
            Transactions <span className="bg-gradient-to-r from-sky-400 to-amber-500 bg-clip-text text-transparent">History</span>
          </h1>
          <p className="text-slate-400 font-medium text-xl max-w-2xl">Audit and manage every financial transmission across your neural network nodes.</p>
        </div>

        <div className="flex items-center gap-4">
           <button className="p-5 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
              <Download size={20} />
           </button>
           <button className="flex items-center gap-3 bg-amber-500 text-black px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all">
              <Filter size={18} />
              Filter Matrix
           </button>
        </div>
      </header>

      {/* Transactions Table Section */}
      <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[4rem] border border-white/5 p-2 shadow-3xl overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/5 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
         <RecentTransactions transactions={transactions} onAddTransaction={addTransaction} />
      </div>
    </div>
  );
}
