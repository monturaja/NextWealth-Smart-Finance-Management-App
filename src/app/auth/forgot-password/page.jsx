"use client";
import React, { useState, useLayoutEffect, useRef } from "react";
import { Mail, Key, ShieldCheck, ChevronRight, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Success
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".forgot-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSendOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#BDE8F5] flex items-center justify-center p-4">
      <div className="forgot-card w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative z-10 border border-gray-100">
        
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#0F2854] transition-colors mb-8">
           <ArrowLeft size={16} />
           Back to Login
        </Link>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-[#BDE8F5] text-[#1C4D8D] rounded-2xl mb-4 shadow-sm">
                 <Key size={32} />
              </div>
              <h1 className="text-3xl font-black text-[#0F2854] tracking-tight">Forgot Password?</h1>
              <p className="text-gray-500 font-medium mt-2">Enter your email and we'll send you an OTP to reset your password.</p>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#1C4D8D] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#0F2854]"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0F2854] text-[#E8DDB5] py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send Verification Code"}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="text-center mb-8">
              <div className="inline-block p-4 bg-[#BDE8F5] text-[#1C4D8D] rounded-2xl mb-4 shadow-sm">
                 <ShieldCheck size={32} />
              </div>
              <h1 className="text-3xl font-black text-[#0F2854] tracking-tight">Verify Identity</h1>
              <p className="text-gray-500 font-medium mt-2">We've sent a 6-digit code to <br/><span className="text-[#0F2854] font-bold">{email}</span></p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="flex justify-between gap-2">
                 {[1,2,3,4,5,6].map(i => (
                   <input key={i} type="text" maxLength={1} className="w-12 h-14 bg-gray-50 border-2 border-transparent focus:border-[#1C4D8D] text-center font-black text-xl rounded-xl outline-none" />
                 ))}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0F2854] text-[#E8DDB5] py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Reset Password"}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center">
                 <p className="text-sm font-medium text-gray-400">Didn't receive code? <button type="button" className="text-[#1C4D8D] font-bold">Resend</button></p>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in zoom-in duration-500 text-center">
             <div className="inline-block p-6 bg-green-50 text-green-600 rounded-full mb-6 shadow-sm border-2 border-green-100">
                 <ShieldCheck size={48} />
             </div>
             <h1 className="text-3xl font-black text-[#0F2854] tracking-tight mb-4">Password Reset!</h1>
             <p className="text-gray-500 font-medium mb-8">Your account security has been verified. You can now log in with your temporary credentials sent to your email.</p>
             
             <Link 
                href="/auth/login"
                className="w-full bg-[#0F2854] text-[#E8DDB5] py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 group inline-block"
             >
                Continue to Login
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        )}

      </div>
    </div>
  );
}
