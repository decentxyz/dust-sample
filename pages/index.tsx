import { SolanaProviders } from "@/components/SolanaProviders";
import { BoxThemeProvider, darkTheme, DustSwapBox } from "@decent.xyz/the-box";
import { NavBar } from "@/components/NavBar";
import { DeGodsBanner } from "@/components/DeGodsBanner";

export default function BoxSplashPage() {
  return (
    <SolanaProviders>
      <NavBar />
      <DeGodsBanner />
      <div className="mx-auto max-w-md mt-56">
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
      </div>
    </SolanaProviders>
  );
}
