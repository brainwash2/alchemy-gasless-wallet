// src/components/WalletWorker.tsx
"use client";
import { useState, useEffect } from "react";
import { createSmartAccountClient } from "@/lib/config";

export default function WalletWorker() {
  const [address, setAddress] = useState<string>("Initializing...");
  const [status, setStatus] = useState<string>("Loading");

  useEffect(() => {
    async function initWallet() {
      try {
        setStatus("Building Account...");
        const client = await createSmartAccountClient();
        
        // Grab the address from the created account
        const scwAddress = client.account.address;
        
        console.log("Wallet Created:", scwAddress);
        setAddress(scwAddress);
        setStatus("Ready");
      } catch (error: any) {
        console.error("Wallet Error:", error);
        setAddress("Setup Failed");
        setStatus(error.message || "Unknown Error");
      }
    }

    initWallet();
  }, []);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-700 shadow-xl max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Alchemy Smart Account</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider">Status</label>
          <div className="flex items-center gap-2 mt-1">
            <span className={`h-3 w-3 rounded-full ${status === "Ready" ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`}></span>
            <span className="font-mono text-sm">{status}</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-400 uppercase tracking-wider">Smart Account Address</label>
          <div className="font-mono text-sm break-all bg-black/30 p-3 rounded mt-1 border border-slate-800">
            {address}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is your AA Wallet on Arbitrum Sepolia.
          </p>
        </div>
      </div>
    </div>
  );
}