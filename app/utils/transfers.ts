import type { WalletClient } from "viem";

const ERC20_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC on base
const ERC20_ABI = [
  {
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const transferEthToUA = async (
  walletClient: WalletClient,
  address: string,
  evmSmartAccount: string,
  amount: string
) => {
  const amountInWei = BigInt(Math.floor(parseFloat(amount) * 1e18));

  const hash = await walletClient.sendTransaction({
    account: address as `0x${string}`,
    to: evmSmartAccount as `0x${string}`,
    value: amountInWei,
    chain: null,
  });

  return hash;
};

export const transferUsdcToUA = async (
  walletClient: WalletClient,
  address: string,
  evmSmartAccount: string,
  amount: string
) => {
  const amountInUnits = BigInt(Math.floor(parseFloat(amount) * 1e6)); // USDC has 6 decimals

  const hash = await walletClient.writeContract({
    account: address as `0x${string}`,
    address: ERC20_ADDRESS,
    abi: ERC20_ABI,
    functionName: "transfer",
    args: [evmSmartAccount as `0x${string}`, amountInUnits],
    chain: null,
  });

  return hash;
};
