import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import background from "@/assets/background.jpg";
import Timeline from "@/components/Timeline";

export default function Home() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);

  return (
    <Fragment>
      <div className={classes.heroHeader}>
        <div className={classes.intro}>
          <h1>پروفسور جاسبی</h1>
        </div>
        <Image
          className={classes.heroImage}
          src={background}
          placeholder="blur"
          alt="image"
          layout="fill"
          objectFit="cover"
          loading="eager"
        />
      </div>
      <div className={classes.timeline}>
        <h2>سیر تاریخی</h2>
        <p>رویدادهای مهم و ماندگار</p>
        <Timeline />
      </div>
      <div className={classes.banners}>
        <div>دانشگاه</div>
        <div>بازنشسته</div>
        <div>اسلامی</div>
        <div>فرهنگی</div>
        <div>تأسیس</div>
        <div>جمهوری</div>
        <div>سیاستمدار</div>
      </div>
    </Fragment>
  );
}
