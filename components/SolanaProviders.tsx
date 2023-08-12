import { PropsWithChildren, useMemo } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const SolanaProviders = ({ children }: PropsWithChildren) => {
  const network = WalletAdapterNetwork.Mainnet;

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network],
  );

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_SOLANA_MAINNET!}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
