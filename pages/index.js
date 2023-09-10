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
        <div>زندگینامه</div>
        <div>رزومه</div>
      </div>
      <div className={classes.timeline}>
        <h2>سیر تاریخی</h2>
        <p>رویدادهای مهم و ماندگار</p>
        <Timeline />
      </div>
      <div className={classes.banners}>
        <div>دانشگاه</div>
        <div>انقلاب</div>
        <div>اسلامی</div>
        <div>فرهنگی</div>
        <div>تأسیس</div>
        <div>جمهوری</div>
        <div>سیاستمدار</div>
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
