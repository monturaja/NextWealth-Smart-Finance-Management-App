"use client";
import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Shield, 
  Camera, 
  Save, 
  AlertCircle, 
  CheckCircle2,
  Database,
  Cpu,
  Lock,
  Phone,
  MapPin,
  Globe,
  Zap,
  Activity,
  Key,
  Smartphone,
  Eye,
  EyeOff
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function AdminProfile() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
    bio: "",
    phone: "",
    location: "",
    role: "admin"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (res.ok) {
        setProfile({
          ...data,
          bio: data.bio || "",
          phone: data.phone || "",
          location: data.location || ""
        });
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        setMessage({ type: "SUCCESS", text: "Identity protocol synchronized successfully." });
        await update({
          ...session,
          user: {
            ...session.user,
            name: updated.name,
            email: updated.email
          }
        });
      } else {
        const error = await res.json();
        setMessage({ type: "ERROR", text: error.error || "Update protocol failed." });
      }
    } catch (error) {
      setMessage({ type: "ERROR", text: "Critical system error during node update." });
    } finally {
      setSaving(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-8">
        <div className="relative">
           <div className="w-24 h-24 border-[8px] border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
           <div className="absolute inset-0 w-24 h-24 border-[8px] border-red-600/10 border-b-red-600 rounded-full animate-spin [animation-duration:1.5s]"></div>
        </div>
        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.8em] animate-pulse">Syncing Neural Identity...</span>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-32">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
         <div className="space-y-5">
            <div className="flex items-center gap-4">
               <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-pulse"></div>
               <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em]">Identity Control Center</span>
            </div>
            <h1 className="text-7xl font-black text-white tracking-tighter italic leading-none">
               Admin <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent underline decoration-red-500/20">Identity</span>
            </h1>
            <p className="text-slate-400 font-medium text-xl max-w-2xl leading-relaxed">Customize your administrative presence across the NextWealth neural network.</p>
         </div>

         <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Last Auth</span>
               <span className="text-xs font-black text-white mt-1 uppercase">Today @ 14:32</span>
            </div>
            <div className="h-12 w-px bg-white/10"></div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Trust Level</span>
               <span className="text-xs font-black text-green-400 mt-1 uppercase tracking-widest">99% Secure</span>
            </div>
         </div>
      </div>

      {message.text && (
        <div className={`p-10 rounded-[3rem] border backdrop-blur-3xl flex items-center gap-8 animate-in zoom-in-95 duration-500 shadow-[0_40px_80px_rgba(0,0,0,0.5)] ${
          message.type === 'SUCCESS' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
           <div className={`p-4 rounded-2xl ${message.type === 'SUCCESS' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {message.type === 'SUCCESS' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
           </div>
           <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] mb-1">{message.type} Report</p>
              <p className="text-sm font-bold opacity-80 uppercase tracking-widest">{message.text}</p>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left: Summary Column */}
        <div className="xl:col-span-4 space-y-12">
           <div className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-600/10 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                 <div className="relative group/avatar mb-12">
                    <div className="absolute -inset-3 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 rounded-[3.5rem] blur-xl opacity-20 group-hover/avatar:opacity-60 transition duration-1000"></div>
                    <div className="relative w-52 h-52 rounded-[3.2rem] bg-black border border-white/10 flex items-center justify-center text-white text-8xl font-black shadow-3xl overflow-hidden group-hover/avatar:scale-[1.02] transition-transform">
                       {profile.image ? (
                         <img src={profile.image} alt="Avatar" className="w-full h-full object-cover" />
                       ) : (
                         <User size={80} strokeWidth={3} className="text-slate-800" />
                       )}
                       <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 cursor-pointer">
                          <Camera className="text-white" size={40} />
                          <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Update Node</span>
                       </div>
                    </div>
                 </div>

                 <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-3 leading-none">{profile.name}</h2>
                 <p className="text-slate-500 font-bold text-sm tracking-widest uppercase mb-10">{profile.email}</p>
                 
                 <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-red-600/10 border border-red-500/20 rounded-full text-[11px] font-black text-red-500 uppercase tracking-[0.3em] mb-12 shadow-inner">
                    <Shield size={14} />
                    Super Administrator
                 </div>

                 <div className="w-full space-y-5">
                    {[
                       { label: "Core Sync", val: "ACTIVE", color: "text-green-400", icon: <Zap size={16} /> },
                       { label: "Clearance", val: "LEVEL 4", color: "text-white", icon: <Lock size={16} /> },
                       { label: "Security", val: "ELITE", color: "text-blue-400", icon: <Shield size={16} /> },
                    ].map((item, idx) => (
                       <div key={idx} className="bg-white/5 p-7 rounded-[2.5rem] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-white/10 transition-all hover:bg-white/[0.08] shadow-inner">
                          <div className="flex items-center gap-5">
                             <div className="p-3 bg-white/5 rounded-xl text-slate-500 group-hover:text-red-500 transition-colors">
                                {item.icon}
                             </div>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                          </div>
                          <span className={`text-[11px] font-black ${item.color} uppercase tracking-widest`}>{item.val}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Performance metrics mocked for design */}
           <div className="bg-black/40 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-xl font-black text-white uppercase tracking-widest">Neural Impact</h3>
                 <Activity size={22} className="text-red-500" />
              </div>
              <div className="space-y-8">
                 {[
                    { label: "System Uptime", val: "99.98%", w: "99%" },
                    { label: "Decision Velocity", val: "0.4ms", w: "85%" },
                    { label: "Sync Consistency", val: "100%", w: "100%" },
                 ].map((stat, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-600">{stat.label}</span>
                          <span className="text-white">{stat.val}</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-gradient-to-r from-blue-600 to-red-600 transition-all duration-1000" style={{ width: stat.w }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Comprehensive Form */}
        <div className="xl:col-span-8">
           <form onSubmit={handleUpdate} className="space-y-12">
              {/* Identity Section */}
              <div className="bg-white/[0.02] backdrop-blur-3xl p-12 md:p-16 rounded-[4.5rem] border border-white/5 shadow-3xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 opacity-50"></div>
                 
                 <div className="flex items-center gap-6 mb-16">
                    <div className="p-5 bg-blue-600/10 rounded-[2rem] text-blue-500 border border-blue-500/20">
                       <User size={32} />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Core Identity</h3>
                       <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mt-1">Foundational Node Parameters</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div className="space-y-4 group">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-4 italic">Full Name</label>
                       <div className="relative">
                          <User className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-red-500 transition-colors" size={22} />
                          <input 
                             type="text"
                             value={profile.name || ""}
                             onChange={(e) => setProfile({...profile, name: e.target.value})}
                             className="w-full bg-black/60 border border-white/5 rounded-[2.5rem] py-8 pl-20 pr-8 text-sm font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-red-500/40 transition-all shadow-inner"
                             placeholder="ADMIN_ROOT_01"
                             required
                          />
                       </div>
                    </div>

                    <div className="space-y-4 group">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-4 italic">Endpoint Email</label>
                       <div className="relative">
                          <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-blue-500 transition-colors" size={22} />
                          <input 
                             type="email"
                             value={profile.email || ""}
                             onChange={(e) => setProfile({...profile, email: e.target.value})}
                             className="w-full bg-black/60 border border-white/5 rounded-[2.5rem] py-8 pl-20 pr-8 text-sm font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-blue-500/40 transition-all shadow-inner"
                             placeholder="node@nextwealth.com"
                             required
                          />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4 group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-4 italic">Personal Transmission (Bio)</label>
                    <textarea 
                       value={profile.bio || ""}
                       onChange={(e) => setProfile({...profile, bio: e.target.value})}
                       rows={4}
                       className="w-full bg-black/60 border border-white/5 rounded-[3rem] p-10 text-sm font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-purple-500/40 transition-all shadow-inner resize-none leading-relaxed"
                       placeholder="Enter your administrative mission statement or polymorphic data description..."
                    />
                 </div>
              </div>

              {/* Advanced Connectivity Section */}
              <div className="bg-white/[0.02] backdrop-blur-3xl p-12 md:p-16 rounded-[4.5rem] border border-white/5 shadow-3xl relative overflow-hidden">
                 <div className="flex items-center gap-6 mb-16">
                    <div className="p-5 bg-red-600/10 rounded-[2rem] text-red-500 border border-red-500/20">
                       <Globe size={32} />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Neural Connectivity</h3>
                       <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mt-1">Advanced Node Metadata</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div className="space-y-4 group">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-4 italic">Phone Link</label>
                       <div className="relative">
                          <Phone className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-green-500 transition-colors" size={22} />
                          <input 
                             type="text"
                             value={profile.phone || ""}
                             onChange={(e) => setProfile({...profile, phone: e.target.value})}
                             className="w-full bg-black/60 border border-white/5 rounded-[2.5rem] py-8 pl-20 pr-8 text-sm font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-green-500/40 transition-all shadow-inner"
                             placeholder="+91 XXXXX XXXXX"
                          />
                       </div>
                    </div>

                    <div className="space-y-4 group">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-4 italic">Physical Node (Location)</label>
                       <div className="relative">
                          <MapPin className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-amber-500 transition-colors" size={22} />
                          <input 
                             type="text"
                             value={profile.location || ""}
                             onChange={(e) => setProfile({...profile, location: e.target.value})}
                             className="w-full bg-black/60 border border-white/5 rounded-[2.5rem] py-8 pl-20 pr-8 text-sm font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-amber-500/40 transition-all shadow-inner"
                             placeholder="Global HQ Node 01"
                          />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4 group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] ml-4 italic">Avatar Visual Node URL</label>
                    <div className="relative">
                       <Camera className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-purple-500 transition-colors" size={22} />
                       <input 
                          type="text"
                          value={profile.image || ""}
                          onChange={(e) => setProfile({...profile, image: e.target.value})}
                          className="w-full bg-black/60 border border-white/5 rounded-[2.5rem] py-8 pl-20 pr-8 text-sm font-black text-white placeholder:text-slate-800 focus:outline-none focus:border-purple-500/40 transition-all shadow-inner"
                          placeholder="https://images.unsplash.com/..."
                       />
                    </div>
                 </div>
              </div>

              {/* Action Hub */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white/[0.03] p-12 rounded-[4rem] border border-white/5">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-600/30 border-t-blue-600 animate-spin"></div>
                    <div>
                       <p className="text-sm font-black text-white uppercase tracking-widest leading-none mb-2">Protocol Ready</p>
                       <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Ensure all delta updates are correct.</p>
                    </div>
                 </div>

                 <button 
                    type="submit"
                    disabled={saving}
                    className="group relative px-20 py-8 overflow-hidden rounded-[2.5rem] bg-white text-black font-black text-[13px] uppercase tracking-[0.5em] transition-all hover:scale-105 active:scale-95 shadow-3xl disabled:opacity-50"
                 >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 opacity-0 group-hover:opacity-100 transition-all duration-700"></span>
                    <span className="relative z-10 flex items-center gap-5 group-hover:text-white transition-colors">
                       {saving ? (
                         <div className="w-6 h-6 border-4 border-black group-hover:border-white border-t-transparent rounded-full animate-spin"></div>
                       ) : (
                         <Save size={24} />
                       )}
                       {saving ? "SYNCHRONIZING..." : "UPDATE IDENTITY"}
                    </span>
                 </button>
              </div>
           </form>

           {/* Security Panel */}
           <div className="mt-12 bg-red-600/5 p-12 md:p-16 rounded-[4.5rem] border border-red-500/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12">
                 <Shield size={250} />
              </div>
              <div className="relative z-10">
                 <div className="flex items-center gap-6 mb-12">
                    <div className="p-5 bg-red-600/10 rounded-[2rem] text-red-500 border border-red-500/20">
                       <Key size={32} />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Security Protocol</h3>
                       <p className="text-[10px] font-black text-red-500/50 uppercase tracking-[0.5em] mt-2">Critical Infrastructure Settings</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-black/20 p-8 rounded-[2.5rem] border border-white/5 hover:border-red-500/30 transition-all cursor-pointer group/sec">
                       <div className="flex justify-between items-center mb-6">
                          <Smartphone size={24} className="text-slate-700 group-hover/sec:text-red-500" />
                          <span className="text-[9px] font-black bg-green-500/10 text-green-400 px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                       </div>
                       <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Two-Factor Authentication</h4>
                       <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">Identity verified via biometric node link.</p>
                    </div>

                    <div className="bg-black/20 p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group/sec">
                       <div className="flex justify-between items-center mb-6">
                          <Lock size={24} className="text-slate-700 group-hover/sec:text-blue-500" />
                          <span className="text-[9px] font-black bg-slate-800 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">Update Req</span>
                       </div>
                       <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Password Matrix</h4>
                       <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">Last rotated 42 days ago. Update recommended.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
