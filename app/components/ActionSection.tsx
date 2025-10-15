interface ActionSectionProps {
  onMintNFT: () => Promise<void>;
  isLoading: boolean;
  txResult: string | null;
}

export const ActionSection = ({
  onMintNFT,
  isLoading,
  txResult,
}: ActionSectionProps) => {
  return (
    <div className="bg-[#1F1F3A]/80 rounded-xl shadow-2xl p-4 border border-[#3A3A5A] backdrop-blur-sm h-full flex flex-col">
      <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] mb-3">
        Actions
      </h3>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-gradient-to-br from-[#FACC15]/10 to-[#EAB308]/5 rounded-lg p-4 border border-[#FACC15]/30 hover:border-[#FACC15]/50 transition-all">
          <div className="text-center mb-4">
            <h4 className="text-sm font-bold text-gray-200 mb-1">Mint NFT on Avalanche</h4>
            <p className="text-gray-400 text-xs">
              Use tokens from any chain to mint an NFT on Avalanche
            </p>
          </div>
          
          <button
            onClick={onMintNFT}
            disabled={isLoading}
            className="w-full py-3 px-5 rounded-lg font-bold text-base text-gray-900 bg-gradient-to-r from-[#FACC15] to-[#EAB308] hover:from-[#EAB308] hover:to-[#FACC15] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Minting...
              </>
            ) : (
              "Mint NFT"
            )}
          </button>
          
          {txResult && (
            <div className="mt-4 p-3 bg-[#2A2A4A]/50 rounded-lg border border-[#4A4A6A]/50">
              {txResult.startsWith("Error") ? (
                <p className="text-red-400 text-xs break-all font-medium">{txResult}</p>
              ) : (
                <div className="text-center">
                  <p className="text-green-400 text-xs font-medium mb-1.5">Transaction Successful!</p>
                  <a
                    href={txResult}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C084FC] hover:text-[#8B5CF6] text-xs underline break-all transition-colors"
                  >
                    View on Explorer →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
