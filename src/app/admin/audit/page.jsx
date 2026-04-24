"use client";
import React, { useState, useEffect } from "react";
import { 
  History, 
  Search, 
  Filter, 
  Shield, 
  User, 
  Clock, 
  ArrowRight, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Loader2
} from "lucide-react";

export default function GlobalAuditPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAudits = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/audit");
      const data = await res.json();
      if (res.ok) {
        setAudits(data);
      }
    } catch (error) {
      console.error("Fetch audits error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const filteredEvents = Array.isArray(audits) ? audits.filter(e => 
    e.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.resource?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      {/* Detail Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-3 px-5 py-2 bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
              <Shield size={14} />
              Forensic Neural Trace
           </div>
           <h1 className="text-6xl font-black text-white tracking-tighter italic leading-none">
              Global <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent underline decoration-red-500/30">Audit trace</span>
           </h1>
           <p className="text-slate-400 font-medium text-lg max-w-2xl">Historical record of all high-level system interactions and polymorphic security events.</p>
        </div>

        <button 
          onClick={fetchAudits}
          className="group relative px-10 py-5 overflow-hidden rounded-[1.5rem] bg-white text-black font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl"
        >
           <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
              <History size={18} className="group-hover:rotate-12 transition-transform" />
              Refresh Neural Trace
           </span>
        </button>
      </div>

      {/* Forensic Search Control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
         <div className="lg:col-span-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition duration-700"></div>
            <div className="relative">
               <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-500 transition-colors" size={20} />
               <input 
                  type="text" 
                  placeholder="Search by identity, action hash, or target node..." 
                  className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] py-6 pl-20 pr-10 text-sm font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-red-500/30 transition-all shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
         <div className="lg:col-span-4 h-full">
            <div className="h-full bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] px-10 flex items-center justify-between shadow-inner">
               <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 mb-1">Trace Points</span>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none">Synced</span>
               </div>
               <span className="text-4xl font-black text-white tracking-tighter">{filteredEvents.length}</span>
            </div>
         </div>
      </div>

      {/* The Forensic Table */}
      <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden relative shadow-3xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Temporal Point</th>
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Identity Hub</th>
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Action Protocol</th>
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Status Code</th>
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] text-right">Details</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.02]">
                  {loading ? (
                    <tr>
                       <td colSpan="5" className="px-12 py-32 text-center">
                          <div className="flex flex-col items-center gap-6">
                             <Loader2 size={48} className="text-red-600 animate-spin opacity-50" />
                             <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] animate-pulse">Reconstructing Timeline...</span>
                          </div>
                       </td>
                    </tr>
                  ) : filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <tr key={event._id} className="hover:bg-white/[0.03] transition-all duration-500 group">
                        <td className="px-12 py-10">
                           <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-3 text-white group-hover:text-red-500 transition-colors">
                                 <Clock size={14} className="text-red-500/50" />
                                 <span className="text-xs font-black uppercase tracking-tight">
                                   {new Date(event.timestamp).toLocaleString('en-GB', { hour12: false, day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                 </span>
                              </div>
                              <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] ml-7">System Time</span>
                           </div>
                        </td>
                        <td className="px-12 py-10">
                           <div className="flex flex-col gap-2">
                              <span className="text-sm font-black text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight">{event.userEmail}</span>
                              <div className={`inline-flex items-center w-fit gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
                                 event.role === 'admin' ? 'text-red-500 border-red-500/20 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 
                                 event.role === 'system' ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' : 
                                 'text-slate-500 border-white/5 bg-white/5'
                              }`}>
                                 {event.role}
                              </div>
                           </div>
                        </td>
                        <td className="px-12 py-10">
                           <div className="flex flex-col gap-1.5">
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{event.action}</p>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">
                                 <span className="opacity-30">Target:</span>
                                 <span className="text-slate-500 group-hover:text-white transition-colors">{event.resource}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-12 py-10">
                           <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-xl ${
                              event.status === 'SUCCESS' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                              event.status === 'FAILURE' ? 'bg-red-600/10 text-red-500 border-red-600/20 shadow-[0_0_25px_rgba(239,68,68,0.2)]' :
                              'bg-amber-500/10 text-amber-500 border-amber-500/20'
                           }`}>
                              {event.status === 'SUCCESS' ? <CheckCircle2 size={14} /> : 
                               event.status === 'FAILURE' ? <Lock size={14} /> : 
                               <AlertTriangle size={14} />}
                              {event.status}
                           </div>
                        </td>
                        <td className="px-12 py-10 text-right">
                           <button className="p-4 bg-white/5 text-slate-700 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5 hover:border-red-500/50 group-hover:translate-x-2">
                              <ArrowRight size={20} />
                           </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                       <td colSpan="5" className="px-12 py-32 text-center">
                          <div className="flex flex-col items-center gap-4 opacity-20">
                             <History size={48} className="text-slate-800" />
                             <p className="text-[11px] font-black text-slate-700 uppercase tracking-[0.5em] leading-none">No recorded neural traces found</p>
                          </div>
                       </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
      
      {/* Trace Footer */}
      <div className="flex items-center justify-between text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] font-mono px-12 opacity-50 hover:opacity-100 transition-opacity">
         <span>End of available audit stream</span>
         <span className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            Neural Sync: Active / Level 4 Clearance Superuser
         </span>
      </div>
    </div>
  );

}
