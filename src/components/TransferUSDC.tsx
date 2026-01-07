"use client";
import { useState } from "react";
import { createSmartAccountClient } from "@/lib/config";
import { encodeFunctionData, parseAbi } from "viem";

// 1. The Official USDC Contract on Arbitrum Sepolia
const USDC_ADDRESS = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d";

// 2. The ABI (The "Instruction Manual" for USDC)
const USDC_ABI = parseAbi([
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)"
]);

export default function TransferUSDC() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("0.1"); // Default small amount
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleSend = async () => {
    if (!recipient) return alert("Enter an address!");
    
    setStatus("Initiating Transaction...");
    
    try {
      // A. Initialize the Client
      const client = await createSmartAccountClient();
      
      // B. Prepare the Data (The "Payload")
      // We are converting "0.1 USDC" to "100000" (USDC has 6 decimals)
      const amountInMicros = BigInt(Number(amount) * 1_000_000);
      
      const uoCallData = encodeFunctionData({
        abi: USDC_ABI,
        functionName: "transfer",
        args: [recipient as `0x${string}`, amountInMicros]
      });

      // C. Send the UserOperation (The "Gasless" Magic)
      setStatus("Sending UserOp to Bundler...");
      
      const uo = await client.sendUserOperation({
        uo: {
          target: USDC_ADDRESS,
          data: uoCallData,
          value: BigInt(0), // We are sending 0 ETH, only USDC
        },
      });

      setStatus("Waiting for Transaction to Mine...");
      
      // D. Wait for it to finish
      const txHash = await client.waitForUserOperationTransaction(uo);
      
      setTxHash(txHash);
      setStatus("Success! 🚀");
      
    } catch (e: any) {
      console.error(e);
      setStatus("Failed: " + (e.message || "Unknown Error"));
    }
  };

  return (
    <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 mt-6 max-w-md mx-auto">
      <h3 className="text-lg font-bold text-white mb-4">Send USDC (Gasless)</h3>
      
      <div className="space-y-3">
        <input 
          type="text" 
          placeholder="Recipient Address (0x...)"
          className="w-full p-3 bg-slate-900 border border-slate-600 rounded text-white"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        
        <div className="flex gap-2">
           <input 
            type="number" 
            placeholder="Amount"
            className="w-full p-3 bg-slate-900 border border-slate-600 rounded text-white"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="p-3 bg-slate-700 rounded text-slate-300 font-bold">USDC</div>
        </div>

        <button 
          onClick={handleSend}
          disabled={status.startsWith("Sending") || status.startsWith("Initiating")}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded transition-colors disabled:opacity-50"
        >
          {status.startsWith("Sending") ? "Processing..." : "Pay with USDC (Sponsored)"}
        </button>

        {status && <p className="text-center text-sm text-yellow-400 mt-2">{status}</p>}
        
        {txHash && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-500 rounded text-center">
            <p className="text-green-400 font-bold">Transfer Successful!</p>
            <a 
              href={`https://sepolia.arbiscan.io/tx/${txHash}`}
              target="_blank"
              className="text-xs text-blue-300 underline mt-1 block"
            >
              View on Arbiscan
            </a>
          </div>
        )}
      </div>
    </div>
  );
}