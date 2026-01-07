import WalletWorker from "@/components/WalletWorker";
import TransferUSDC from "@/components/TransferUSDC";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 gap-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Gasless USDC Wallet
        </h1>
        <p className="text-slate-500 mt-2">Powered by Alchemy Account Abstraction</p>
      </div>
      
      <WalletWorker />
      <TransferUSDC />
    </main>
  );
}