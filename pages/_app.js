import Layout from "../components/RootLayout";
import { StateProvider } from "../context/stateContext";
import { DefaultSeo } from "next-seo";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <Layout>
        <DefaultSeo
          title="دکتر جاسبی"
          description="زندگینامه، دستاوردها و فعالیتهای دکتر جاسبی"
          openGraph={{
            type: "website",
            locale: "fa_IR",
            url: "https://jasbi.com/",
            siteName: "دکتر جاسبی",
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}
