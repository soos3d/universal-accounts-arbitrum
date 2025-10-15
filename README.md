# Universal Accounts on Avalanche Demo

A demo application showcasing how to build cross-chain dApps on Avalanche using Particle Network's Universal Accounts.

> [Universal Accounts Documentation](https://developers.particle.network/universal-accounts/cha/overview)

The purpose of this specific demo is to show how to use Universal Accounts to mint an NFT on Avalanche using funds from any supported blockchain. Plus it shows how to identify and transfer assets from your EOA to your Universal Account in one click.

## What are Universal Accounts?

Universal Accounts by Particle Network enable users to interact with any blockchain using a single account and balance. Instead of managing separate wallets and bridging assets between chains, users can:

- **Use funds from any chain** to pay for transactions on any other chain
- **Maintain a single account** across all supported blockchains (EVM and Solana)
- **Experience seamless cross-chain interactions** without manual bridging or complex workflows
- **Pay gas fees with any token** from any chain in their portfolio

## Key Benefits

### For Users
- **No more bridging**: Use your USDC on Base to mint an NFT on Avalanche directly 
- **Unified balance**: See your total assets across all chains in one place
- **Single account**: One address to manage, regardless of which chain you're using
- **Flexible gas payments**: Pay transaction fees with whatever tokens you have available

### For Developers
- **Simplified UX**: Remove the complexity of multi-chain interactions from your dApp
- **Broader user base**: Users don't need native tokens on your chain to use your dApp
- **Easy integration**: Simple SDK with just a few lines of code
- **Cross-chain by default**: Build applications that work across all supported chains


## Quick Start

### Prerequisites

- A Particle Network project ([Get one here](https://dashboard.particle.network))
- A WalletConnect project ID ([Get one here](https://cloud.reown.com))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/soos3d/universal-accounts-avalanche.git
cd universal-accounts-avalanche
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure environment variables**

Rename `.env.sample` to `.env.local` and fill in your credentials:

```env
NEXT_PUBLIC_PROJECT_ID=your_particle_project_id
NEXT_PUBLIC_CLIENT_KEY=your_particle_client_key
NEXT_PUBLIC_APP_ID=your_particle_app_id
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

4. **Run the application**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the demo in action!

## How It Works

This demo showcases the Universal Accounts SDK integration in a clean, easy-to-understand structure:

### Core Universal Accounts Operations

The main page (`app/page.tsx`) demonstrates four key Universal Accounts SDK operations:

1. **Initialize UniversalAccount**
   ```typescript
   const ua = new UniversalAccount({
     projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
     projectClientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
     projectAppUuid: process.env.NEXT_PUBLIC_APP_ID!,
     ownerAddress: address,
     tradeConfig: {
       slippageBps: 100, // 1% slippage tolerance
       universalGas: false,
       usePrimaryTokens: [SUPPORTED_TOKEN_TYPE.SOL],
     },
   });
   ```

2. **Fetch Universal Account Addresses**
   ```typescript
   const options = await universalAccountInstance.getSmartAccountOptions();
   // Returns EVM and Solana smart account addresses
   ```

3. **Get Aggregated Balance**
   ```typescript
   const assets = await universalAccountInstance.getPrimaryAssets();
   // Returns total balance in USD across all chains
   ```

4. **Create and Send Cross-Chain Transaction**
   ```typescript
   // Create transaction for Avalanche
   const transaction = await universalAccountInstance.createUniversalTransaction({
     chainId: CHAIN_ID.AVALANCHE_MAINNET,
     expectTokens: [],
     transactions: [{ to: CONTRACT_ADDRESS, data: encodedData }],
   });
   
   // Sign and send
   const signature = await walletClient.signMessage({ message: { raw: transaction.rootHash } });
   const result = await universalAccountInstance.sendTransaction(transaction, signature);
   ```

### Project Structure

```
app/
├── page.tsx                    # Main page - Universal Accounts SDK logic
├── ConnectKit.tsx             # Particle ConnectKit configuration
├── components/
│   ├── Header.tsx             # App header with logos
│   ├── AccountDetails.tsx     # Display wallet and UA addresses
│   ├── FinancialOverview.tsx  # Show balances
│   ├── TransferSection.tsx    # Transfer ETH/USDC to UA
│   └── ActionSection.tsx      # NFT minting button
└── utils/
    ├── format.ts              # Address formatting
    ├── balances.ts            # Balance fetching logic
    └── transfers.ts           # Transfer functions
```

## Use Cases

Universal Accounts unlock powerful cross-chain scenarios:

- **NFT Marketplaces**: Users can buy NFTs on any chain using funds from their preferred chain
- **DeFi Protocols**: Access liquidity pools on Avalanche using assets from Ethereum, Base, or Solana
- **Gaming**: Purchase in-game items on one chain while holding assets on another
- **DAOs**: Participate in governance across multiple chains with a single account
- **Cross-chain Swaps**: Trade assets without manual bridging or multiple transactions

## Learn More

- [Universal Accounts Documentation](https://developers.particle.network/universal-accounts/cha/overview)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
