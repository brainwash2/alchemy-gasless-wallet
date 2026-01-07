# ⛽ Gasless Stablecoin Wallet (ERC-4337)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Tech: Next.js](https://img.shields.io/badge/Tech-Next.js_15-black)
![Infrastructure: Alchemy](https://img.shields.io/badge/Infra-Alchemy_AA-blue)
![Network: Arbitrum](https://img.shields.io/badge/Network-Arbitrum_Sepolia-blue)

A production-grade **Smart Contract Wallet** that eliminates the biggest friction in Web3: Gas Fees.
Users can transact with **USDC** on Arbitrum Sepolia without ever holding or worrying about ETH.

## ⚡ The Problem
In standard Web3 apps (EOA), users must hold native ETH to pay for gas, even if they only want to transact in Stablecoins. This creates a massive barrier to entry for non-crypto natives.

## 💡 The Solution
This project leverages **ERC-4337 (Account Abstraction)** to create a "Smart Account" for the user.
- **Smart Signer:** The user holds a key (Passkey/Local) to sign "UserOperations".
- **Gas Sponsorship:** An **Alchemy Paymaster** intercepts the transaction and pays the ETH gas fee on behalf of the user.
- **Result:** A seamless, "Web2-like" payment experience.

## 🛠️ Architecture Stack
- **Frontend:** Next.js 15 (App Router), TailwindCSS, Lucide React
- **Blockchain Interaction:** Viem, @alchemy/aa-core, @alchemy/aa-alchemy
- **Smart Accounts:** LightAccount (ERC-4337 compliant)
- **Infrastructure:** Alchemy Bundler & Gas Manager

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/brainwash2/alchemy-gasless-wallet.git
cd alchemy-gasless-wallet

### 2. Install Dependencies
Note: Using legacy-peer-deps due to React 19/Web3 library compatibility.
```bash
npm install --legacy-peer-deps

### 3. Environment Configuration
Create a .env.local file in the root directory:

```bash
 # 1. Alchemy API Key (Dashboard -> Apps)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_api_key_here

# 2. Gas Manager Policy ID (Dashboard -> Gas Manager -> Sponsorship Policy)
NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID=your_policy_id_here

# 3. Development Private Key (The "Signer" of the wallet)
# DO NOT USE A MAINNET KEY
NEXT_PUBLIC_TEST_PRIVATE_KEY=0x...

### 4. Run Locally 
```bash
npm run dev

🧪 Usage Guide
Initialization: The app generates a deterministic Smart Account address upon load.
Funding: Send USDC (Arbitrum Sepolia) to the Smart Account Address.
You do NOT need to send ETH.
Transfer: Enter a recipient address and click "Pay with USDC".
Verification: The transaction is executed via the EntryPoint contract, with gas paid by the Paymaster.
