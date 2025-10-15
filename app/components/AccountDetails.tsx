"use client";

import { formatAddress } from "../utils/format";
import { useState } from "react";

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
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-[#1F1F3A]/80 rounded-xl shadow-2xl p-4 border border-[#3A3A5A] backdrop-blur-sm h-full flex flex-col">
      <div className="flex-1 space-y-3">
        <h3 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] mb-3">
          Account Details
        </h3>

        {/* Wallet Address */}
        <div className="bg-[#2A2A4A]/50 rounded-lg p-3 border border-[#4A4A6A]/50 hover:border-[#8B5CF6]/50 transition-colors">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              Wallet Address
            </div>
            <button
              onClick={() => copyToClipboard(address, "wallet")}
              className="p-1 hover:bg-[#8B5CF6]/20 rounded transition-colors"
              title="Copy address"
            >
              {copiedField === "wallet" ? (
                <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-gray-400 hover:text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
          <div className="font-mono text-gray-200 text-xs break-all">
            {formatAddress(address)}
          </div>
        </div>

        {/* EVM Universal Account */}
        {accountInfo && (
          <div className="bg-[#2A2A4A]/50 rounded-lg p-3 border border-[#4A4A6A]/50 hover:border-[#8B5CF6]/50 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                EVM Universal Account
              </div>
              <button
                onClick={() =>
                  copyToClipboard(accountInfo.evmSmartAccount, "evm")
                }
                className="p-1 hover:bg-[#8B5CF6]/20 rounded transition-colors"
                title="Copy address"
              >
                {copiedField === "evm" ? (
                  <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-gray-400 hover:text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="font-mono text-gray-200 text-xs break-all">
              {formatAddress(accountInfo.evmSmartAccount)}
            </div>
          </div>
        )}

        {/* SOL Universal Account */}
        {accountInfo && (
          <div className="bg-[#2A2A4A]/50 rounded-lg p-3 border border-[#4A4A6A]/50 hover:border-[#8B5CF6]/50 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                SOL Universal Account
              </div>
              <button
                onClick={() =>
                  copyToClipboard(accountInfo.solanaSmartAccount, "sol")
                }
                className="p-1 hover:bg-[#8B5CF6]/20 rounded transition-colors"
                title="Copy address"
              >
                {copiedField === "sol" ? (
                  <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-gray-400 hover:text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
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
