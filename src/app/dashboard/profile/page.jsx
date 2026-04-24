"use client";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
   User,
   Mail,
   Shield,
   Smartphone,
   Camera,
   Unlock,
   Bell,
   ChevronRight,
   Star,
   CreditCard,
   Key,
   Database,
   CheckCircle2,
   Activity,
   Zap,
   Edit3,
   Save,
   X,
   MapPin,
   TextQuote
} from "lucide-react";
import { useSession } from "next-auth/react";
import gsap from "gsap";

export default function ProfilePage() {
   const { data: session, update } = useSession();
   const profileRef = useRef(null);
   
   const [isEditing, setIsEditing] = useState(false);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState({ type: "", text: "" });
   
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      bio: "",
      phone: "",
      location: ""
   });

   // Fetch latest data from API
   useEffect(() => {
      const fetchProfile = async () => {
         try {
            const res = await fetch("/api/user/profile");
            const data = await res.json();
            if (res.ok) {
               setFormData({
                  name: data.name || "",
                  email: data.email || "",
                  bio: data.bio || "",
                  phone: data.phone || "",
                  location: data.location || ""
               });
            }
         } catch (err) {
            console.error("Failed to fetch profile:", err);
         }
      };
      fetchProfile();
   }, []);

   useLayoutEffect(() => {
      let ctx = gsap.context(() => {
         gsap.from(".profile-stagger", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
         });
      }, profileRef);
      return () => ctx.revert();
   }, []);

   const handleUpdate = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage({ type: "", text: "" });

      try {
         const res = await fetch("/api/user/profile", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
         });

         const data = await res.json();

         if (res.ok) {
            setMessage({ type: "success", text: "Identity nodes synchronized successfully." });
            // Update session to reflect changes in UI
            await update({
               ...session,
               user: {
                  ...session.user,
                  name: formData.name
               }
            });
            setTimeout(() => {
               setIsEditing(false);
               setMessage({ type: "", text: "" });
            }, 2000);
         } else {
            setMessage({ type: "error", text: data.error || "Protocol update failed." });
         }
      } catch (err) {
         setMessage({ type: "error", text: "Neural link timeout. Try again." });
      } finally {
         setLoading(false);
      }
   };

   return (
      <div ref={profileRef} className="space-y-16 animate-in fade-in duration-1000 pb-20">
         {/* Header Profile Section */}
         <header className="profile-stagger flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-amber-500/20 shadow-lg shadow-amber-500/5">
                  <Star size={12} fill="currentColor" />
                  Validated Citizen node
               </div>
               <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none italic">
                  Identity <span className="bg-gradient-to-r from-sky-400 to-amber-500 bg-clip-text text-transparent">Matrix</span>
               </h1>
               <p className="text-slate-400 font-medium text-xl max-w-xl">Configure your personal nodes and manage secure gateway access to your wealth.</p>
            </div>

            <div className="flex gap-4">
               {!isEditing ? (
                  <button 
                     onClick={() => setIsEditing(true)}
                     className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
                  >
                     <Edit3 size={18} />
                     Edit Identity
                  </button>
               ) : (
                  <button 
                     onClick={() => setIsEditing(false)}
                     className="flex items-center gap-3 bg-white/5 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all"
                  >
                     <X size={18} />
                     Cancel
                  </button>
               )}
            </div>
         </header>

         {message.text && (
            <div className={`profile-stagger p-6 rounded-[2rem] border animate-in zoom-in duration-500 ${
               message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-center">{message.text}</p>
            </div>
         )}

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Identity & Core Config */}
            <div className="lg:col-span-8 space-y-12">

               {/* Elite Profile Summary */}
               <div className="profile-stagger bg-[#0A0A0A] p-12 rounded-[4rem] border border-white/5 shadow-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-1000 rotate-12 pointer-events-none">
                     <User size={300} />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                     <div className="relative group/avatar">
                        <div className="absolute -inset-3 bg-gradient-to-br from-sky-500 to-amber-500 rounded-[3.5rem] blur-xl opacity-20 group-hover/avatar:opacity-60 transition duration-1000"></div>
                        <div className="relative w-40 h-40 rounded-[3.2rem] bg-black border border-white/10 flex items-center justify-center text-white text-7xl font-black shadow-2xl overflow-hidden group-hover/avatar:scale-[1.02] transition-transform">
                           {formData.name?.[0] || session?.user?.name?.[0] || 'U'}
                        </div>
                        <button className="absolute -bottom-2 -right-2 bg-amber-500 text-black p-4 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all shadow-amber-500/20 z-20">
                           <Camera size={20} />
                        </button>
                     </div>

                     <div className="text-center md:text-left space-y-4">
                        {isEditing ? (
                           <input 
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="text-5xl font-black text-white bg-white/5 border border-white/10 rounded-2xl px-6 py-2 w-full focus:outline-none focus:border-amber-500/50 uppercase italic tracking-tighter"
                           />
                        ) : (
                           <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">{formData.name || session?.user?.name}</h2>
                        )}
                        <div className="flex items-center justify-center md:justify-start gap-4">
                           <div className="flex items-center gap-3 px-5 py-2 bg-sky-500/10 text-sky-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-sky-500/20 shadow-lg shadow-sky-500/5">
                              <CheckCircle2 size={14} />
                              Verified Access Node
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Profile Form / Grid */}
               {isEditing ? (
                  <form onSubmit={handleUpdate} className="profile-stagger space-y-8 animate-in slide-in-from-bottom-10 duration-700">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6 italic">Neural Endpoint (Email)</label>
                           <div className="relative">
                              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                              <input 
                                 type="email"
                                 value={formData.email}
                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                                 className="w-full bg-black/40 border border-white/10 rounded-[2.5rem] py-6 pl-16 pr-8 text-white font-black text-xs uppercase tracking-widest focus:border-sky-500/30 outline-none transition-all shadow-inner"
                              />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6 italic">Mobile Link (Phone)</label>
                           <div className="relative">
                              <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                              <input 
                                 type="text"
                                 value={formData.phone}
                                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                 placeholder="+91 XXXXX XXXXX"
                                 className="w-full bg-black/40 border border-white/10 rounded-[2.5rem] py-6 pl-16 pr-8 text-white font-black text-xs uppercase tracking-widest focus:border-purple-500/30 outline-none transition-all shadow-inner"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6 italic">Current Domicile (Location)</label>
                        <div className="relative">
                           <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                           <input 
                              type="text"
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                              placeholder="e.g. Neo-Mumbai, District 9"
                              className="w-full bg-black/40 border border-white/10 rounded-[2.5rem] py-6 pl-16 pr-8 text-white font-black text-xs uppercase tracking-widest focus:border-amber-500/30 outline-none transition-all shadow-inner"
                           />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6 italic">Neural Bio (Manifesto)</label>
                        <div className="relative">
                           <TextQuote className="absolute left-6 top-8 text-slate-700" size={18} />
                           <textarea 
                              value={formData.bio}
                              onChange={(e) => setFormData({...formData, bio: e.target.value})}
                              placeholder="Describe your financial mission..."
                              className="w-full bg-black/40 border border-white/10 rounded-[2.5rem] py-8 pl-16 pr-8 text-white font-medium text-sm leading-relaxed focus:border-sky-500/30 outline-none transition-all shadow-inner min-h-[150px]"
                           />
                        </div>
                     </div>

                     <button 
                        type="submit"
                        disabled={loading}
                        className="group relative w-full bg-white text-black py-8 rounded-[2.5rem] font-black text-[13px] uppercase tracking-[0.5em] shadow-3xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 overflow-hidden"
                     >
                        <span className="absolute inset-0 bg-gradient-to-r from-sky-600 via-amber-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></span>
                        <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-white transition-colors">
                           {loading ? <div className="w-6 h-6 border-4 border-black group-hover:border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={20} />}
                           {loading ? "SYNCHRONIZING..." : "COMMIT IDENTITY UPDATE"}
                        </span>
                     </button>
                  </form>
               ) : (
                  <div className="profile-stagger grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-white/[0.02] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl hover:border-white/10 transition-all group relative overflow-hidden">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3 italic">
                           <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl border border-white/5">
                              <Mail size={18} />
                           </div>
                           Neural Endpoint
                        </div>
                        <span className="text-xl font-black text-white tracking-tight uppercase">{formData.email || session?.user?.email}</span>
                     </div>

                     <div className="bg-white/[0.02] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl hover:border-white/10 transition-all group relative overflow-hidden">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3 italic">
                           <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl border border-white/5">
                              <Smartphone size={18} />
                           </div>
                           Mobile Link
                        </div>
                        <span className="text-xl font-black text-white tracking-tight uppercase">{formData.phone || "Not Linked"}</span>
                     </div>

                     <div className="bg-white/[0.02] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl hover:border-white/10 transition-all group relative overflow-hidden md:col-span-2">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3 italic">
                           <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-white/5">
                              <MapPin size={18} />
                           </div>
                           Primary Domicile
                        </div>
                        <span className="text-xl font-black text-white tracking-tight uppercase">{formData.location || "Global Citizen"}</span>
                     </div>

                     <div className="bg-white/[0.02] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl hover:border-white/10 transition-all group relative overflow-hidden md:col-span-2">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3 italic">
                           <div className="p-3 bg-sky-500/10 text-sky-500 rounded-xl border border-white/5">
                              <TextQuote size={18} />
                           </div>
                           Neural Bio
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed italic">
                           "{formData.bio || "No manifesto recorded for this identity node yet."}"
                        </p>
                     </div>
                  </div>
               )}
            </div>

            {/* Right: Security Hub & Logs */}
            <div className="lg:col-span-4 space-y-12">
               <div className="profile-stagger bg-gradient-to-b from-[#0A0A0A] to-black p-12 rounded-[4.5rem] text-white relative overflow-hidden shadow-3xl h-full min-h-[600px] border border-white/5 group">
                  <div className="absolute top-0 right-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000 -translate-y-10 translate-x-10 scale-150 rotate-12 pointer-events-none">
                     <CreditCard size={250} />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                     <div className="mb-16">
                        <h3 className="text-3xl font-black tracking-tighter mb-6 flex items-center gap-4 italic uppercase">
                           <Shield size={28} className="text-sky-500" />
                           Security Vault
                        </h3>
                        <p className="text-slate-500 font-bold text-sm leading-relaxed uppercase tracking-tight opacity-70">Your identity nodes are protected by military-grade asymmetric encryption.</p>
                     </div>

                     <div className="space-y-6 mb-auto">
                        {[
                           { name: "Passkey matrix", icon: <Key />, desc: "Rotate credentials", color: "group-hover/btn:text-amber-500" },
                           { name: "Node Termination", icon: <Unlock />, desc: "Disconnect session", color: "group-hover/btn:text-red-500" },
                           { name: "Signal Config", icon: <Bell />, desc: "Notification matrix", color: "group-hover/btn:text-sky-500" },
                        ].map((item, i) => (
                           <button key={i} className="w-full bg-white/[0.03] border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-5 hover:bg-white/[0.08] hover:border-white/10 transition-all group/btn shadow-inner active:scale-95">
                              <div className={`p-4 bg-black/40 rounded-2xl border border-white/5 shadow-xl transition-colors ${item.color}`}>
                                 {React.cloneElement(item.icon, { size: 20 })}
                              </div>
                              <div className="text-left">
                                 <p className="text-xs font-black uppercase tracking-widest mb-1 text-white">{item.name}</p>
                                 <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{item.desc}</p>
                              </div>
                           </button>
                        ))}
                     </div>

                     <div className="mt-16 p-8 bg-sky-500/5 rounded-[2.5rem] border border-sky-500/10 flex items-center gap-5 group-hover:border-sky-500/20 transition-all">
                        <Activity size={24} className="text-sky-500 animate-pulse" />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white leading-none mb-1">Forensic Scan</p>
                           <p className="text-[9px] font-bold text-sky-600 uppercase tracking-widest">Continuous Protection Active</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
