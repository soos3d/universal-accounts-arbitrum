import { formatAddress } from "../utils/format";

interface AccountDetailsProps {
  address: string;
  accountInfo: {
    ownerAddress: string;
    evmSmartAccount: string;
    solanaSmartAccount: string;
  } | null;
  onDisconnect: () => void;
}

export const AccountDetails = ({
  address,
  accountInfo,
  onDisconnect,
}: AccountDetailsProps) => {
  return (
    <div className="bg-[#1F1F3A]/80 rounded-xl shadow-2xl p-4 border border-[#3A3A5A] backdrop-blur-sm h-full flex flex-col">
      <div className="flex-1 space-y-3">
        <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] mb-3">
          Account Details
        </h3>

        {/* Wallet Address */}
        <div className="bg-[#2A2A4A]/50 rounded-lg p-3 border border-[#4A4A6A]/50 hover:border-[#8B5CF6]/50 transition-colors">
          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1.5">
            Wallet Address
          </div>
          <div className="font-mono text-gray-200 text-xs break-all">
            {formatAddress(address)}
          </div>
        </div>

        {/* EVM Universal Account */}
        {accountInfo && (
          <div className="bg-[#2A2A4A]/50 rounded-lg p-3 border border-[#4A4A6A]/50 hover:border-[#8B5CF6]/50 transition-colors">
            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1.5">
              EVM Universal Account
            </div>
            <div className="font-mono text-gray-200 text-xs break-all">
              {formatAddress(accountInfo.evmSmartAccount)}
            </div>
          </div>
        )}

        {/* SOL Universal Account */}
        {accountInfo && (
          <div className="bg-[#2A2A4A]/50 rounded-lg p-3 border border-[#4A4A6A]/50 hover:border-[#8B5CF6]/50 transition-colors">
            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1.5">
              SOL Universal Account
            </div>
            <div className="font-mono text-gray-200 text-xs break-all">
              {formatAddress(accountInfo.solanaSmartAccount)}
            </div>
          </div>
        )}
      </div>

      {/* Disconnect Button at Bottom */}
      <div className="mt-4 pt-3 border-t border-[#4A4A6A]/50">
        <button
          onClick={onDisconnect}
          className="w-full px-3 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 hover:border-red-500/50 transition-all text-sm font-medium"
        >
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
};
