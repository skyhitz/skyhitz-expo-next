import { Provider } from "app/provider";
import Head from "next/head";
import React from "react";
import type { SolitoAppProps } from "solito";
import "raf/polyfill";
import { WebNavigation } from "app/navigation/web";
import "../toast-style.css";
import { CloseButtonProps, ToastContainer } from "react-toastify";
import X from "app/ui/icons/x";
import { Pressable } from "react-native";

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Skyhitz</title>
        <meta
          name="description"
          content="Upload, buy or sell music NFTs on the Stellar Network. Join a music community of beatmakers!"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Provider>
        <WebNavigation>
          <Component {...pageProps} />
        </WebNavigation>
        <ToastContainer
          position="bottom-right"
          icon={false}
          hideProgressBar={true}
          theme="colored"
          closeButton={CloseButton}
        />
      </Provider>
    </>
  );
}

function CloseButton(props: CloseButtonProps) {
  return (
    <Pressable onPress={() => props.closeToast}>
      <X color="white" size={20} />
    </Pressable>
  );
}

export default MyApp;
