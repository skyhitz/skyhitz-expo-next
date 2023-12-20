import { Provider } from "app/provider";
import React from "react";
import type { SolitoAppProps } from "solito";
import "raf/polyfill";
import { WebNavigation } from "app/navigation/web";
import "../global";

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Provider>
        <WebNavigation>
          <Component {...pageProps} />
        </WebNavigation>
      </Provider>
    </>
  );
}

export default MyApp;
