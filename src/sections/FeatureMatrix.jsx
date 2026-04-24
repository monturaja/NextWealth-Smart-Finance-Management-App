"use client";
import React, { useLayoutEffect, useRef } from "react";
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Wallet, 
  PieChart, 
  Smartphone,
  ChevronRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FeatureMatrix = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      });

      gsap.from(".feature-header", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { title: "Smart Budgeting", icon: <Wallet />, desc: "Set goals and automatically categorize your expenses to stay on track effortlessly.", color: "text-[#1C4D8D]", bg: "bg-[#BDE8F5]" },
    { title: "Bank-Grade Security", icon: <Shield />, desc: "Your data is encrypted with 256-bit AES, ensuring the highest level of privacy.", color: "text-slate-700", bg: "bg-slate-100" },
    { title: "Real-time Sync", icon: <Zap />, desc: "Link your bank accounts safely and see transactions updated in real time.", color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Actionable Insights", icon: <BarChart3 />, desc: "Receive personalized recommendations to grow your wealth and cut useless fees.", color: "text-green-600", bg: "bg-green-50" },
    { title: "Investment Tracking", icon: <PieChart />, desc: "See your portfolio across different assets in one unified, clear dashboard.", color: "text-rose-600", bg: "bg-rose-50" },
    { title: "Mobile Optimized", icon: <Smartphone />, desc: "Manage your money on the go, with a 100% responsive fluid mobile interface.", color: "text-[#1C4D8D]", bg: "bg-[#BDE8F5]" },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 bg-[#BDE8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="feature-header mb-16 md:mb-24 text-center space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#BDE8F5] text-[#1C4D8D] text-xs font-semibold rounded-full mx-auto">
              Core Features
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-[#0F2854] tracking-tight">Everything you need to grow</h2>
           <p className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto">Powerful financial tools distilled into a beautifully simple interface. Take the guesswork out of wealth building.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
           {features.map((f, i) => (
             <div key={i} className="feature-card group bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#BDE8F5] transition-all duration-500">
                <div className={`w-14 h-14 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
                   {React.cloneElement(f.icon, { size: 24 })}
                </div>
                <h3 className="text-xl font-bold text-[#0F2854] mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">{f.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-[#1C4D8D] opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                   Learn more <ChevronRight size={16} />
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureMatrix;
