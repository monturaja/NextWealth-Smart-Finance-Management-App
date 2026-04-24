"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  Wallet,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Security", href: "#security" },
    { name: "Trust", href: "#trust" },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#1C4D8D] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Wallet size={22} />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-[#0F2854]" : "text-[#0F2854]"}`}>
            Next<span className="text-[#1C4D8D]">Wealth</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                scrolled ? "text-slate-600 hover:text-[#1C4D8D]" : "text-slate-600 hover:text-[#1C4D8D]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!session ? (
            <>
              <Link 
                href="/auth/login" 
                className={`text-sm font-semibold transition-all px-4 ${
                   scrolled ? "text-slate-600 hover:text-[#0F2854]" : "text-slate-600 hover:text-[#0F2854]"
                }`}
              >
                Log in
              </Link>
              <Link 
                href="/auth/login" 
                className="bg-[#1C4D8D] text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:bg-[#1C4D8D] transition-all active:scale-95 border border-[#4988C4]/20"
              >
                Sign up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
               <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${
                  scrolled ? "bg-[#BDE8F5] border-slate-100" : "bg-white/50 border-slate-200"
               }`}>
                  <div className="w-8 h-8 rounded-lg bg-[#BDE8F5] flex items-center justify-center text-[#1C4D8D] font-bold text-sm">
                     {session.user.name?.[0]}
                  </div>
                  <div className="flex flex-col">
                     <span className={`text-[10px] font-bold uppercase tracking-wider ${scrolled ? "text-[#1C4D8D]" : "text-[#1C4D8D]"}`}>
                        {session.user.role === 'admin' ? "Admin" : "Member"}
                     </span>
                     <span className={`text-sm font-bold tracking-tight ${scrolled ? "text-[#0F2854]" : "text-[#0F2854]"}`}>
                        {session.user.name.split(' ')[0]}
                     </span>
                  </div>
               </div>
               
               <Link 
                 href={session.user.role === 'admin' ? '/admin' : '/dashboard/overview'}
                 className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-lg font-semibold text-sm shadow-sm hover:bg-slate-200 transition-all"
               >
                 <LayoutDashboard size={16} />
                 Dashboard
               </Link>

               <button 
                onClick={() => signOut()}
                className={`p-2.5 rounded-lg transition-all border shrink-0 ${
                   scrolled ? "bg-red-50 border-red-100 text-red-500 hover:bg-red-500 hover:text-white" : "bg-red-50 border-red-100 text-red-500 hover:bg-red-500 hover:text-white"
                }`}
               >
                 <LogOut size={16} />
               </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#0F2854] z-[1001]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-white z-[1000] p-6 pt-24 flex flex-col gap-6 overflow-y-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold text-[#0F2854] hover:text-[#1C4D8D] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-8 border-t border-slate-100 flex flex-col gap-4 w-full">
            {!session ? (
              <>
                <Link 
                  href="/auth/login"
                  className="w-full text-center py-4 rounded-xl border border-slate-200 font-bold text-slate-700 text-lg hover:bg-[#BDE8F5]"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  href="/auth/login"
                  className="w-full bg-[#1C4D8D] text-white flex justify-center py-4 rounded-xl text-center font-bold text-lg shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up for free
                </Link>
              </>
            ) : (
              <Link 
                href={session.user.role === 'admin' ? '/admin' : '/dashboard/overview'}
                className="w-full bg-[#0F2854] text-white flex justify-center py-4 rounded-xl text-center font-bold text-lg shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Access Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;