"use client";
import React, { useMemo, useLayoutEffect, useRef } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ReportsAnalytics - Visual data representation with GSAP scroll reveals
 */
const ReportsAnalytics = ({ transactions }) => {
  const sectionRef = useRef(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal header
      gsap.fromTo(".reports-header", 
        { opacity: 0, y: 40 },
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

      // 2. Reveal charts
      gsap.fromTo(".chart-card", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".charts-grid",
            start: "top 85%",
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Data for Income vs Expenses Area Chart
  const chartData = useMemo(() => {
    const last5 = transactions.slice(0, 5).reverse();
    return last5.map(tx => ({
      name: tx.date.split(' ')[0] + ' ' + tx.date.split(' ')[1],
      income: tx.amount > 0 ? tx.amount : 0,
      expense: tx.amount < 0 ? Math.abs(tx.amount) : 0,
    }));
  }, [transactions]);

  // Data for Category breakdown Pie Chart
  const categoryData = useMemo(() => {
    const categories = {};
    transactions.forEach(tx => {
      const cat = tx.category;
      if (tx.amount < 0) {
        categories[cat] = (categories[cat] || 0) + Math.abs(tx.amount);
      }
    });
    return Object.keys(categories).map(name => ({ name, value: categories[name] }));
  }, [transactions]);

  const COLORS = ['#666A86', '#E8DDB5', '#60A5FA', '#F87171', '#34D399'];

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="reports-header text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#666A86] tracking-tight">
            Reports & Analytics
          </h2>
          <p className="text-gray-500 mt-4 text-xl">Deep dive into your financial habits and trends</p>
        </div>

        <div className="charts-grid grid lg:grid-cols-2 gap-10">

          {/* Area Chart - Income vs Expenses */}
          <div className="chart-card bg-[#F8F9FC] p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-[#666A86] mb-8">Income vs Expenses Trend</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34D399" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F87171" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <Area type="monotone" dataKey="income" stroke="#34D399" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expense" stroke="#F87171" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Category Breakdown */}
          <div className="chart-card bg-[#F8F9FC] p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-[#666A86] mb-8">Spending by Category</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReportsAnalytics;