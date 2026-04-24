"use client";
import React, { useLayoutEffect, useRef } from "react";
import { 
  ArrowRight, 
  Wallet,
  TrendingUp,
  PieChart,
  ShieldCheck,
  CreditCard,
  Activity
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });
      
      tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.8 })
        .from(".hero-title", { y: 40, opacity: 0, stagger: 0.1, duration: 1.2 }, "-=0.6")
        .from(".hero-desc", { y: 20, opacity: 0 }, "-=0.8")
        .from(".hero-cta", { scale: 0.95, opacity: 0 }, "-=0.8")
        .from(".hero-visuals", { x: 40, opacity: 0, duration: 1.5 }, "-=1.2")
        .from(".floating-elem", { y: 20, opacity: 0, stagger: 0.15 }, "-=1");

      // Floating animations
      gsap.to(".floating-1", { y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".floating-2", { y: 12, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
      gsap.to(".floating-3", { y: -10, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-6 overflow-hidden bg-white">
      {/* Soft Background Gradients */}
      <div className="absolute top-0 right-0 w-full md:w-[800px] h-[600px] md:h-[800px] bg-[#BDE8F5]/80 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/4 opacity-70 z-0"></div>
      <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[600px] bg-[#BDE8F5]/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 opacity-60 z-0"></div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-6 md:space-y-8 lg:pr-8 text-center lg:text-left mt-10 lg:mt-0">
           <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-[#BDE8F5] border border-[#BDE8F5] rounded-full shadow-sm mx-auto lg:mx-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4988C4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4988C4]"></span>
              </span>
              <span className="text-xs font-semibold text-[#1C4D8D]">NextWealth API v2 Live</span>
           </div>
           
           <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold text-[#0F2854] tracking-tight leading-[1.1]">
                 <span className="hero-title block text-[#0F2854]">Your Smart</span>
                 <span className="hero-title block text-[#1C4D8D]">Money Manager</span>
              </h1>
           </div>
           
           <p className="hero-desc text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the future of personal finance. Automate your budget, track deep insights, and build your wealth securely on a modern platform.
           </p>
           
           <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/auth/login" 
                className="group flex items-center justify-center gap-2 bg-[#1C4D8D] text-white px-8 py-4 rounded-xl font-semibold text-[15px] shadow-lg shadow-[#1C4D8D]/20 hover:bg-[#1C4D8D] transition-all hover:-translate-y-1"
              >
                 Get Started
                 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              <button className="px-8 py-4 rounded-xl bg-white border border-slate-200 font-semibold text-[15px] text-slate-700 shadow-sm hover:bg-[#BDE8F5] transition-all">
                 View Demo
              </button>
           </div>

           <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6">
              {[
                { label: "Active Users", icon: <Activity />, val: "50,000+" },
                { label: "Secure Data", icon: <ShieldCheck />, val: "Bank-Level" },
              ].map((stat, i) => (
                <div key={i} className="flex gap-3 items-center">
                   <div className="w-10 h-10 rounded-full bg-[#BDE8F5] flex items-center justify-center text-[#BDE8F5]0 border border-slate-100">
                      {React.cloneElement(stat.icon, { size: 18 })}
                   </div>
                   <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-[#0F2854]">{stat.val}</span>
                      <span className="text-xs text-[#BDE8F5]0 font-medium">{stat.label}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Visual Mockups */}
        <div className="hero-visuals relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
           {/* Center Big Card */}
           <div className="relative z-20 w-[90%] md:w-[360px] bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100/50">
              <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Balance</h3>
              <p className="text-2xl md:text-3xl font-bold text-[#0F2854] tracking-tight mb-8">₹14,52,800</p>
              
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-[#BDE8F5] hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <TrendingUp size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-[#0F2854]">Investments</p>
                          <p className="text-xs text-[#BDE8F5]0">Up 12% this month</p>
                       </div>
                    </div>
                    <span className="text-sm font-bold text-[#0F2854]">₹8L</span>
                 </div>
                 
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-[#BDE8F5] hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1C4D8D] flex items-center justify-center">
                          <Wallet size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-[#0F2854]">Savings</p>
                          <p className="text-xs text-slate-500">Auto-recurring</p>
                       </div>
                    </div>
                    <span className="text-sm font-bold text-[#0F2854]">₹4L</span>
                 </div>
              </div>
           </div>

           {/* Floating Element 1 - Expense Chart */}
           <div className="floating-elem floating-1 absolute top-[5%] md:top-10 -left-[5%] md:-left-12 z-30 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4988C4] rounded-full flex items-center justify-center text-white">
                 <PieChart size={20} />
              </div>
              <div className="pr-4">
                 <p className="text-xs text-[#BDE8F5]0 font-medium">Monthly Spending</p>
                 <p className="text-sm font-bold text-[#0F2854]">Optimal</p>
              </div>
           </div>

           {/* Floating Element 2 - Recent Transaction */}
           <div className="floating-elem floating-2 absolute bottom-[10%] md:bottom-20 -right-[5%] md:-right-8 z-30 bg-white/80 backdrop-blur-xl p-4 md:p-5 rounded-2xl shadow-xl border border-white/50 w-56 md:w-64">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <CreditCard size={14} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-[#0F2854]">Grocery Run</p>
                    <p className="text-[10px] text-[#BDE8F5]0">Just now</p>
                 </div>
              </div>
              <p className="text-sm font-bold text-right text-[#0F2854]">-₹4,200</p>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;