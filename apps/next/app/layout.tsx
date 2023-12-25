import { Config } from "app/config";
import type { Metadata } from "next";
import React from "react";
import "raf/polyfill";
import "../global";
import { GoogleTagManager } from "@next/third-parties/google";
import { Provider } from "app/provider";
import { WebNavigation } from "app/navigation/web";

const description =
  "Upload, buy or sell music NFTs on the Stellar Network. Join a music community of beatmakers!";

export const metadata: Metadata = {
  title: "Skyhitz - Music NFT marketplace on Stellar",
  description,
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  keywords:
    "stellar, xlm, mfts, crypto, music nfts, beats market, beats website, lofi beats, fresh beats, music creators, exclusive beats for sale",
  twitter: {
    site: "@skyhitz",
    card: "summary",
  },
  openGraph: {
    siteName: "Skyhitz",
    title: "Skyhitz",
    description,
    type: "website",
    images: [`${Config.APP_URL}/skyhitz.png`],
    url: "https://skyhitz.io",
  },
  themeColor: "#000",
  other: {
    "fb:app_id": "564403243666491",
    "p:domain_verify": "418ab0845b3db4cf3f4c9efe8ad0f80e",
  },
  alternates: {
    canonical: "https://skyhitz.io",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("hello");
  return (
    <html lang="en">
      <body>
        <Provider>
          <WebNavigation>{children}</WebNavigation>
        </Provider>
        <GoogleTagManager gtmId="GTM-5HR7H3L" />
      </body>
    </html>
  );
}
