import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import background from "@/assets/background.jpg";
import Timeline from "@/components/Timeline";
import Register from "@/components/Register";
import SendForm from "@/components/SendForm";

export default function Home() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [displayRegister, setDisplayRegister] = useState(false);

  return (
    <>
      <div className={classes.heroHeader}>
        <div className={classes.intro}>
          <h1>دکتر جاسبی</h1>
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
      <div className={classes.information}>
        <div className={classes.card}>
          <div className={classes.details}>دانشگاه</div>
          <div className={classes.details}>انقلاب</div>
          <div className={classes.details}>اسلامی</div>
          <div className={classes.details}>فرهنگی</div>
          <div className={classes.details}>تأسیس</div>
          <div className={classes.details}>جمهوری</div>
          <div className={classes.details}>سیاستمدار</div>
        </div>
      </div>
      <div className={classes.timeline}>
        <h2>سیر تاریخی</h2>
        <p>رویدادهای مهم و ماندگار</p>
        <Timeline />
      </div>
      <div className={classes.banners}>
        <div className={classes.card}>دانشگاه</div>
        <div className={classes.card}>انقلاب</div>
        <div className={classes.card}>اسلامی</div>
        <div className={classes.card}>فرهنگی</div>
        <div className={classes.card}>تأسیس</div>
        <div className={classes.card}>جمهوری</div>
        <div className={classes.card}>سیاستمدار</div>
      </div>
      <div className={classes.register}>
        {!displayRegister && (
          <Fragment>
            <button onClick={() => setDisplayRegister(true)}>
              ارتباط با دکتر جاسبی ​
            </button>
            <p className="message">
              ارتباط با دکتر جاسبی برای ارسال خاطرات و مستندات
            </p>
          </Fragment>
        )}
        {displayRegister && !currentUser && <Register />}
        {displayRegister && currentUser && <SendForm />}
      </div>
    </>
  );
}
