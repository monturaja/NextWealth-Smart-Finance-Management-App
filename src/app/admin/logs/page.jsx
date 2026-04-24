"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal, 
  Search, 
  Trash2, 
  Download, 
  Activity, 
  Cpu, 
  Database,
  Zap,
  Play,
  Square
} from "lucide-react";

export default function SystemLogsPage() {
  const [logs, setLogs] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);

  // Fetch real logs from DB
  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      if (res.ok) {
        setLogs(prev => {
          // Only update if there are new logs to prevent unnecessary re-renders
          if (JSON.stringify(prev) !== JSON.stringify(data)) {
            return data;
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Fetch logs error:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // Poll for new logs every 5 seconds
    const interval = setInterval(() => {
      if (!isPaused) {
        fetchLogs();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (scrollRef.current && !isPaused) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isPaused]);

  const filteredLogs = logs.filter(l => 
    l.msg.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      {/* Console Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Terminal size={18} className="text-red-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Live System Telemetry</span>
           </div>
           <h1 className="text-6xl font-black text-white tracking-tighter italic leading-none">
              System <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent underline decoration-red-500/30">Logs std</span>
           </h1>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-xl shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Feed Live</span>
           </div>
           <button 
             onClick={() => setIsPaused(!isPaused)}
             className={`flex items-center gap-3 px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all duration-500 shadow-2xl active:scale-95 ${
               isPaused ? "bg-red-600 text-white" : "bg-white/5 text-slate-500 border border-white/10 hover:text-white"
             }`}
           >
             {isPaused ? <Play size={14} fill="currentColor" /> : <Square size={14} fill="currentColor" />}
             {isPaused ? "Resume Feed" : "Pause Stream"}
           </button>
        </div>
      </div>

      {/* Hardware Status Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {[
           { label: "Mainframe", val: "ACTIVE", icon: <Cpu />, color: "text-red-500" },
           { label: "Data Nodes", val: "SYNCED", icon: <Database />, color: "text-blue-500" },
           { label: "Network", val: "08ms", icon: <Zap />, color: "text-indigo-400" },
           { label: "Latency", val: "OPTIMAL", icon: <Activity />, color: "text-green-400" },
         ].map((stat, i) => (
           <div key={i} className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between shadow-inner group transition-all hover:bg-white/[0.05]">
              <div>
                 <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                 <p className={`text-sm font-black tracking-widest ${stat.color} uppercase`}>{stat.val}</p>
              </div>
              <div className="text-slate-800 transition-colors group-hover:text-red-500/50">{stat.icon}</div>
           </div>
         ))}
      </div>

      {/* Terminal View */}
      <div className="bg-black/60 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden flex flex-col h-[700px] shadow-3xl relative">
         <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-blue-600/5 pointer-events-none"></div>
         
         {/* Console Toolbar */}
         <div className="bg-white/[0.01] px-12 py-8 border-b border-white/5 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-10">
               <div className="flex gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-600/20 border border-red-600/30 group-hover:bg-red-600 transition-colors"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-600/20 border border-yellow-600/30"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-600/20 border border-green-600/30"></div>
               </div>
               <div className="h-8 w-px bg-white/5"></div>
               <div className="relative group">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-500 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Filter neural stream..." 
                    className="bg-transparent border-none text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 pl-10 focus:outline-none placeholder:text-slate-800 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
            </div>
            
            <div className="flex items-center gap-6">
               <button className="p-4 bg-white/5 text-slate-700 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5"><Download size={20} /></button>
               <button className="p-4 bg-white/5 text-slate-700 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-white/5"><Trash2 size={20} /></button>
            </div>
         </div>

         {/* Log Stream Area */}
         <div 
           ref={scrollRef}
           className="flex-1 overflow-y-auto p-12 font-mono scroll-smooth custom-admin-scrollbar relative z-10"
         >
            <div className="space-y-5">
               {filteredLogs.map((log) => (
                 <div key={log._id} className="flex gap-10 group hover:bg-white/[0.02] -mx-6 px-6 py-2 rounded-xl transition-all duration-300">
                    <span className="text-slate-800 text-[11px] font-black min-w-[90px] uppercase tracking-tighter">
                       {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <span className={`text-[10px] font-black min-w-[80px] border px-3 py-1 rounded-lg uppercase tracking-widest leading-none flex items-center justify-center ${
                      log.type === 'ERROR' ? 'text-red-500 border-red-500/20 bg-red-500/5' : 
                      log.type === 'WARN' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' :
                      log.type === 'SUCCESS' ? 'text-green-500 border-green-500/20 bg-green-500/5' :
                      log.type === 'DB' ? 'text-blue-500 border-blue-500/20 bg-blue-500/5' : 'text-indigo-400 border-indigo-400/20 bg-indigo-400/5'
                    }`}>[{log.type}]</span>
                    <span className="text-[12px] text-slate-500 leading-relaxed font-bold group-hover:text-white transition-colors">{log.msg}</span>
                 </div>
               ))}
               {!isPaused && (
                 <div className="flex items-center gap-3 mt-10 text-red-500 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]"></div>
                    <span className="text-[11px] font-black uppercase tracking-[0.6em]">Awaiting neural protocol entry...</span>
                 </div>
               )}
            </div>
         </div>
         
         {/* Console Footer */}
         <div className="bg-white/[0.01] px-12 py-6 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.5em] text-slate-700 relative z-10 flex justify-between items-center">
            <span>NextWealth Admin OS / Kernel: Polyv2 / DB: Active [Sync-Mode]</span>
            <span className="text-slate-900">Process ID: {Math.floor(Math.random() * 9999 + 1000)}</span>
         </div>
      </div>
    </div>
  );

}
