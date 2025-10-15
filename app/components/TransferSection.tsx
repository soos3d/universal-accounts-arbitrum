/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

interface TransferSectionProps {
  onTransferEth: (amount: string) => Promise<void>;
  onTransferUsdc: (amount: string) => Promise<void>;
}

export const TransferSection = ({
  onTransferEth,
  onTransferUsdc,
}: TransferSectionProps) => {
  const [ethTransferAmount, setEthTransferAmount] = useState<string>("");
  const [usdcTransferAmount, setUsdcTransferAmount] = useState<string>("");
  const [isTransferringEth, setIsTransferringEth] = useState<boolean>(false);
  const [isTransferringUsdc, setIsTransferringUsdc] = useState<boolean>(false);
  const [transferResult, setTransferResult] = useState<string | null>(null);

  const handleTransferEth = async () => {
    if (!ethTransferAmount) return;
    setIsTransferringEth(true);
    setTransferResult(null);

    try {
      await onTransferEth(ethTransferAmount);
      setTransferResult(`ETH transfer successful!`);
      setEthTransferAmount("");
    } catch (error) {
      console.error("ETH transfer failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setTransferResult(`Error: ${errorMessage}`);
    } finally {
      setIsTransferringEth(false);
    }
  };

  const handleTransferUsdc = async () => {
    if (!usdcTransferAmount) return;
    setIsTransferringUsdc(true);
    setTransferResult(null);

    try {
      await onTransferUsdc(usdcTransferAmount);
      setTransferResult(`USDC transfer successful!`);
      setUsdcTransferAmount("");
    } catch (error) {
      console.error("USDC transfer failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setTransferResult(`Error: ${errorMessage}`);
    } finally {
      setIsTransferringUsdc(false);
    }
  };

  return (
    <div className="bg-[#1F1F3A]/80 rounded-xl shadow-2xl p-4 border border-[#3A3A5A] backdrop-blur-sm h-full flex flex-col">
      <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] mb-3">
        Transfer to Universal Account
      </h3>

      <div className="flex-1 space-y-3">
        {/* ETH Transfer */}
        <div className="bg-[#2A2A4A]/50 rounded-lg p-3 border border-[#4A4A6A]/50 hover:border-[#8B5CF6]/50 transition-all space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://universalx.app/_next/image?url=https%3A%2F%2Fstatic.particle.network%2Ftoken-list%2Fethereum%2Fnative.png&w=32&q=75"
              alt="ETH"
              className="w-6 h-6 rounded-full"
            />
            <div>
              <p className="text-gray-200 text-xs font-semibold">Transfer ETH</p>
              <p className="text-gray-400 text-[10px]">From EOA to Universal Account</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.0001"
              placeholder="0.0000"
              value={ethTransferAmount}
              onChange={(e) => setEthTransferAmount(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#1F1F3A] border border-[#4A4A6A] rounded-lg text-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/20 transition-all"
            />
            <button
              onClick={handleTransferEth}
              disabled={isTransferringEth || !ethTransferAmount}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm font-medium shadow-lg hover:shadow-slate-500/50"
            >
              {isTransferringEth ? "Sending..." : "Send"}
            </button>
          </div>
        </div>

        {/* USDC Transfer */}
        <div className="bg-[#2A2A4A]/50 rounded-lg p-3 border border-[#4A4A6A]/50 hover:border-[#2775CA]/50 transition-all space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://universalx.app/_next/image?url=https%3A%2F%2Fstatic.particle.network%2Ftoken-list%2Fethereum%2F0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.png&w=32&q=75"
              alt="USDC"
              className="w-6 h-6 rounded-full"
            />
            <div>
              <p className="text-gray-200 text-xs font-semibold">Transfer USDC</p>
              <p className="text-gray-400 text-[10px]">From EOA to Universal Account</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={usdcTransferAmount}
              onChange={(e) => setUsdcTransferAmount(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#1F1F3A] border border-[#4A4A6A] rounded-lg text-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:border-[#2775CA] focus:ring-1 focus:ring-[#2775CA]/20 transition-all"
            />
            <button
              onClick={handleTransferUsdc}
              disabled={isTransferringUsdc || !usdcTransferAmount}
              className="px-4 py-2 bg-[#2775CA] text-white rounded-lg hover:bg-[#1e5fa0] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm font-medium shadow-lg hover:shadow-blue-500/50"
            >
              {isTransferringUsdc ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>

      {/* Transfer Result */}
      {transferResult && (
        <div className="mt-3 bg-[#2A2A4A]/50 rounded-lg p-3 border border-[#4A4A6A]/50">
          <p
            className={`text-xs break-all font-medium ${
              transferResult.startsWith("Error")
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {transferResult}
          </p>
        </div>
      )}
    </div>
  );
};
