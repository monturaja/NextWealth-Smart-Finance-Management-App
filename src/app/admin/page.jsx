"use client";
import React from "react";
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  History,
  Terminal,
  Cpu,
  Zap,
  Globe
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

// Mock data for admin overview
const data = [
  { name: '00:00', users: 400, transactions: 2400 },
  { name: '04:00', users: 600, transactions: 1398 },
  { name: '08:00', users: 900, transactions: 9800 },
  { name: '12:00', users: 1500, transactions: 3908 },
  { name: '16:00', users: 2100, transactions: 4800 },
  { name: '20:00', users: 3000, transactions: 3800 },
];

const StatNode = ({ title, value, change, icon, color }) => (
  <div className="bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 hover:border-red-500/30 transition-all duration-700 group relative overflow-hidden shadow-2xl">
    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity rotate-12">
       {React.cloneElement(icon, { size: 100 })}
    </div>
    <div className="flex justify-between items-center mb-6 md:mb-8 relative z-10">
      <div className={`p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:text-red-500 transition-colors`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1.5 font-black text-[9px] md:text-[10px] tracking-widest px-3 md:px-4 py-1.5 rounded-full uppercase ${change.startsWith('+') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
        {change}
      </div>
    </div>
    <h3 className="text-slate-500 font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-2 relative z-10">{title}</h3>
    <p className="text-3xl md:text-4xl font-black text-white tracking-tighter relative z-10">{value}</p>
  </div>
);

export default function AdminOverview() {
  const stats = [
    { title: "Identity Nodes", value: "1,284", change: "+12%", icon: <Users size={20} /> },
    { title: "System Liquidity", value: "₹45L", change: "+14%", icon: <TrendingUp size={20} /> },
    { title: "Network Integrity", value: "99%", change: "SECURE", icon: <ShieldCheck size={20} /> },
    { title: "Neural Velocity", value: "4ms", change: "OPTIMAL", icon: <Cpu size={20} /> },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      {/* System Status Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Live Operational Data</span>
           </div>
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter italic leading-none">
              Control <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent underline decoration-red-500/30">Overview</span>
           </h1>
           <p className="text-slate-400 font-medium text-base md:text-lg max-w-xl">Central orchestration hub for global system telemetry and security management.</p>
        </div>

        <div className="flex items-center gap-4">
           <button className="group relative px-10 py-5 overflow-hidden rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative z-10 group-hover:text-white transition-colors">Launch System Audit</span>
           </button>
           <button className="p-5 bg-white/5 text-slate-500 rounded-2xl border border-white/10 hover:text-white hover:border-red-500/50 transition-all">
              <Terminal size={22} />
           </button>
        </div>
      </div>

      {/* Stats Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <StatNode key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Main Telemetry Chart */}
        <div className="xl:col-span-8 bg-white/[0.02] backdrop-blur-2xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none scale-150 rotate-12 hidden md:block">
              <Activity size={300} />
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-10 md:mb-16 relative z-10 gap-6">
              <div>
                 <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-2">Neural Flow Velocity</h3>
                 <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic">Real-time polymorphic throughput analysis</p>
              </div>
              <div className="flex items-center gap-8">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Packets</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Triggers</span>
                 </div>
              </div>
           </div>

           <div className="h-[450px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                    <defs>
                       <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: '#475569', fontWeight: 900, fontSize: 10}} 
                       dy={20}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: '#475569', fontWeight: 900, fontSize: 10}} 
                    />
                    <Tooltip 
                       contentStyle={{ 
                          backgroundColor: 'rgba(5, 5, 10, 0.95)',
                          borderRadius: '24px', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          boxShadow: '0 40px 100px rgba(0,0,0,0.8)', 
                          padding: '25px',
                          backdropFilter: 'blur(20px)'
                       }} 
                       itemStyle={{ color: '#EF4444', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase' }}
                       labelStyle={{ color: '#64748b', marginBottom: '10px', fontSize: '10px', fontWeight: 900, letterSpacing: '2px' }}
                       cursor={{ stroke: 'rgba(239,68,68,0.2)', strokeWidth: 2 }}
                    />
                    <Area 
                       type="monotone" 
                       dataKey="users" 
                       stroke="#EF4444" 
                       strokeWidth={4} 
                       fillOpacity={1} 
                       fill="url(#colorMain)" 
                       animationDuration={2500}
                    />
                    <Area 
                       type="monotone" 
                       dataKey="transactions" 
                       stroke="#3B82F6" 
                       strokeWidth={2} 
                       strokeDasharray="5 5"
                       fill="transparent"
                       animationDuration={3000}
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* System Monitor Side Panel */}
        <div className="xl:col-span-4 space-y-10">
           <div className="bg-white/[0.02] backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[80px] rounded-full"></div>
              <div className="flex items-center justify-between mb-12 relative z-10">
                 <h3 className="text-xl font-black text-white tracking-widest uppercase">Load Matrix</h3>
                 <Zap size={22} className="text-red-500" />
              </div>
              
              <div className="space-y-8 relative z-10">
                 {[
                   { label: "Neural Memory", value: "48%", color: "bg-blue-600", shadow: "shadow-[0_0_15px_rgba(59,130,246,0.6)]" },
                   { label: "Core Intensity", value: "32%", color: "bg-red-600", shadow: "shadow-[0_0_15px_rgba(239,68,68,0.6)]" },
                   { label: "Storage Delta", value: "12%", color: "bg-indigo-600", shadow: "shadow-[0_0_15px_rgba(79,70,229,0.6)]" },
                 ].map((bar) => (
                   <div key={bar.label} className="space-y-3">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                         <span className="text-slate-500">{bar.label}</span>
                         <span className="text-white">{bar.value}</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                         <div className={`h-full ${bar.color} ${bar.shadow} transition-all duration-1000`} style={{ width: bar.value }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-blue-600/5 to-red-600/5 p-10 rounded-[3.5rem] border border-white/5 relative overflow-hidden group cursor-pointer shadow-2xl">
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl -z-10"></div>
              <div className="flex items-center gap-5 mb-8">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-red-600/20 transition-colors">
                    <Globe size={24} className="text-red-500" />
                 </div>
                 <h4 className="text-lg font-black text-white uppercase tracking-widest">Global Synapse</h4>
              </div>
              <p className="text-sm text-slate-500 font-bold leading-relaxed mb-10 uppercase tracking-tight opacity-70">Active system nodes are currently harmonized across 12 strategic geographic zones.</p>
              <div className="w-full h-32 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center italic text-[10px] text-slate-700 font-black uppercase tracking-[0.5em] group-hover:text-red-500 transition-colors">Spatial Map Offline</div>
           </div>
        </div>
      </div>

      {/* Terminal Output Logs */}
      <div className="bg-black/40 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 border border-white/5 font-mono relative group shadow-3xl overflow-x-auto">
         <div className="absolute top-8 right-12 flex gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/10 border border-red-500/20 group-hover:bg-red-500 transition-colors duration-700"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500 transition-colors duration-1000"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-white transition-colors duration-1300"></div>
         </div>
         
         <div className="flex items-center gap-5 mb-12">
            <div className="p-3 bg-red-600/10 rounded-xl">
               <Terminal size={22} className="text-red-500" />
            </div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em]">Forensic Identity Ledger</h3>
         </div>

         <div className="space-y-6">
            {[
              { time: "15:42:01", event: "Admin session initialized", status: "VERIFIED", color: "text-blue-400" },
              { time: "15:41:45", event: "User login event: vaishnavmontu3@gmail.com", status: "AUTH_SUCCESS", color: "text-green-400" },
              { time: "15:40:12", event: "Database sync completed across 3 nodes", status: "SYNCED", color: "text-indigo-400" },
              { time: "15:38:05", event: "Firewall rule updated: BLOCK_MALICIOUS_IP", status: "SECURED", color: "text-red-400" },
            ].map((log, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 text-[11px] leading-relaxed group/log">
                 <span className="text-slate-800 font-black italic tracking-widest">{log.time}</span>
                 <span className="text-slate-500 font-bold group-hover/log:text-white transition-colors uppercase tracking-widest">{log.event}</span>
                 <span className={`md:ml-auto font-black border px-4 py-1 rounded-full uppercase tracking-widest text-[9px] ${log.color} border-white/5 bg-white/5 shadow-inner`}>
                    {log.status}
                 </span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

