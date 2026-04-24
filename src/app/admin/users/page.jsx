"use client";
import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  Shield, 
  Mail, 
  Calendar,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch real users from DB
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Are you sure you want to terminate identity node ${email}?`)) return;
    
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "SUCCESS", text: "Identity terminated successfully." });
        fetchUsers();
      }
    } catch (error) {
      setMessage({ type: "ERROR", text: "Termination failed." });
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Status toggle error:", error);
    }
  };

  const filteredUsers = Array.isArray(users) ? users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Identity Registry</span>
           </div>
           <h1 className="text-6xl font-black text-white tracking-tighter italic leading-none">
              Identity <span className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent underline decoration-red-500/30">Ledger</span>
           </h1>
           <p className="text-slate-400 font-medium text-lg max-w-xl">Manage and monitor all authorized system entities with Level 4 clearance.</p>
        </div>

        <button className="group relative px-10 py-5 overflow-hidden rounded-[1.5rem] bg-white text-black font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl">
           <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
              <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
              Add New Entity
           </span>
        </button>
      </div>

      {message.text && (
        <div className={`p-6 rounded-[1.5rem] border backdrop-blur-xl flex items-center gap-4 animate-in slide-in-from-top duration-700 shadow-2xl ${
          message.type === 'SUCCESS' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
           {message.type === 'SUCCESS' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
           <span className="text-[11px] font-black uppercase tracking-[0.2em]">{message.text}</span>
        </div>
      )}

      {/* Control Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         <div className="lg:col-span-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition duration-700"></div>
            <div className="relative">
               <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-red-500 transition-colors" size={20} />
               <input 
                  type="text" 
                  placeholder="Search by name, email, or identity hash..." 
                  className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] py-6 pl-20 pr-10 text-sm font-black text-white placeholder:text-slate-700 focus:outline-none focus:border-red-500/30 transition-all shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
         <div className="lg:col-span-4">
            <div className="h-full bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] px-10 flex items-center justify-between shadow-inner">
               <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600 mb-1">Global Nodes</span>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Active Sync</span>
               </div>
               <span className="text-4xl font-black text-white tracking-tighter">{filteredUsers.length}</span>
            </div>
         </div>
      </div>

      {/* User Table (Desktop) */}
      <div className="hidden md:block bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden relative shadow-3xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Identity Node</th>
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Security Role</th>
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">System Status</th>
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Join_Date</th>
                     <th className="px-12 py-10 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] text-center">Protocol</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.02]">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-12 py-32 text-center">
                         <div className="flex flex-col items-center gap-6">
                            <div className="w-12 h-12 border-[6px] border-red-600/20 border-t-red-600 rounded-full animate-spin shadow-[0_0_20px_rgba(239,68,68,0.2)]"></div>
                            <span className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] leading-none animate-pulse">Deciphering Ledger...</span>
                         </div>
                      </td>
                    </tr>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-white/[0.03] transition-all duration-500 group">
                         <td className="px-12 py-10">
                            <div className="flex items-center gap-6">
                               <div className="relative group/avatar">
                                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl blur-sm opacity-20 group-hover/avatar:opacity-60 transition duration-700"></div>
                                  <div className="relative w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center font-black text-white text-xl shadow-2xl uppercase tracking-tighter transition-transform group-hover/avatar:scale-105 group-hover/avatar:-rotate-3">
                                     {user.name && user.name[0]}
                                  </div>
                               </div>
                               <div>
                                  <p className="text-lg font-black text-white uppercase tracking-tight leading-none mb-2">{user.name}</p>
                                  <p className="text-[11px] font-bold text-slate-500 flex items-center gap-2 tracking-tighter">
                                     <Mail size={14} className="text-red-500/50" />
                                     {user.email}
                                  </p>
                                </div>
                            </div>
                         </td>
                         <td className="px-12 py-10">
                            <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-xl ${
                               user.role === 'admin' 
                               ? 'bg-red-600/10 text-red-500 border-red-500/20 shadow-[0_0_25px_rgba(239,68,68,0.1)]' 
                               : 'bg-white/5 text-slate-400 border-white/5'
                            }`}>
                               <Shield size={12} className={user.role === 'admin' ? 'text-red-500' : 'text-slate-600'} />
                               {user.role || 'user'}
                            </div>
                         </td>
                         <td className="px-12 py-10">
                            <button 
                             onClick={() => handleStatusToggle(user._id, user.status || 'Active')}
                             className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] group/status"
                            >
                               <div className={`w-2 h-2 rounded-full transition-all duration-500 ${user.status !== 'Inactive' ? 'bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] group-hover/status:scale-150' : 'bg-slate-800'}`}></div>
                               <span className={`transition-colors duration-500 ${user.status !== 'Inactive' ? 'text-green-400' : 'text-slate-700'}`}>{user.status || 'Active'}</span>
                            </button>
                         </td>
                         <td className="px-12 py-10">
                            <div className="flex flex-col gap-1.5">
                               <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest leading-none">
                                  <Calendar size={12} className="text-blue-500" />
                                  {new Date(user.createdAt || user.joined).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                               </div>
                               <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest ml-5">Registry Date</span>
                            </div>
                         </td>
                         <td className="px-12 py-10">
                            <div className="flex items-center justify-center gap-3">
                               <button className="p-4 bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 rounded-2xl transition-all border border-white/5 hover:border-blue-500/30 group/edit">
                                  <Edit2 size={16} className="group-hover/edit:scale-110 transition-transform" />
                                </button>
                               <button 
                                onClick={() => handleDelete(user._id, user.email)}
                                className="p-4 bg-white/5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-white/5 hover:border-red-500/30 group/trash"
                               >
                                  <Trash2 size={16} className="group-hover/trash:scale-110 transition-transform" />
                               </button>
                            </div>
                         </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                       <td colSpan="5" className="px-12 py-32 text-center">
                          <div className="flex flex-col items-center gap-4 opacity-30">
                             <Users size={48} className="text-slate-700" />
                             <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] leading-none">No Matching Entity Nodes</p>
                          </div>
                       </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* User Mobile Cards */}
      <div className="md:hidden space-y-6">
         {loading ? (
            <div className="py-20 text-center flex flex-col items-center gap-4">
               <div className="w-10 h-10 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Loading Nodes...</span>
            </div>
         ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
               <div key={user._id} className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-6 mb-8">
                     <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center font-black text-white text-lg">
                        {user.name && user.name[0]}
                     </div>
                     <div>
                        <p className="text-lg font-black text-white uppercase tracking-tight leading-none mb-2">{user.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 truncate max-w-[200px]">{user.email}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Role</p>
                        <span className={`text-[10px] font-black uppercase ${user.role === 'admin' ? 'text-red-500' : 'text-blue-400'}`}>{user.role || 'user'}</span>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Status</p>
                        <span className={`text-[10px] font-black uppercase ${user.status !== 'Inactive' ? 'text-green-400' : 'text-slate-500'}`}>{user.status || 'Active'}</span>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                     <div className="text-[9px] font-black text-slate-700 uppercase tracking-widest">
                        Node ID: {user._id.slice(-6).toUpperCase()}
                     </div>
                     <div className="flex gap-2">
                        <button className="p-3 bg-white/5 text-slate-500 rounded-xl">
                           <Edit2 size={14} />
                        </button>
                        <button 
                           onClick={() => handleDelete(user._id, user.email)}
                           className="p-3 bg-red-600/10 text-red-500 rounded-xl"
                        >
                           <Trash2 size={14} />
                        </button>
                     </div>
                  </div>
               </div>
            ))
         ) : (
            <div className="py-20 text-center text-slate-600 uppercase text-[10px] font-black tracking-widest">No nodes found</div>
         )}
      </div>
    </div>
  );

}
