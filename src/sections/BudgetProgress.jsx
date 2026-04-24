"use client";
import React, { useLayoutEffect, useRef } from "react";
import { TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * BudgetProgress - Displays dynamic spending bars with GSAP animations
 */
const BudgetProgress = ({ budgets }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal section content
      gsap.fromTo(".budget-header", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          }
        }
      );

      // 2. Staggered card entrance
      gsap.fromTo(".budget-card", 
        { scale: 0.9, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".budget-grid",
            start: "top 85%",
            once: true,
          }
        }
      );

      // 3. Animate progress bars
      gsap.utils.toArray(".progress-bar-fill").forEach((bar) => {
        const targetWidth = bar.getAttribute("data-width");
        gsap.to(bar, {
          width: targetWidth,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 95%",
            once: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-6 bg-[#F8F9FC] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="budget-header flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#666A86] tracking-tight">
              Budget Analytics
            </h2>
            <p className="text-gray-500 mt-2 text-xl font-medium">Keep an eye on your spending limits</p>
          </div>
          
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
             <div className="w-10 h-10 bg-[#BDE8F5] rounded-full flex items-center justify-center text-[#1C4D8D]">
                <TrendingUp size={20} />
             </div>
             <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Monthly Budget</p>
                <p className="text-xl font-bold text-gray-800">₹15,000</p>
             </div>
          </div>
        </div>

        <div className="budget-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {budgets.map((budget) => {
            const percent = Math.min((budget.spent / budget.limit) * 100, 100);
            const isCritical = percent > 85;

            return (
              <div 
                key={budget.id}
                className="budget-card bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-gray-50 relative overflow-hidden group"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 rounded-full opacity-10 group-hover:scale-110 transition-transform ${budget.color}`}></div>

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#666A86]">{budget.name}</h3>
                  <div className={`p-2 rounded-lg ${isCritical ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
                    {isCritical ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                  </div>
                </div>

                <div className="flex justify-between items-end mb-4">
                  <p className="text-3xl font-extrabold text-gray-800">
                    ₹{budget.spent.toLocaleString('en-IN')}
                    <span className="text-sm text-gray-400 font-normal ml-2">/ ₹{budget.limit.toLocaleString('en-IN')}</span>
                  </p>
                  <p className={`text-lg font-bold ${isCritical ? 'text-red-500' : 'text-gray-500'}`}>
                    {percent.toFixed(0)}%
                  </p>
                </div>

                {/* Progress Bar Container */}
                <div className="bg-gray-100 h-4 rounded-full overflow-hidden shadow-inner p-1">
                  <div 
                    className={`progress-bar-fill h-full rounded-full shadow-sm ${budget.color} relative`}
                    data-width={`${percent}%`}
                    style={{ width: "0%" }} // Initial state
                  >
                    {/* Glowing effect for the end of the bar */}
                    <div className="absolute right-0 top-0 h-full w-4 bg-white/30 blur-sm"></div>
                  </div>
                </div>

                <p className="mt-6 text-sm text-gray-400 font-medium">
                  {isCritical ? "Warning: Approaching budget limit!" : "Safe: You're doing great!"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BudgetProgress;