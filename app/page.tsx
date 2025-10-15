/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  ConnectButton,
  useAccount,
  useWallets,
  useDisconnect,
  usePublicClient,
} from "@particle-network/connectkit";
import { useState, useEffect } from "react";
import { Interface } from "ethers";
// Universal Accounts imports
import {
  UniversalAccount,
  type IAssetsResponse,
  CHAIN_ID,
  SUPPORTED_TOKEN_TYPE,
} from "@particle-network/universal-account-sdk";
// Components
import { Header } from "./components/Header";
import { AccountDetails } from "./components/AccountDetails";
import { FinancialOverview } from "./components/FinancialOverview";
import { TransferSection } from "./components/TransferSection";
import { ActionSection } from "./components/ActionSection";
// Utils
import { fetchEOABalances } from "./utils/balances";
import { transferEthToUA, transferUsdcToUA } from "./utils/transfers";

const App = () => {
  const [primaryWallet] = useWallets();
  const walletClient = primaryWallet?.getWalletClient();
  const publicClient = usePublicClient();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [universalAccountInstance, setUniversalAccountInstance] =
    useState<UniversalAccount | null>(null);
  const [accountInfo, setAccountInfo] = useState<{
    ownerAddress: string;
    evmSmartAccount: string;
    solanaSmartAccount: string;
  } | null>(null);
  const [eoaBalances, setEoaBalances] = useState<{
    native: string;
    erc20: string;
  } | null>(null);
  const [primaryAssets, setPrimaryAssets] = useState<IAssetsResponse | null>(
    null
  );
  const [txResult, setTxResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ============================================================
  // UNIVERSAL ACCOUNTS SDK: Initialize UniversalAccount
  // ============================================================
  useEffect(() => {
    if (isConnected && address) {
      // Create new UA instance when user connects
      const ua = new UniversalAccount({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        projectClientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
        projectAppUuid: process.env.NEXT_PUBLIC_APP_ID!,
        ownerAddress: address,
        // If not set it will use auto-slippage
        tradeConfig: {
          slippageBps: 100, // 1% slippage tolerance
          universalGas: false, // Prioritize PARTI token to pay for gas
          //usePrimaryTokens: [SUPPORTED_TOKEN_TYPE.SOL], // Specify token to use as source
        },
      });
      console.log("UniversalAccount initialized:", ua);
      setUniversalAccountInstance(ua);
    } else {
      // Reset UA when user disconnects
      setUniversalAccountInstance(null);
    }
  }, [isConnected, address]);

  // ============================================================
  // UNIVERSAL ACCOUNTS SDK: Fetch Universal Account Addresses
  // ============================================================
  useEffect(() => {
    if (!universalAccountInstance || !address) return;
    const fetchSmartAccountAddresses = async () => {
      // Get Universal Account addresses for both EVM and Solana
      const options = await universalAccountInstance.getSmartAccountOptions();
      setAccountInfo({
        ownerAddress: address, // EOA address
        evmSmartAccount: options.smartAccountAddress || "", // EVM Universal Account
        solanaSmartAccount: options.solanaSmartAccountAddress || "", // Solana Universal Account
      });
      console.log("Universal Account Options:", options);
    };
    fetchSmartAccountAddresses();
  }, [universalAccountInstance, address]);

  // ============================================================
  // UNIVERSAL ACCOUNTS SDK: Fetch Primary Assets
  // ============================================================
  useEffect(() => {
    if (!universalAccountInstance || !address) return;
    const fetchPrimaryAssets = async () => {
      // Get aggregated balance across all chains
      // This includes ETH, USDC, USDT, etc. on various chains
      const assets = await universalAccountInstance.getPrimaryAssets();
      if (assets.totalAmountInUSD < 0.5) {
        setPrimaryAssets({
          totalAmountInUSD: 0,
          assets: [],
        });
      } else {
        setPrimaryAssets(assets);
      }
    };
    fetchPrimaryAssets();
  }, [universalAccountInstance, address]);

  // ============================================================
  // UNIVERSAL ACCOUNTS SDK: Create and Send Universal Transaction
  // ============================================================
  const runTransaction = async () => {
    if (!universalAccountInstance) return;
    setIsLoading(true);
    setTxResult(null);

    const CONTRACT_ADDRESS = "0xdea7bF60E53CD578e3526F36eC431795f7EEbFe6"; // NFT contract on Avalanche

    try {
      const contractInterface = new Interface(["function mint() external"]);

      // Create Universal Transaction
      const transaction =
        await universalAccountInstance.createUniversalTransaction({
          chainId: CHAIN_ID.AVALANCHE_MAINNET,
          expectTokens: [],
          transactions: [
            {
              to: CONTRACT_ADDRESS,
              data: contractInterface.encodeFunctionData("mint"),
            },
          ],
        });

      // Sign the transaction
      const signature = await walletClient?.signMessage({
        account: address as `0x${string}`,
        message: { raw: transaction.rootHash },
      });

      // Send the transaction
      const result = await universalAccountInstance.sendTransaction(
        transaction,
        signature
      );

      setTxResult(
        `https://universalx.app/activity/details?id=${result.transactionId}`
      );
    } catch (error) {
      console.error("Transaction failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setTxResult(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch EOA Balances
  useEffect(() => {
    if (!publicClient || !address) return;
    const loadBalances = async () => {
      const balances = await fetchEOABalances(publicClient, address);
      setEoaBalances(balances);
    };
    loadBalances();
  }, [publicClient, address]);

  // Transfer handlers
  const handleTransferEth = async (amount: string) => {
    if (!walletClient || !accountInfo) return;
    await transferEthToUA(
      walletClient,
      address as string,
      accountInfo.evmSmartAccount,
      amount
    );
    // Refresh balances
    if (publicClient && address) {
      const balances = await fetchEOABalances(publicClient, address);
      setEoaBalances(balances);
    }
  };

  const handleTransferUsdc = async (amount: string) => {
    if (!walletClient || !accountInfo) return;
    await transferUsdcToUA(
      walletClient,
      address as string,
      accountInfo.evmSmartAccount,
      amount
    );
    // Refresh balances
    if (publicClient && address) {
      const balances = await fetchEOABalances(publicClient, address);
      setEoaBalances(balances);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-[#0A0A1A] to-[#1A0A2A] px-4 py-6 font-sans overflow-hidden">
      {/* Particle background effect */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, #8B5CF6 0%, transparent 30%), radial-gradient(circle at 80% 20%, #FACC15 0%, transparent 30%)",
        }}
      ></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-4">
        {/* Header Card */}
        <div className="bg-[#1F1F3A]/80 rounded-xl shadow-2xl p-4 md:p-5 border border-[#3A3A5A] backdrop-blur-sm">
          <Header />
        </div>

        {isConnected && (
          <>
            {/* Account & Balance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Account Details - Spans 1 column */}
              <div className="lg:col-span-1">
                <AccountDetails
                  address={address as string}
                  accountInfo={accountInfo}
                  onDisconnect={() => disconnect()}
                />
              </div>

              {/* Financial Overview - Spans 2 columns */}
              <div className="lg:col-span-2">
                <FinancialOverview
                  eoaBalances={eoaBalances}
                  universalBalanceUSD={primaryAssets?.totalAmountInUSD || 0}
                />
              </div>
            </div>

            {/* Transfer & Actions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Transfer Section */}
              <TransferSection
                onTransferEth={handleTransferEth}
                onTransferUsdc={handleTransferUsdc}
              />

              {/* Action Section */}
              <ActionSection
                onMintNFT={runTransaction}
                isLoading={isLoading}
                txResult={txResult}
              />
            </div>
          </>
        )}

        {!isConnected && (
          <div className="bg-[#1F1F3A]/80 rounded-xl shadow-2xl p-8 border border-[#3A3A5A] backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-center space-y-1.5">
                <h2 className="text-xl font-bold text-gray-200">Get Started</h2>
                <p className="text-gray-400 text-sm max-w-md">
                  Connect your wallet to access Universal Accounts and manage
                  your cross-chain assets
                </p>
              </div>
              <div className="w-56">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
