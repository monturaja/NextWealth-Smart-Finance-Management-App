"use client";
import React, { useLayoutEffect, useRef } from "react";
import { 
  ShieldCheck, 
  Database, 
  Lock,
  Activity,
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SecurityCore = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".security-visual", {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      });

      gsap.from(".security-feature", {
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const protocols = [
    { name: "Bank-Grade Encryption", icon: <Lock />, desc: "Your data is encrypted with 256-bit AES encryption, preventing unauthorized access." },
    { name: "Distributed Integrity", icon: <Database />, desc: "Our database infrastructure is distributed globally to guarantee perfect uptime." },
    { name: "Continuous Auditing", icon: <ShieldCheck />, desc: "We perform automated forensic audits on our smart systems continuously." },
    { name: "Real-time Threat Detection", icon: <Activity />, desc: "Machine learning algorithms intercept and stop suspicious activities instantly." },
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 bg-[#0F2854] overflow-hidden text-white relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4988C4]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Visual Mockup */}
        <div className="security-visual lg:w-1/2 w-full order-2 lg:order-1 relative">
           <div className="bg-[#0F2854]/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4988C4] via-[#4988C4] to-[#4988C4]"></div>
              
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#4988C4]/20 text-[#4988C4] flex items-center justify-center">
                       <ShieldCheck size={24} />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold">Security Status</h4>
                       <p className="text-sm text-slate-400">All systems protected</p>
                    </div>
                 </div>
                 <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold rounded-full">
                    Protected
                 </div>
              </div>
              
              <div className="space-y-4">
                 {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <p className="text-sm font-medium text-slate-300">Encryption Layer {i + 1}</p>
                       </div>
                       <p className="text-xs text-sky-400 font-bold uppercase tracking-widest">Active</p>
                    </div>
                 ))}
                 
                 <div className="mt-6 p-4 rounded-xl bg-[#4988C4]/10 border border-[#4988C4]/20 text-center">
                    <p className="text-xs text-indigo-300">Your privacy is secured by NextWealth algorithms.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 w-full order-1 lg:order-2 space-y-8">
           <header className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-indigo-300 border border-[#4988C4]/20 text-xs font-semibold rounded-full">
                 Enterprise Security
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Safeguarding every transaction</h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">
                 We take your privacy incredibly seriously. Our platform is built on enterprise-grade infrastructure to ensure your data never falls into the wrong hands.
              </p>
           </header>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {protocols.map((p, i) => (
                <div key={i} className="security-feature space-y-3">
                   <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#4988C4]">
                      {React.cloneElement(p.icon, { size: 20 })}
                   </div>
                   <h5 className="text-base font-semibold text-white">{p.name}</h5>
                   <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
           </div>

           <div className="pt-8 text-center lg:text-left">
              <Link href="/auth/login" className="inline-flex items-center gap-3 text-[#4988C4] font-semibold hover:text-indigo-300 transition-colors group">
                 Read our security whitepaper <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityCore;
