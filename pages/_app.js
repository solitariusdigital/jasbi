import { useState, useEffect } from "react";
import Layout from "../components/RootLayout";
import { StateProvider } from "../context/stateContext";
import Router from "next/router";
import { DefaultSeo } from "next-seo";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <Layout>
        <DefaultSeo
          title="دکتر عبدالله جاسبی"
          description="Biography"
          openGraph={{
            type: "website",
            locale: "fa_IR",
            url: "https://jasbi.com/",
            siteName: "دکتر عبدالله جاسبی",
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}
