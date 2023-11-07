import { Fragment } from "react";
import { NextSeo } from "next-seo";
import classes from "../pages.module.scss";
import BannerPattern from "@/components/BannerPattern";

export default function Biography() {
  return (
    <Fragment>
      <NextSeo
        title="زندگینامه"
        description="زندگینامه"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://jasbi.net/",
          siteName: "دکتر جاسبی",
        }}
      />
      <div className={classes.container}>
        <BannerPattern />
      </div>
    </Fragment>
  );
}
