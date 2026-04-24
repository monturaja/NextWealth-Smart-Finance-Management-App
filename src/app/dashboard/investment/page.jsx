"use client";
import React from "react";
import Investment from "@/sections/Investment";

export default function InvestmentViewPage() {
  return (
    <div className="space-y-12">
      <header className="mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-black text-[#666A86] tracking-tight">
          Wealth Management
        </h1>
        <p className="text-gray-500 font-medium text-lg mt-2">Oversee your diverse assets including stocks, crypto, and traditional mutual funds.</p>
      </header>

      {/* Investment Portfolio Section */}
      <div className="-mt-12">
        <Investment />
      </div>
    </div>
  );
}
