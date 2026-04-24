"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowLeftRight, 
  PieChart, 
  TrendingUp, 
  User, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  X,
  CreditCard,
  Target
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/dashboard/overview" },
    { name: "Budget Nodes", icon: <Wallet size={20} />, href: "/dashboard/budget" },
    { name: "Transactions", icon: <ArrowLeftRight size={20} />, href: "/dashboard/transactions" },
    { name: "Investment", icon: <TrendingUp size={20} />, href: "/dashboard/investment" },
    { name: "Reports", icon: <PieChart size={20} />, href: "/dashboard/reports" },
  ];

  const secondaryItems = [
    { name: "Identity Node", icon: <User size={20} />, href: "/dashboard/profile" },
    { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings" },
  ];

  return (
    <div className={`w-80 bg-[#050505] h-screen fixed left-0 top-0 text-slate-400 flex flex-col p-8 z-[101] border-r border-white/5 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
      isOpen ? "translate-x-0 shadow-[40px_0_100px_rgba(0,0,0,0.9)]" : "-translate-x-full"
    } md:translate-x-0`}>
      
      {/* Brand Section */}
      <div className="mb-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-amber-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
             <div className="relative p-3 bg-black rounded-2xl border border-white/10">
                <ShieldCheck size={24} className="text-white" />
             </div>
          </div>
          <div className="flex flex-col">
             <span className="text-xl font-black tracking-[0.2em] text-white uppercase leading-none">Next<span className="text-amber-500">Wealth</span></span>
             <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] mt-1">User OS</span>
          </div>
        </Link>
        <button onClick={onClose} className="md:hidden p-2 text-slate-500 hover:text-white transition-colors">
           <X size={24} />
        </button>
      </div>

      {/* Main Menu */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-4 custom-admin-scrollbar">
        <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-10 ml-2 italic">Neural Access</p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between px-6 py-5 rounded-[1.8rem] transition-all duration-500 group ${
                isActive 
                  ? "bg-white/[0.03] text-white border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]" 
                  : "text-slate-500 hover:bg-white/[0.02] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`transition-all duration-500 group-hover:scale-110 ${isActive ? "text-amber-500" : "text-slate-600 group-hover:text-sky-500"}`}>
                   {item.icon}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all ${isActive ? "tracking-[0.3em]" : ""}`}>{item.name}</span>
              </div>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]"></div>}
            </Link>
          );
        })}

        <div className="pt-12 pb-6">
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-8 ml-2 italic">Personal Node</p>
          {secondaryItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-4 px-6 py-5 rounded-[1.8rem] transition-all duration-500 group ${
                  isActive 
                    ? "bg-white/[0.03] text-white border border-white/10" 
                    : "text-slate-500 hover:bg-white/[0.02] hover:text-white"
                }`}
              >
                <div className={`transition-all duration-500 ${isActive ? "text-sky-500" : "text-slate-600 group-hover:text-amber-500"}`}>
                   {item.icon}
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Premium Widget */}
        <div className="mt-8 p-8 bg-gradient-to-br from-sky-600/10 to-amber-500/10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
           <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-1000"></div>
           <Zap size={20} className="text-amber-500 mb-5 animate-pulse" />
           <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-2">Wealth Signal</p>
           <p className="text-xs font-bold text-slate-400 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">"Automate your future. Synchronize your assets to reach Level 5 Liquidity."</p>
        </div>
      </div>

      {/* User Status Bar */}
      <div className="mt-auto pt-8 border-t border-white/5">
        <div className="flex items-center justify-between bg-white/[0.02] p-5 rounded-[2rem] border border-white/5 group hover:border-sky-500/20 transition-all cursor-pointer">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-amber-500 p-0.5 rounded-2xl shadow-lg group-hover:rotate-6 transition-transform">
                 <div className="w-full h-full bg-black rounded-[calc(1rem-1px)] flex items-center justify-center text-white text-sm font-black uppercase">
                    {session?.user?.name?.[0] || 'U'}
                 </div>
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-black text-white tracking-tight truncate max-w-[100px] uppercase">{session?.user?.name || "Member"}</span>
                 <span className="text-[9px] text-amber-500 font-black uppercase tracking-widest mt-0.5">Active Session</span>
              </div>
           </div>
           
           <button 
             onClick={() => signOut({ callbackUrl: "/" })}
             className="p-3 bg-white/5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
           >
             <LogOut size={16} />
           </button>
        </div>
      </div>
    </div>
  );
}
