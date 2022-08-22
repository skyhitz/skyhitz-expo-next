// on Web, we skip loading fonts

import Head from "next/head";
import React from "react";

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Raleway-Light.ttf"
          as="font"
          crossOrigin=""
        />
        <style>{`
         @font-face {
         font-family: 'Raleway-Light';
         src: url('/fonts/Raleway-Light.ttf');
         }
       `}</style>
      </Head>
      {children}
    </>
  );
};
