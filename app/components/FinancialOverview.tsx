interface FinancialOverviewProps {
  eoaBalances: {
    native: string;
    erc20: string;
  } | null;
  universalBalanceUSD: number;
}

export const FinancialOverview = ({
  eoaBalances,
  universalBalanceUSD,
}: FinancialOverviewProps) => {
  return (
    <div className="bg-[#1F1F3A]/80 rounded-xl shadow-2xl p-4 border border-[#3A3A5A] backdrop-blur-sm h-full">
      <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] mb-3">
        Financial Overview
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* EOA Balances */}
        {eoaBalances && (
          <div className="bg-gradient-to-br from-[#2A2A4A]/80 to-[#2A2A4A]/40 rounded-lg p-4 border border-[#4A4A6A]/50 hover:border-[#8B5CF6]/50 transition-all">
            <div className="mb-3">
              <h2 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                EOA Balance
              </h2>
              <h3 className="text-[10px] text-gray-400 mt-0.5">
                Base Network
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2.5 bg-[#1F1F3A]/50 rounded-lg">
                <span className="text-xs text-gray-400 font-medium">ETH</span>
                <span className="text-lg font-bold text-slate-50">
                  {parseFloat(eoaBalances.native).toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-[#1F1F3A]/50 rounded-lg">
                <span className="text-xs text-gray-400 font-medium">USDC</span>
                <span className="text-lg font-bold text-[#2775CA]">
                  {parseFloat(eoaBalances.erc20).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Universal Balance */}
        <div className="bg-gradient-to-br from-[#FACC15]/20 to-[#EAB308]/10 rounded-lg p-4 border border-[#FACC15]/30 hover:border-[#FACC15]/50 transition-all">
          <div className="mb-3">
            <h2 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Universal Balance
            </h2>
            <h3 className="text-[10px] text-gray-400 mt-0.5">
              All Chains Aggregated
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-3xl font-bold text-[#FACC15]">
              ${universalBalanceUSD.toFixed(4)}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            Cross-chain assets available for use
          </p>
        </div>
      </div>
    </div>
  );
};
