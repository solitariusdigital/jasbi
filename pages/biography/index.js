import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import { NextSeo } from "next-seo";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import pattern from "@/assets/pattern.png";

export default function Biography() {
  const { screenSize, setScreenSize } = useContext(StateContext);

  const generateBanner = () => {
    let length = 0;
    switch (screenSize) {
      case "desktop":
        length = 4;
        break;
      case "tablet":
        length = 3;
        break;
      case "mobile":
        length = 1;
        break;
    }
    return (
      <Fragment>
        {Array.from(Array(length)).map((item, index) => {
          return (
            <div key={index} className={classes.image}>
              <Image
                src={pattern}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                loading="eager"
              />
            </div>
          );
        })}
      </Fragment>
    );
  };

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
        <div className={classes.bannerContainer}>{generateBanner()}</div>
      </div>
    </Fragment>
  );
}
