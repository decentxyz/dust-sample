import clsx from "clsx";
import Image from "next/image";
import { ClientRendered } from "@/util/nextHelpers";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

export const NavBar = () => {
  return (
    <nav
      className={clsx(
        "flex flex-wrap items-center justify-end gap-1",
        "fixed inset-0 bottom-auto z-10",
        "my-8 mx-4 md:mx-20",
      )}
    >
      <Image
        className="mr-auto"
        width={132}
        height={33}
        alt="dust labs"
        src="/dust.png"
      />
      <ClientRendered>
        <WalletMultiButton />
      </ClientRendered>
      <RainbowConnectButton />
    </nav>
  );
};
