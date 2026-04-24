"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, MessageSquare, Camera, Link as LinkIcon, Mail, Phone, MapPin, ExternalLink, Wallet } from "lucide-react";

/**
 * Footer - Premium branded footer with navigation and social icons
 */
const Footer = () => {
  const socialLinks = [
    { name: "Facebook", icon: <Share2 size={20} />, href: "#" },
    { name: "Twitter", icon: <MessageSquare size={20} />, href: "#" },
    { name: "Instagram", icon: <Camera size={20} />, href: "#" },
    { name: "Linkedin", icon: <LinkIcon size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-white pt-20 pb-10 px-4 md:px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer inline-flex">
              <div className="w-8 h-8 bg-[#1C4D8D] rounded-lg flex items-center justify-center text-white shadow-md">
                <Wallet size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0F2854]">
                Next<span className="text-[#1C4D8D]">Wealth</span>
              </span>
            </Link>

            <p className="text-slate-500 leading-relaxed max-w-sm text-sm font-medium">
              Revolutionizing personal finance into a stunning, automated experience for modern users. Your wealth, managed intelligently.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-[#BDE8F5] rounded-full flex items-center justify-center text-slate-400 hover:bg-[#0F2854] hover:text-white transition-all shadow-sm border border-slate-100"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-base font-bold text-[#0F2854] tracking-tight">Solutions</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li className="hover:text-[#1C4D8D] transition-colors flex items-center gap-2 group cursor-pointer">
                Smart Budgeting
              </li>
              <li className="hover:text-[#1C4D8D] transition-colors flex items-center gap-2 group cursor-pointer">
                Investment Tracking
              </li>
              <li className="hover:text-[#1C4D8D] transition-colors flex items-center gap-2 group cursor-pointer">
                Expense Analytics
              </li>
              <li className="hover:text-[#1C4D8D] transition-colors flex items-center gap-2 group cursor-pointer">
                Portfolio Diversifier
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-base font-bold text-[#0F2854] tracking-tight">Company</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li className="hover:text-[#1C4D8D] cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-[#1C4D8D] cursor-pointer transition-colors">Our Strategy</li>
              <li className="hover:text-[#1C4D8D] cursor-pointer transition-colors flex items-center">
                 Careers 
                 <span className="ml-2 bg-[#BDE8F5] text-[#1C4D8D] px-2 py-0.5 rounded text-xs font-semibold">We're Hiring</span>
              </li>
              <li className="hover:text-[#1C4D8D] cursor-pointer transition-colors">Privacy Policy</li>
              <li>
                <Link href="/admin/login" className="hover:text-[#1C4D8D] cursor-pointer font-semibold flex items-center gap-2 text-slate-700 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#4988C4]"></span>
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-base font-bold text-[#0F2854] tracking-tight">Support</h4>
            <ul className="space-y-4 text-slate-500 font-medium text-sm">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#4988C4] mt-1 shrink-0" />
                <span>support@nextwealth.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#4988C4] mt-1 shrink-0" />
                <span>+91 952-158-7624</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#4988C4] mt-1 shrink-0" />
                <span>Sumerpur, Pali, Rajasthan, India</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 font-medium text-sm">
            © 2026 NEXTWEALTH. All rights reserved. Made by <span className="text-[#0F2854] font-bold">MONTU RAJA</span>
          </p>
          <div className="flex gap-6 text-sm font-semibold text-slate-400">
            <span className="hover:text-[#0F2854] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#0F2854] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#0F2854] cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;