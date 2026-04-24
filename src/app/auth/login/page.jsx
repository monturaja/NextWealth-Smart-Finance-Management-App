"use client";
import React, { useState, useLayoutEffect, useRef, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Mail, 
  Lock, 
  AlertCircle, 
  User, 
  Wallet,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Globe,
  Fingerprint
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

function IdentityGatewayContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const containerRef = useRef(null);

  // Entrance Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".auth-orb", {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)"
      })
      .from(".auth-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      }, "-=1")
      .from(".auth-item", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.8");

      // Floating animation for orbs
      gsap.to(".auth-orb-1", { y: 30, x: 20, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".auth-orb-2", { y: -40, x: -30, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Handle Mode Toggle Animation
  const toggleMode = (newMode) => {
    if (newMode === mode) return;
    
    gsap.to(".auth-item", {
      opacity: 0,
      y: -10,
      stagger: 0.05,
      duration: 0.3,
      onComplete: () => {
        setMode(newMode);
        setError("");
        gsap.fromTo(".auth-item", 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power3.out" }
        );
      }
    });
  };

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError(res.error === "CredentialsSignin" ? "Invalid neural credentials." : res.error);
    } else {
      router.push("/");
    }
  };

  const handleSignup = async () => {
    if (!name) {
      setError("Identity label is required.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      await handleLogin();
    } else {
      setError(data.message || "Identity registration failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await handleLogin();
      } else {
        await handleSignup();
      }
    } catch (err) {
      setError("Neural link timeout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Cinematic Background */}
      <div className="auth-orb auth-orb-1 absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="auth-orb auth-orb-2 absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Structural Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      {/* Brand Back Button */}
      <Link href="/" className="absolute top-10 left-10 flex items-center gap-3 text-slate-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.4em] italic z-50 group">
         <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-sky-500/50 transition-colors">
            <ArrowLeft size={16} />
         </div>
         <span className="hidden sm:inline">Return to Hub</span>
      </Link>

      <div className="auth-card w-full max-w-[480px] bg-white/[0.02] backdrop-blur-3xl rounded-[4rem] p-12 md:p-16 border border-white/5 relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
        
        {/* Brand Icon */}
        <div className="flex justify-center mb-10 auth-item">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-br from-sky-500 to-amber-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-20 h-20 bg-black border border-white/10 rounded-[1.8rem] flex items-center justify-center text-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
               <Fingerprint size={32} className="text-sky-500" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="auth-item text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-none mb-4 uppercase">
              {mode === 'login' ? "Secure" : "Initialize"} <span className="bg-gradient-to-r from-sky-400 to-amber-500 bg-clip-text text-transparent">Nexus</span>
           </h1>
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              {mode === 'login' 
                ? "Synchronize your identity nodes" 
                : "Register your financial signature"}
           </p>
        </div>

        {/* Mode Switcher */}
        <div className="auth-item p-1.5 bg-black/40 border border-white/5 rounded-[2rem] flex mb-12 shadow-inner">
            <button 
              onClick={() => toggleMode('login')}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] transition-all duration-500 ${mode === 'login' ? 'bg-white text-black shadow-2xl scale-105' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Access
            </button>
            <button 
              onClick={() => toggleMode('signup')}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] transition-all duration-500 ${mode === 'signup' ? 'bg-white text-black shadow-2xl scale-105' : 'text-slate-600 hover:text-slate-400'}`}
            >
              Onboard
            </button>
        </div>

        {error && (
          <div className="auth-item bg-red-500/10 text-red-500 p-6 rounded-[2rem] border border-red-500/20 mb-10 flex items-start gap-4 animate-in zoom-in-95 duration-500 shadow-2xl shadow-red-500/5">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {mode === 'signup' && (
            <div className="auth-item space-y-3">
               <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6 italic">Identity Label</label>
               <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-amber-500 rounded-[2rem] blur opacity-0 group-focus-within/input:opacity-20 transition duration-1000"></div>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within/input:text-sky-500 transition-colors" size={18} />
                    <input 
                      type="text" required
                      className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-xs font-black text-white placeholder:text-slate-700 outline-none focus:border-sky-500/30 transition-all shadow-inner uppercase tracking-widest"
                      placeholder="FULL NAME"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
               </div>
            </div>
          )}

          <div className="auth-item space-y-3">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6 italic">Neural Endpoint (Email)</label>
            <div className="relative group/input">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-amber-500 rounded-[2rem] blur opacity-0 group-focus-within/input:opacity-20 transition duration-1000"></div>
               <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within/input:text-sky-500 transition-colors" size={18} />
                <input 
                  type="email" required
                  className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-xs font-black text-white placeholder:text-slate-700 outline-none focus:border-sky-500/30 transition-all shadow-inner uppercase tracking-widest"
                  placeholder="YOU@EXAMPLE.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="auth-item space-y-3">
            <div className="flex justify-between items-center ml-6 mr-6">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] italic">Passkey</label>
              {mode === 'login' && (
                <Link href="#" className="text-[9px] font-black text-sky-500 hover:text-amber-500 transition-colors uppercase tracking-widest">
                  Reset Link?
                </Link>
              )}
            </div>
            <div className="relative group/input">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-amber-500 rounded-[2rem] blur opacity-0 group-focus-within/input:opacity-20 transition duration-1000"></div>
               <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within/input:text-sky-500 transition-colors" size={18} />
                <input 
                  type="password" required
                  className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-xs font-black text-white placeholder:text-slate-700 outline-none focus:border-sky-500/30 transition-all shadow-inner tracking-[0.5em]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
             <button 
              type="submit" 
              disabled={loading}
              className="auth-item group relative w-full bg-white text-black py-8 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.5em] shadow-3xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sky-600 via-amber-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></span>
              <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-white transition-colors">
                {loading ? <div className="w-5 h-5 border-4 border-black group-hover:border-white border-t-transparent rounded-full animate-spin"></div> : <Zap size={18} />}
                {loading ? "INITIALIZING..." : mode === 'login' ? "COMMIT ACCESS" : "AUTHORIZE NODES"}
              </span>
            </button>
          </div>
        </form>

        <div className="auth-item mt-16 pt-8 border-t border-white/5 text-center space-y-6">
           <div className="flex items-center justify-center gap-6 text-slate-700">
              <ShieldCheck size={20} className="hover:text-sky-500 transition-colors cursor-help" />
              <Globe size={20} className="hover:text-amber-500 transition-colors cursor-help" />
              <Zap size={20} className="hover:text-indigo-500 transition-colors cursor-help" />
           </div>
           <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.8em]">End-to-End Encrypted Gateway</p>
        </div>
      </div>
      
    </div>
  );
}

export default function IdentityGateway() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-black uppercase tracking-[0.5em]">
        Loading Neural Hub...
      </div>
    }>
      <IdentityGatewayContent />
    </Suspense>
  );
}
