"use client";
import React from "react";
import DashboardSection from "@/sections/DashboardSection";
import Investment from "@/sections/Investment";
import { useDashboard } from "@/context/DashboardContext";
import { useSession } from "next-auth/react";
import { Plus, ArrowUpRight, Shield, Star, Zap, Activity } from "lucide-react";

export default function OverviewPage() {
  const { data: session } = useSession();
  const { transactions } = useDashboard();

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Dynamic Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full w-fit border border-amber-500/20 shadow-lg shadow-amber-500/5">
             <Star size={12} fill="currentColor" />
             Neural Finance Nexus
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none italic">
            Hi, <span className="bg-gradient-to-r from-sky-400 to-amber-500 bg-clip-text text-transparent">{session?.user?.name?.split(' ')[0] || "User"}</span>.
          </h1>
          <p className="text-slate-400 font-medium text-xl leading-relaxed max-w-2xl">
             Your financial snapshot is synchronized. Monitor, optimize, and expand your wealth nodes.
          </p>
        </div>

        <div className="flex gap-5">
           <button className="group relative flex items-center gap-3 bg-amber-500 text-black px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <Plus size={20} strokeWidth={3} />
              <span>Add Entry</span>
           </button>
           <button className="flex items-center gap-3 bg-white/5 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest border border-white/5 hover:bg-white/10 transition-all active:scale-95">
              <Activity size={20} />
              <span>Global Report</span>
           </button>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="relative group">
         <div className="absolute -inset-10 bg-sky-500/5 rounded-[5rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
         <DashboardSection transactions={transactions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-10">
           <div className="flex items-center justify-between px-6">
              <div className="flex flex-col">
                 <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">Market Position</h2>
                 <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mt-2">Real-time Asset Velocity</span>
              </div>
              <div className="p-4 bg-sky-500/10 text-sky-500 rounded-2xl border border-sky-500/20">
                 <Activity size={24} />
              </div>
           </div>
           
           <div className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/5 blur-[80px] rounded-full pointer-events-none"></div>
              <div className="relative z-10">
                 <Investment />
              </div>
           </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-10">
           <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic px-6">Security Node</h2>
           <div className="bg-gradient-to-br from-[#0A0A0A] to-[#111111] rounded-[4rem] p-10 border border-white/5 relative overflow-hidden shadow-3xl h-full min-h-[450px] group">
              <div className="absolute top-0 right-0 p-12 scale-150 rotate-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none">
                 <Shield size={200} />
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                 <div>
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-sky-500/10 text-sky-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-sky-500/20 mb-8">
                       <Shield size={14} />
                       Status: Shielded
                    </div>
                    <h4 className="text-4xl font-black text-white tracking-tight leading-none mb-6">
                       Biometric <span className="text-amber-500">Lock</span> Active
                    </h4>
                    <p className="text-slate-400 font-medium text-lg leading-relaxed">
                       Your financial data nodes are encrypted with military-grade protocols.
                    </p>
                 </div>
                 
                 <div className="mt-auto pt-12">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6 italic">Protocol Logs</p>
                    <div className="bg-white/[0.03] p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between group-hover:border-sky-500/20 transition-all">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Today @ 14:32</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase">Verification Success</span>
                       </div>
                       <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                          <Zap size={18} fill="currentColor" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
