# Decent The Box - Dust Version

This repository contains a working example of **The Box**. You can see the
[deployed version here](https://dust-sample.vercel.app/).

## Getting Started With This Repository

### Clone this repository:

```
git clone https://github.com/decentxyz/dust-sample
```

### Install dependencies

```
cd dust-sample
npm i
```

### Set the appropriate environment variablesA

Create a `.env.local` file with the corresponding env variables. To get this repo
to work, you need:

1. An API key from us.
2. An RPC for Solana, we recommend [quicknode's API's](https://www.quicknode.com/).

```
NEXT_PUBLIC_DECENT_API_KEY=<your-api-key>
NEXT_PUBLIC_RPC_SOLANA_MAINNET=<rpc-solana-mainnet>
```

For the EVM rpc's this repository by default makes use of public RPC's. However, you
can provide your own RPC's in case that the public ones get rate-limited. You can
pass those in as environment variables. Refer to [this file](.env.example) for all
possible options for env vars.

### Run Development Server

The rest is just good ol' NextJS stuff. Just run

```
npm run dev
```

And you should be able to see the application at `http://localhost:3000`.

## Using The Box in your Own Codebase

### Installing The-Box from the tarfile

To install from the tarfile, you can simply do `npm i /path/to/tarfile.tgz`. The
tarfile for the custom package is located in this repository at
[here](decent.xyz-the-box-1.0.5.tgz).

```
npm i path/to/decent.xyz-the-box-1.0.5.tgz
```

After that you should be able to see our package in your `package.json` file.
This repository's `package.json` file already includes **The Box** as a dependency.
You can see it at [this line](package.json#L13):

```
  "dependencies": {
    //
    "@decent.xyz/the-box": "file:decent.xyz-the-box-1.0.5.tgz",
    //
  }
```

### Importing The Box's CSS styles

Add these imports to your `_app.tsx` file.

```
import "@decent.xyz/the-box/dist/the-box-base.css";
import "@decent.xyz/the-box/dist/dark.css";
import "@decent.xyz/the-box/dist/font.woff2.css";
```

### Setting up Wagmi

```
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { BoxEvmChains } from "@decent.xyz/the-box";
import { publicProvider } from "wagmi/providers/public";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

const { chains, publicClient } = configureChains(BoxEvmChains, [
  // you can add your own providers here too.
  publicProvider(),
]);

const projectId = process.env["PROJECT_ID"] || "our-id";
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [metaMaskWallet({ projectId, chains })],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

```

Then wrap your app in Wagmi's provider.

```
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
```

## Setting up Solana Wallet SDK

Process is very similar to setting up Wagmi.

```
import { PropsWithChildren, useMemo } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Mainnet;

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network],
  );

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_SOLANA_MAINNET!}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
```

## Using Wagmi & Solana Wallet SDK together

You can just wrap your application in both of the providers from each library, and
have it at your `_app.tsx` file.

```
// imports

// setup code

export default function App({ Component, pageProps }: AppProps) {

  // setup code

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_SOLANA_MAINNET!}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WagmiConfig config={wagmiConfig}>
            <Component {...pageProps} />
          </WagmiConfig>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
```

## Using The Box

After that you can make use of our box anywhere in your app.

```
import { BoxThemeProvider, darkTheme, DustSwapBox } from "@decent.xyz/the-box";

export const SomeComponentInYourApp = () => {
  return (
    <BoxThemeProvider theme={darkTheme}>
      <DustSwapBox
        className="rounded-lg"
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
        footerSlot={
          <div className="text-gray-400 text-sm p-4">
            powered by{" "}
            <img
              src="/logo-with-text-white.png"
              alt="Decent"
              className="inline h-4"
            />
          </div>
        }
      />
    </BoxThemeProvider>
  );
}
```
