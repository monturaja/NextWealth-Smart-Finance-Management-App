"use client";
import React, { useLayoutEffect, useRef } from "react";
import { BarChart3, Bitcoin, Landmark, TrendingUp, ArrowUpRight, ChevronRight, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Investment = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".investment-card", 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          }
        }
      );

      gsap.fromTo(".investment-summary", 
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".investment-summary",
            start: "top 95%",
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const investments = [
    { name: "Stocks", value: "₹60,000", change: "+12%", icon: <BarChart3 size={24} />, color: "from-sky-500/20 to-sky-600/5", border: "border-sky-500/20", text: "text-sky-400" },
    { name: "Crypto", value: "₹25,000", change: "-2%", icon: <Bitcoin size={24} />, color: "from-amber-500/20 to-amber-600/5", border: "border-amber-500/20", text: "text-amber-400" },
    { name: "Mutual Funds", value: "₹40,000", change: "+8%", icon: <Landmark size={24} />, color: "from-purple-500/20 to-purple-600/5", border: "border-purple-500/20", text: "text-purple-400" },
  ];

  return (
    <div ref={sectionRef} className="space-y-12">
      <div className="grid md:grid-cols-3 gap-8">
        {investments.map((item, index) => (
          <div 
            key={item.name}
            className={`investment-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border transition-all duration-700 relative group overflow-hidden bg-gradient-to-br ${item.color} ${item.border} hover:scale-[1.02]`}
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-20 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
               <ArrowUpRight size={48} className="text-white" />
            </div>

            <div className={`w-14 h-14 bg-black/40 rounded-2xl flex items-center justify-center mb-8 border border-white/5 shadow-xl group-hover:rotate-12 transition-transform duration-500 ${item.text}`}>
              {item.icon}
            </div>

            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2 italic">{item.name} Node</h3>
            <p className="text-4xl font-black text-white mb-6 tracking-tighter">{item.value}</p>
            
            <div className="flex items-center justify-between">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                item.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {item.change}
              </span>
              <button className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                Interface
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="investment-summary bg-[#0A0A0A] p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-white/5 flex flex-col md:flex-row items-center justify-between text-white shadow-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600/10 to-amber-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000 pointer-events-none rotate-12">
           <Landmark size={200} />
        </div>
        
        <div className="relative z-10 text-center md:text-left mb-10 md:mb-0">
           <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
              <Zap size={18} className="text-amber-500 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Aggregated Assets</span>
           </div>
           <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Total Combined <span className="text-sky-500">Wealth</span></h3>
           <p className="text-slate-500 font-bold text-xs md:text-sm tracking-widest uppercase">Cross-channel liquidity synchronization active.</p>
        </div>
        
        <div className="relative z-10 text-center md:text-right">
           <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic">₹1,25,000</h2>
           <div className="flex items-center justify-center md:justify-end gap-3 mt-4 text-green-400 font-black text-[9px] md:text-[10px] uppercase tracking-widest">
              <TrendingUp size={16} />
              <span>+₹4,500 Velocity Today (3%)</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;