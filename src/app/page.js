"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CTA from "@/sections/CTA";

// High-End Landing Page Sections
import FeatureMatrix from "@/sections/FeatureMatrix";
import SecurityCore from "@/sections/SecurityCore";
import GlobalTrust from "@/sections/GlobalTrust";

/**
 * High-End Landing Page: "The Wealth Gateway"
 * This is the public face of NextWealth, designed to WOW guests and redirect users.
 */
export default function Home() {
  // Ensure GSAP ScrollTrigger refreshes after initial layout
  useEffect(() => {
    const timer = setTimeout(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white text-[#0F2854] scroll-smooth selection:bg-[#1C4D8D] selection:text-white">
      <Navbar />
      
      {/* 1. Elite Entry Point */}
      <Hero />
      
      {/* 2. Global Momentum Stats */}
      <div id="trust">
        <GlobalTrust />
      </div>
      
      {/* 3. The Feature Grid */}
      <div id="features">
        <FeatureMatrix />
      </div>
      
      {/* 4. Deep Security Reveal */}
      <div id="security">
        <SecurityCore />
      </div>
      
      {/* 5. Final Push to Action */}
      <CTA />
      
      <Footer />
    </div>
  );
}