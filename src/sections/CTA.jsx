"use client";
import React, { useLayoutEffect, useRef } from "react";
import { Sparkles, ArrowRight, Zap, Target, Shield, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTA = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      tl.from(".cta-badge", { y: -20, opacity: 0, duration: 0.6 })
        .from(".cta-title", { y: 20, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".cta-desc", { opacity: 0, duration: 1 }, "-=0.5")
        .from(".cta-btns", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
        .from(".cta-feature", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-6 bg-[#1C4D8D] text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4988C4]/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        <div className="cta-badge inline-flex items-center gap-2 bg-[#4988C4]/50 text-white px-4 py-1.5 rounded-full mb-8 font-semibold text-sm backdrop-blur-sm border border-[#4988C4]/30">
          <Sparkles size={16} />
          <span>Start your wealth journey today</span>
        </div>

        <h2 className="cta-title text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          Ready to take control <br className="hidden md:block" />of your finances?
        </h2>
        
        <p className="cta-desc text-[#BDE8F5] text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of users who are saving more, investing smarter, and building the lifestyle they deserve with NextWealth.
        </p>
        
        <div className="cta-btns flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link href="/auth/login" className="bg-white text-[#1C4D8D] px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all">
            Create Free Account
            <ArrowRight size={20} />
          </Link>
          
          <button className="bg-[#1C4D8D]/50 border border-[#4988C4] hover:bg-[#1C4D8D] px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all">
            See Pricing Plans
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto pt-8 border-t border-[#4988C4]/50">
           <div className="cta-feature flex items-center justify-center gap-2 text-[#BDE8F5]">
              <CheckCircle2 size={18} className="text-indigo-300" />
              <span className="text-sm font-medium">Fast Setup</span>
           </div>
           <div className="cta-feature flex items-center justify-center gap-2 text-[#BDE8F5]">
              <CheckCircle2 size={18} className="text-indigo-300" />
              <span className="text-sm font-medium">Set Global Goals</span>
           </div>
           <div className="cta-feature flex items-center justify-center gap-2 text-[#BDE8F5]">
              <CheckCircle2 size={18} className="text-indigo-300" />
              <span className="text-sm font-medium">Secure Data</span>
           </div>
           <div className="cta-feature flex items-center justify-center gap-2 text-[#BDE8F5]">
              <CheckCircle2 size={18} className="text-indigo-300" />
              <span className="text-sm font-medium">Easy Export</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;