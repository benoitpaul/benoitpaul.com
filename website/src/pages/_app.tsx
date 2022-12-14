import { useState } from "react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import Script from "next/script";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";
import "../styles/prism-night-owl.css";

type MyAppProps = {
  isProduction: boolean;
};

function MyApp({ Component, pageProps, isProduction }: AppProps & MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  console.log({ isProduction });
  return (
    <>
      {isProduction && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NKSVPLZ');`}</Script>
      )}

      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<MyAppProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx, isProduction: process.env.NODE_ENV === "production" };
};

export default MyApp;
