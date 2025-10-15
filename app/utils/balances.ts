import { formatUnits } from "viem";
import type { PublicClient } from "viem";

const ERC20_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC on base
const ERC20_ABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const fetchEOABalances = async (
  publicClient: PublicClient,
  address: string
) => {
  try {
    // Fetch native balance
    const nativeBalance = await publicClient.getBalance({
      address: address as `0x${string}`,
    });

    // Fetch ERC20 balance
    const erc20Balance = await publicClient.readContract({
      address: ERC20_ADDRESS,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [address as `0x${string}`],
    });

    return {
      native: formatUnits(nativeBalance, 18),
      erc20: formatUnits(erc20Balance, 6), // USDC has 6 decimals
    };
  } catch (error) {
    console.error("Failed to fetch EOA balances:", error);
    return null;
  }
};
