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
    <Fragment>
      <div className={classes.heroHeader}>
        <div className={classes.information}>
          <div className={classes.details}>
            عبدالله جعفر علی جاسبی سیاستمدار میانه‌رو و ارائه دهنده پیشنهاد
            تشکیل دانشگاه آزاد اسلامی و رئیس این دانشگاه از ابتدای تأسیس آن در
            سال ۱۳۶۱ تا دی ۱۳۹۰ بود و در حال حاضر عضو هیئت مؤسس و هیئت امنای
            دانشگاه آزاد اسلامی است. وی همچنین استاد بازنشسته دانشگاه علم و صنعت
            ایران، عضو سابق شورای عالی انقلاب فرهنگی و کاندیدای دوره‌های ششم و
            هشتم ریاست جمهوری بوده‌است. جاسبی در سال ۱۳۹۴ یک سازمان مردم نهاد به
            نام بنیاد آفرینش اُنس که در زمینه گسترش و تعاملات صاحب‌نظران و
            اندیشمندان دارای نقد سازنده و هماهنگ‌سازی و افزایش نقش و تأثیر
            سمن‌ها، تشکل‌ها، انجمن‌ها و نهادهای علمی پژوهشی کشور فعال است، راه
            اندازی نمود و در حال حاضر رئیس هیئت امنا و مدیرعامل این بنیاد
            می‌باشد. او دانشمند تمام عیار در ایران است
          </div>
        </div>
        <div className={classes.imageContainer}>
          <Image
            className={classes.image}
            src={background}
            placeholder="blur"
            alt="image"
            layout="fill"
            objectFit="cover"
            loading="eager"
          />
        </div>
        <div className={classes.information}>
          <h1>دکتر جاسبی</h1>
          <div className={classes.details}>
            لیسانس مهندسی صنایع، دانشگاه علم و صنعت ایران
          </div>
          <div className={classes.details}>
            فوق لیسانس مدیریت صنعتی، دانشگاه آستون، بیرمنگام، انگلستان
          </div>
          <div className={classes.details}>
            دکترای مدیریت تولید و فناوری، دانشگاه آستون، بیرمنگام، انگلستان
          </div>
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
    </Fragment>
  );
}
