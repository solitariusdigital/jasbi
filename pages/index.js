import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import background from "@/assets/background.jpg";
import Menu from "@/components/Menu";

export default function Home() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);

  return (
    <Fragment>
      <div className={classes.heroHeader}>
        <div className={classes.intro}>
          <h1>عبدالله جاسبی</h1>
          <p>
            عبدالله جعفر علی جاسبی (۱۳۲۳، تهران) سیاستمدار میانه‌رو (با گرایش
            اصولگرایی)[۱] و ارائه دهنده پیشنهاد تشکیل دانشگاه آزاد اسلامی و رئیس
            این دانشگاه از ابتدای تأسیس آن در سال ۱۳۶۱ تا دی ۱۳۹۰ بود و در حال
            حاضر عضو هیئت مؤسس و هیئت امنای دانشگاه آزاد اسلامی است. وی همچنین
            استاد بازنشسته دانشگاه علم و صنعت ایران، عضو سابق شورای عالی انقلاب
            فرهنگی و کاندیدای دوره‌های ششم و هشتم ریاست جمهوری بوده‌است
          </p>
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
    </Fragment>
  );
}
