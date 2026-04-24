"use client";
import React, { useMemo, useLayoutEffect, useRef } from "react";
import { Wallet, TrendingUp, TrendingDown, Target, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DashboardSection = ({ transactions = [] }) => {
  const containerRef = useRef(null);
  
  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach(tx => {
      if (tx.amount > 0) income += tx.amount;
      else expense += Math.abs(tx.amount);
    });
    return {
      totalBalance: income - expense,
      income,
      expense,
      savingsRate: income > 0 ? Math.round(((income - expense) / income) * 100) : 0
    };
  }, [transactions]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".stat-card", 
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    { 
      title: "Total Balance", 
      value: `₹${stats.totalBalance.toLocaleString('en-IN')}`, 
      icon: <Wallet size={24} />, 
      color: "from-sky-500 to-blue-600",
      accent: "sky",
      change: "12%",
      isPositive: true
    },
    { 
      title: "Monthly Income", 
      value: `₹${stats.income.toLocaleString('en-IN')}`, 
      icon: <TrendingUp size={24} />, 
      color: "from-amber-400 to-amber-600",
      accent: "amber",
      change: "8%",
      isPositive: true
    },
    { 
      title: "Monthly Expense", 
      value: `₹${stats.expense.toLocaleString('en-IN')}`, 
      icon: <TrendingDown size={24} />, 
      color: "from-red-500 to-rose-600",
      accent: "rose",
      change: "15%",
      isPositive: false
    },
    { 
      title: "Savings Node", 
      value: `${stats.savingsRate}%`, 
      icon: <Target size={24} />, 
      color: "from-purple-500 to-indigo-600",
      accent: "purple",
      change: "2%",
      isPositive: true
    }
  ];

  return (
    <section ref={containerRef} className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {cards.map((card, index) => (
          <div 
            key={card.title}
            className="stat-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-700"
          >
            {/* Background Glows */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-${card.accent}-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000`}></div>
            
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className={`p-5 rounded-[2rem] bg-gradient-to-br ${card.color} text-white shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                {card.icon}
              </div>
              <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                card.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                 {card.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                 {card.change}
              </div>
            </div>

            <div className="relative z-10">
              <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-3 italic">{card.title}</h4>
              <h2 className="text-4xl font-black text-white tracking-tighter leading-none">{card.value}</h2>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
               <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Network Integrated</span>
               <Zap size={14} className="text-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardSection;