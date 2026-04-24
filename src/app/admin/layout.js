"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, 
  User,
  Settings, 
  LogOut, 
  ShieldAlert, 
  LayoutDashboard,
  Menu,
  X,
  Database,
  History,
  Activity,
  Terminal,
  Cpu
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const pathname = usePathname();
  const { data: session } = useSession();

  // Update clock every second
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Hide sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard size={18} />, path: "/admin" },
    { name: "Admin Profile", icon: <User size={18} />, path: "/admin/profile" },
    { name: "User Management", icon: <Users size={18} />, path: "/admin/users" },
    { name: "System Logs", icon: <Terminal size={18} />, path: "/admin/logs" },
    { name: "Global Audit", icon: <History size={18} />, path: "/admin/audit" },
  ];

  return (
    <div className="min-h-screen bg-[#05050A] flex text-slate-300 overflow-hidden font-sans relative">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Cinematic Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#05050A]/20 to-[#05050A]"></div>

      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden transition-opacity duration-500"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Controlled by State */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/[0.02] backdrop-blur-3xl border-r border-white/5 transform transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
          isSidebarOpen ? "translate-x-0 shadow-[40px_0_80px_rgba(0,0,0,0.8)]" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative p-3 bg-black rounded-2xl">
                    <ShieldAlert size={22} className="text-white" />
                  </div>
               </div>
               <div className="flex flex-col">
                  <span className="text-xl font-black text-white tracking-[0.2em] uppercase leading-none">Admin<span className="text-red-500"> </span>OS</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.5em] mt-1">Command Center</span>
               </div>
            </div>
            {/* Close button for mobile */}
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-500 hover:text-white p-2">
               <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-3">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-8 ml-2 italic">Neural Nodes</p>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-6 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 group ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600/10 to-red-600/10 text-white border border-white/10 shadow-[0_0_30px_rgba(239,68,68,0.05)]" 
                      : "hover:bg-white/[0.05] hover:text-white text-slate-500"
                  }`}
                >
                  <span className={`transition-transform duration-500 group-hover:scale-110 ${isActive ? "text-blue-500" : "text-slate-600 group-hover:text-red-500"}`}>{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8">
            <Link href="/admin/profile" className="block bg-white/[0.03] p-6 rounded-[2.5rem] border border-white/5 mb-8 group cursor-pointer hover:border-red-500/20 transition-all duration-700 hidden md:block overflow-hidden relative">
               <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/10 blur-3xl rounded-full"></div>
               <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-pulse"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Mainframe Link</span>
               </div>
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-red-600 p-0.5 shadow-lg group-hover:rotate-6 transition-transform">
                     <div className="w-full h-full bg-black rounded-[calc(1rem-2px)] flex items-center justify-center font-black text-white text-sm">
                        {session?.user?.name?.[0] || "A"}
                     </div>
                  </div>
                  <div className="overflow-hidden">
                     <p className="text-xs font-black text-white truncate uppercase tracking-tight">{session?.user?.name || "Root Access"}</p>
                     <p className="text-[9px] font-bold text-red-500/70 uppercase tracking-tighter">Clearance Level 4</p>
                  </div>
               </div>
            </Link>
            
            <button 
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-600/10 hover:text-red-500 transition-all duration-500 text-slate-600 border border-transparent hover:border-red-500/20"
            >
              <LogOut size={16} />
              Disconnect
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* Header - Improved with Gradient Line */}
        <header className="h-24 bg-black/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 shrink-0 relative z-30">
           <div className="flex items-center gap-6">
              {/* Hamburger Button */}
              <button 
                 onClick={() => setIsSidebarOpen(true)}
                 className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white md:hidden"
              >
                 <Menu size={20} />
              </button>
              
              <h2 className="text-[11px] font-black text-white tracking-[0.4em] uppercase flex items-center gap-4">
                <Cpu size={16} className="text-red-500" />
                <span className="hidden xs:inline">{menuItems.find(i => i.path === pathname)?.name || "System Core"}</span>
                <span className="text-slate-800 hidden xs:inline">/</span>
                <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">Terminal v4</span>
              </h2>
           </div>

           <div className="flex items-center gap-10">
              {/* Real-time Clock */}
              <div className="hidden xl:flex flex-col items-end">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">System Time</span>
                 <span className="text-[11px] font-black text-white uppercase leading-none mt-1.5 tabular-nums">
                    {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                 </span>
              </div>

              <div className="hidden lg:flex items-center gap-4">
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">Latency</span>
                    <span className="text-[11px] font-black text-green-400 uppercase leading-none mt-1.5">08ms</span>
                 </div>
                 <Activity size={20} className="text-slate-800" />
              </div>
              <div className="h-10 w-px bg-white/5 hidden sm:block"></div>
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500 hover:text-white transition-all hover:rotate-90 duration-700">
                 <Settings size={20} />
              </button>
           </div>
        </header>

        {/* Dynamic Inner Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-admin-scrollbar relative">
           <div className="max-w-[1600px] mx-auto">
              {children}
           </div>
        </div>
      </main>
    </div>
  );

}
