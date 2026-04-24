"use client";
import React, { useState, useLayoutEffect, useRef } from "react";
import { Plus, Search, Calendar, Wallet, FileText, CheckCircle2, ArrowRight, ArrowUpRight, ArrowDownRight, X, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RecentTransactions = ({ transactions, onAddTransaction }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [newTx, setNewTx] = useState({ 
    description: "", 
    category: "Food", 
    amount: "", 
    type: "Expense",
    date: new Date().toISOString().split('T')[0],
    paymentMode: "Cash",
    notes: ""
  });
  
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".tx-row", 
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tx-table-container", start: "top 90%", once: true }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [transactions]);

  const filteredTx = transactions.filter(tx => 
    (tx.description || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (tx.category || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount) return;

    setLoading(true);
    const amount = newTx.type === "Expense" ? -Math.abs(newTx.amount) : Math.abs(newTx.amount);
    
    const result = await onAddTransaction({
      type: newTx.type,
      amount: parseFloat(amount),
      category: newTx.category,
      date: newTx.date,
      paymentMode: newTx.paymentMode,
      description: newTx.description + (newTx.notes ? ` - ${newTx.notes}` : ""),
    });

    setLoading(false);
    if (result && result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsModalOpen(false);
        setNewTx({ 
          description: "", 
          category: "Food", 
          amount: "", 
          type: "Expense",
          date: new Date().toISOString().split('T')[0],
          paymentMode: "Cash",
          notes: ""
        });
      }, 1500);
    }
  };

  return (
    <div ref={sectionRef} className="space-y-10">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
        <div className="relative w-full md:w-96 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-600 to-amber-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-700"></div>
          <div className="relative">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-500 transition-colors" size={18} />
             <input 
               type="text" 
               placeholder="Query ledger..." 
               className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-black text-white focus:outline-none focus:border-sky-500/30 transition-all shadow-inner"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-amber-500 text-black px-10 py-5 rounded-[1.8rem] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} strokeWidth={3} />
          Add Transaction
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block tx-table-container overflow-hidden rounded-[3rem]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.03] border-b border-white/5">
              <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">Timeline</th>
              <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">Description</th>
              <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">Class</th>
              <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">Portal</th>
              <th className="p-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic text-right">Delta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {filteredTx.map((tx, index) => (
              <tr key={tx._id || tx.id || `tx-${index}`} className="tx-row group hover:bg-white/[0.02] transition-all duration-500">
                <td className="p-8 whitespace-nowrap">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-600 group-hover:text-sky-500 transition-colors">
                         <Calendar size={16} />
                      </div>
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                         {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                   </div>
                </td>
                <td className="p-8">
                   <p className="text-sm font-black text-white uppercase tracking-tight group-hover:text-sky-400 transition-colors">{tx.description}</p>
                </td>
                <td className="p-8">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    tx.type === 'Income' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-slate-500 border-white/5'
                  }`}>
                    {tx.category}
                  </span>
                </td>
                <td className="p-8">
                   <div className="flex items-center gap-3 text-[10px] text-slate-600 font-black uppercase tracking-widest">
                      <Wallet size={14} className="group-hover:text-amber-500 transition-colors" />
                      {tx.paymentMode || "Cash"}
                   </div>
                </td>
                <td className={`p-8 text-right font-black text-xl tabular-nums tracking-tighter ${
                  tx.type === 'Income' ? 'text-green-400' : 'text-red-500'
                }`}>
                  {tx.type === 'Income' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-6 px-4 pb-10">
        {filteredTx.map((tx, index) => (
          <div key={tx._id || tx.id || `mobile-tx-${index}`} className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl active:scale-[0.98] transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none italic">
                  {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </span>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">{tx.description}</h4>
              </div>
              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                tx.type === 'Income' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-slate-500 border-white/10'
              }`}>
                {tx.category}
              </span>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-3 text-[10px] text-slate-600 font-black uppercase tracking-widest">
                <Wallet size={14} className="text-amber-500" />
                {tx.paymentMode || "Cash"}
              </div>
              <div className={`font-black text-2xl tracking-tighter ${
                tx.type === 'Income' ? 'text-green-400' : 'text-red-500'
              }`}>
                {tx.type === 'Income' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Futuristic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[1000] flex items-center justify-center p-6">
          <div className="bg-[#0A0A0A] rounded-[4rem] w-full max-w-xl p-12 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto custom-admin-scrollbar">
            {success ? (
              <div className="py-20 text-center animate-in zoom-in duration-500">
                 <div className="inline-flex p-6 bg-green-500/10 text-green-500 rounded-[2rem] mb-8 border border-green-500/20 shadow-2xl shadow-green-500/10">
                    <CheckCircle2 size={64} strokeWidth={3} />
                 </div>
                 <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">Ledger Updated</h3>
                 <p className="text-slate-500 font-bold uppercase tracking-widest mt-4">Transaction has been permanently synchronized.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-12">
                   <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">New Protocol</h3>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mt-2">Initialize financial transmission</p>
                   </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white/5 rounded-2xl text-slate-500 hover:text-red-500 transition-all hover:rotate-90">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-2 gap-6">
                    <button 
                      type="button"
                      onClick={() => setNewTx({...newTx, type: "Income"})}
                      className={`py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${newTx.type === 'Income' ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-white/5 bg-white/5 text-slate-600 opacity-50'}`}
                    >
                      Income Node
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewTx({...newTx, type: "Expense"})}
                      className={`py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${newTx.type === 'Expense' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-white/5 bg-white/5 text-slate-600 opacity-50'}`}
                    >
                      Expense Node
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 italic">Class</label>
                       <select 
                         className="w-full px-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:border-sky-500/30 text-white font-black text-xs uppercase tracking-widest focus:outline-none appearance-none cursor-pointer shadow-inner"
                         value={newTx.category}
                         onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                       >
                         {["Salary", "Food", "Travel", "Bills", "Shopping", "Investments", "Medical", "Entertainment"].map(c => <option key={c} value={c} className="bg-[#0A0A0A]">{c}</option>)}
                       </select>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 italic">Delta (₹)</label>
                       <input 
                         type="number" required
                         className="w-full px-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:border-amber-500/30 text-white font-black text-lg focus:outline-none shadow-inner"
                         placeholder="0"
                         value={newTx.amount}
                         onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 italic">Timestamp</label>
                       <div className="relative">
                         <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                         <input 
                           type="date"
                           className="w-full pl-14 pr-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:border-purple-500/30 text-white font-black text-xs focus:outline-none shadow-inner"
                           value={newTx.date}
                           onChange={(e) => setNewTx({...newTx, date: e.target.value})}
                         />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 italic">Portal Method</label>
                       <select 
                         className="w-full px-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:border-green-500/30 text-white font-black text-xs uppercase tracking-widest focus:outline-none appearance-none cursor-pointer shadow-inner"
                         value={newTx.paymentMode}
                         onChange={(e) => setNewTx({...newTx, paymentMode: e.target.value})}
                       >
                         {["Cash", "Card", "UPI", "Bank Transfer", "Crypto"].map(m => <option key={m} value={m} className="bg-[#0A0A0A]">{m}</option>)}
                       </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 italic">Transmission Description</label>
                    <input 
                      type="text" required
                      className="w-full px-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:border-amber-500/30 text-white font-black text-xs uppercase tracking-widest focus:outline-none shadow-inner"
                      placeholder="e.g. CORE_SALARY_IN_01"
                      value={newTx.description}
                      onChange={(e) => setNewTx({...newTx, description: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="group relative w-full bg-white text-black py-8 rounded-[2.5rem] font-black text-[13px] uppercase tracking-[0.5em] shadow-3xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-sky-600 via-purple-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
                    <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-white transition-colors">
                       {loading ? <div className="w-6 h-6 border-4 border-black group-hover:border-white border-t-transparent rounded-full animate-spin"></div> : <Zap size={20} />}
                       {loading ? "SYNCHRONIZING..." : "COMMIT TRANSMISSION"}
                    </span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;