// @ts-nocheck
import { createAlchemySmartAccountClient } from "@alchemy/aa-alchemy";
import { createLightAccount } from "@alchemy/aa-accounts";
import { arbitrumSepolia } from "viem/chains";
import { LocalAccountSigner } from "@alchemy/aa-core";
import { http } from "viem";

export const chain = arbitrumSepolia;

// 1. Load Env
const PRIVATE_KEY = process.env.NEXT_PUBLIC_TEST_PRIVATE_KEY;
const API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const POLICY_ID = process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID;

// 2. Construct the URL (The Validator wants this string)
const ALCHEMY_RPC_URL = `https://arb-sepolia.g.alchemy.com/v2/${API_KEY}`;

// 3. Create Signer
export const signer = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);

// 4. Create Client
export const createSmartAccountClient = async () => {
  if (!API_KEY) throw new Error("API KEY MISSING");

  // A. Create the Account
  // We MUST use the transport object here for the LightAccount
  const account = await createLightAccount({
    transport: http(ALCHEMY_RPC_URL),
    chain: chain,
    signer: signer, 
  });

  // B. Connect to Alchemy Client
  // FIX: We use 'rpcUrl' directly instead of 'transport' or 'apiKey'.
  // This matches the specific Zod Union Schema found in your error log.
  const client = await createAlchemySmartAccountClient({
    rpcUrl: ALCHEMY_RPC_URL, // <--- DIRECT STRING PASSING
    chain: chain,
    account: account,
    gasManagerConfig: {
      policyId: POLICY_ID,
    },
  });

  return client;
};