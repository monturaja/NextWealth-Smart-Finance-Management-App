"use client";
import React, { useLayoutEffect, useRef } from "react";
import { 
  Users, 
  Activity, 
  Zap, 
  ShieldCheck, 
  CreditCard,
  TrendingUp
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GlobalTrust = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Active Users", val: "50,000+", icon: <Users />, color: "text-[#1C4D8D]", bg: "bg-[#BDE8F5]" },
    { label: "Transactions Tracked", val: "1.2M", icon: <Activity />, color: "text-[#1C4D8D]", bg: "bg-[#BDE8F5]" },
    { label: "Platform Uptime", val: "99.9%", icon: <Zap />, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Data Encryption", val: "256-bit", icon: <ShieldCheck />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Volume Managed", val: "₹50B+", icon: <CreditCard />, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Avg Portfolio Growth", val: "14%", icon: <TrendingUp />, color: "text-violet-600", bg: "bg-violet-50" },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 bg-white overflow-hidden text-center">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
           <h2 className="text-3xl md:text-4xl font-bold text-[#0F2854] tracking-tight mb-4">Trusted by modern investors</h2>
           <p className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto">Join tens of thousands of users who rely on NextWealth to manage, track, and grow their finances securely every single day.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
           {stats.map((s, i) => (
             <div key={i} className="stat-card bg-[#BDE8F5] p-6 md:p-8 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:border-[#BDE8F5] transition-all duration-300 flex flex-col items-center group cursor-pointer">
                <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:-translate-y-1 transition-transform`}>
                   {React.cloneElement(s.icon, { size: 20 })}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F2854] tracking-tight mb-1">{s.val}</h3>
                <p className="text-xs font-semibold text-slate-500">{s.label}</p>
             </div>
           ))}
        </div>

        {/* Global Network Banner */}
        <div className="mt-16 md:mt-24 p-8 md:p-12 bg-[#0F2854] rounded-[2rem] md:rounded-[3rem] relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#4988C4]/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4988C4]/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>

           <div className="text-left relative z-10">
              <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Enterprise reliability, for everyone.</h4>
              <p className="text-slate-400 font-medium">Bank-level infrastructure supporting your financial peace of mind.</p>
           </div>
           
           <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 relative z-10 w-full md:w-auto p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-semibold text-white">Systems Operational</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10"></div>
              <div className="flex items-center gap-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-semibold text-white">API Sync Active</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalTrust;
