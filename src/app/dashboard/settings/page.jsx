"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
   Bell,
   Lock,
   Globe,
   Moon,
   Sun,
   CreditCard,
   Shield,
   Smartphone,
   ChevronRight,
   CheckCircle2,
   Search,
   Monitor,
   Database,
   ArrowRight
} from "lucide-react";
import gsap from "gsap";

export default function SettingsPage() {
   const [theme, setTheme] = useState("light");
   const [globalSearch, setGlobalSearch] = useState(true);
   const [notifications, setNotifications] = useState(true);
   const settingsRef = useRef(null);

   // Sync theme with system and localStorage
   useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
         setTheme(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
         setTheme('dark');
      }
   }, []);

   const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   };

   useLayoutEffect(() => {
      let ctx = gsap.context(() => {
         gsap.from(".settings-stagger", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
         });
      }, settingsRef);
      return () => ctx.revert();
   }, []);

   const sections = [
      {
         title: "Security & Privacy",
         icon: <Shield size={20} className="text-[#1C4D8D] dark:text-[#4988C4]" />,
         items: [
            { name: "Global Credentials", desc: "Choose a strong password to protect your wealth.", action: "Update" },
            { name: "Identity Shield (2FA)", desc: "Enable 2FA for an extra layer of biometric security.", action: "Configure" }
         ]
      },
      {
         title: "Protocol Notifications",
         icon: <Bell size={20} className="text-amber-500" />,
         items: [
            { name: "Email Alert Matrix", desc: "Get notified of critical transactions and budget limits.", action: "Configure" },
            { name: "Push Overwrite", desc: "Receive real-time updates on your mobile device.", action: "Modify" }
         ]
      },
      {
         title: "Billing & Subscription",
         icon: <CreditCard size={20} className="text-[#4988C4]" />,
         items: [
            { name: "Next Wealth Plan", desc: "Current Status: Premium. Renewal scheduled for May 2026.", action: "Manage" },
            { name: "Payment Gateway", desc: "Active Method: Visa ending in •••• 4242", action: "Modify" }
         ]
      }
   ];

   const ToggleSwitch = ({ active, onToggle, label }) => (
      <div className="flex flex-col gap-4">
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</span>
         <button
            onClick={onToggle}
            className={`w-16 h-9 rounded-full relative transition-all duration-500 ${active ? 'bg-[#1C4D8D]' : 'bg-slate-200 dark:bg-[#0F2854]'}`}
         >
            <div className={`absolute top-1.5 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-500 ${active ? 'left-[34px]' : 'left-1.5'}`}></div>
         </button>
      </div>
   );

   return (
      <div ref={settingsRef} className="space-y-12 animate-in fade-in duration-700 pb-20">
         {/* Header */}
         <header className="settings-stagger">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2.5 bg-[#BDE8F5] dark:bg-indigo-900/30 text-[#1C4D8D] dark:text-[#4988C4] rounded-xl border border-[#BDE8F5] dark:border-indigo-800/50">
                  <Database size={18} />
               </div>
               <span className="text-[10px] font-black text-[#BDE8F5]0 uppercase tracking-[0.4em]">Configuration Node</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[#0F2854] dark:text-white tracking-tighter leading-none italic">
               Settings Control io
            </h1>
            <p className="text-[#BDE8F5]0 dark:text-slate-400 font-medium text-lg mt-4 max-w-2xl">Manage your global application parameters, visual thresholds, and security security protocols.</p>
         </header>

         {/* Main Feature Toggles */}
         <div className="settings-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Theme Toggle Card */}
            <div className={`p-10 rounded-[3rem] flex flex-col justify-between h-72 transition-all duration-700 border shadow-2xl relative overflow-hidden group ${theme === 'dark' ? 'bg-[#0F2854] border-[#0F2854] text-white' : 'bg-[#0F2854] border-slate-700 text-white'
               }`}>
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12">
                  {theme === 'dark' ? <Moon size={200} /> : <Sun size={200} />}
               </div>

               <div className="flex justify-between items-start relative z-10">
                  <div className="p-5 bg-white/10 rounded-[1.5rem] backdrop-blur-md border border-white/10">
                     {theme === 'dark' ? <Moon size={32} className="text-[#4988C4]" /> : <Sun size={32} className="text-amber-400" />}
                  </div>
                  <ToggleSwitch active={theme === 'dark'} onToggle={toggleTheme} label="Theme Engine" />
               </div>
               <div className="relative z-10">
                  <h3 className="text-2xl font-black tracking-tight mb-1">Illumination Mode</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{theme === 'dark' ? "Deep Dark Mode Active" : "Clean Light Mode Active"}</p>
               </div>
            </div>

            {/* Global Search Card */}
            <div className="bg-white dark:bg-[#0F2854] p-10 rounded-[3rem] flex flex-col justify-between h-72 border border-slate-100 dark:border-[#0F2854] shadow-xl transition-all hover:translate-y-[-5px]">
               <div className="flex justify-between items-start">
                  <div className="p-5 bg-[#BDE8F5] dark:bg-indigo-950/50 text-[#1C4D8D] dark:text-[#4988C4] rounded-[1.5rem] border border-[#BDE8F5] dark:border-indigo-800/50">
                     <Globe size={32} />
                  </div>
                  <ToggleSwitch active={globalSearch} onToggle={() => setGlobalSearch(!globalSearch)} label="Intelligence" />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-[#0F2854] dark:text-white tracking-tight mb-1">Global Semantic Search</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Real-time Node Indexing</p>
               </div>
            </div>

            {/* Monitoring Card */}
            <div className="bg-white dark:bg-[#0F2854] p-10 rounded-[3rem] flex flex-col justify-between h-72 border border-slate-100 dark:border-[#0F2854] shadow-xl transition-all hover:translate-y-[-5px]">
               <div className="flex justify-between items-start">
                  <div className="p-5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-[1.5rem] border border-amber-100 dark:border-amber-800/50">
                     <Monitor size={32} />
                  </div>
                  <ToggleSwitch active={notifications} onToggle={() => setNotifications(!notifications)} label="Monitoring" />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-[#0F2854] dark:text-white tracking-tight mb-1">Live Alert System</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Active System Intercepts</p>
               </div>
            </div>
         </div>

         {/* Detail Sections */}
         <div className="settings-stagger grid grid-cols-1 gap-10">
            {sections.map((section, idx) => (
               <div key={idx} className="bg-white dark:bg-[#0F2854] rounded-[3.5rem] p-10 md:p-12 border border-slate-100 dark:border-[#0F2854] shadow-xl hover:shadow-2xl transition-all group">
                  <div className="flex items-center gap-6 mb-12">
                     <div className="w-16 h-16 bg-[#BDE8F5] dark:bg-[#0F2854] border border-slate-100 dark:border-[#0F2854] rounded-[2rem] flex items-center justify-center text-[#1C4D8D] dark:text-[#4988C4] shadow-inner">
                        {section.icon}
                     </div>
                     <h2 className="text-3xl font-black text-[#0F2854] dark:text-white tracking-tight leading-none">{section.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {section.items.map((item, id) => (
                        <div key={id} className="group/item flex flex-col justify-between p-8 bg-[#BDE8F5] dark:bg-[#0F2854]/50 rounded-[2.5rem] border border-transparent hover:border-[#4988C4]/30 transition-all cursor-pointer">
                           <div className="mb-8">
                              <div className="flex justify-between items-start mb-4">
                                 <p className="font-black text-[#0F2854] dark:text-slate-100 text-lg uppercase tracking-tight">{item.name}</p>
                                 <ArrowRight size={20} className="text-slate-300 group-hover/item:text-[#4988C4] transition-colors transform group-hover/item:translate-x-2" />
                              </div>
                              <p className="text-[13px] text-[#BDE8F5]0 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                           </div>
                           <button className="w-fit px-10 py-4 bg-white dark:bg-[#0F2854] border border-slate-200 dark:border-[#0F2854] text-[#0F2854] dark:text-slate-200 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-[#0F2854] dark:hover:bg-[#1C4D8D] hover:text-white transition-all shadow-sm">
                              {item.action}
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>

         {/* Footer Info */}
         <footer className="settings-stagger text-center pt-16 border-t border-slate-100 dark:border-[#0F2854]">
            <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.8em] font-mono">NextWealth Operational Control Node v4 // Clearance Level 4</p>
         </footer>
      </div>
   );
}
