"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { DashboardProvider } from "@/context/DashboardContext";
import gsap from "gsap";
import { Menu, User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <DashboardProvider>
      <div className="flex bg-[#050505] min-h-screen font-sans selection:bg-amber-400 selection:text-black overflow-hidden relative">
        
        {/* Dynamic Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Cinematic Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        {/* Mobile Sidebar Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] md:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Persistent/Responsive Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <main ref={contentRef} className="flex-1 transition-all duration-500 md:ml-72 flex flex-col h-screen overflow-hidden relative z-10">
           
           {/* Mobile Header */}
           <header className="h-20 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0 md:hidden z-50">
              <div className="flex items-center gap-4">
                 <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-3 bg-amber-500 text-black rounded-2xl active:scale-95 transition-transform shadow-lg shadow-amber-500/20"
                 >
                    <Menu size={20} />
                 </button>
                 <span className="text-lg font-black tracking-tighter text-white uppercase italic">NextWealth <span className="text-amber-500">OS</span></span>
              </div>
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-sky-500/20">
                 {session?.user?.name?.[0] || <User size={18} />}
              </div>
           </header>

           {/* Scrollable Body */}
           <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16 custom-admin-scrollbar">
              <div className="max-w-7xl mx-auto pb-32">
                 {children}
              </div>
           </div>
        </main>
      </div>
    </DashboardProvider>
  );
}
