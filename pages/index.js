import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import background from "@/assets/background.jpg";
import Timeline from "@/components/Timeline";
import Register from "@/components/Register";
import SendForm from "@/components/SendForm";
import { toFarsiNumber } from "@/services/utility";
import MediaForm from "@/components/MediaForm";

export default function Home() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [displayRegister, setDisplayRegister] = useState(false);
  const [mediaForm, setMediaform] = useState(false);

  return (
    <Fragment>
      <div className={classes.heroHeader}>
        <div className={classes.information}>
          عبدالله جعفر علی جاسبی سیاستمدار میانه‌رو و ارائه دهنده پیشنهاد تشکیل
          دانشگاه آزاد اسلامی و رئیس این دانشگاه از ابتدای تأسیس آن در سال ۱۳۶۱
          تا دی ۱۳۹۰ بود و در حال حاضر عضو هیئت مؤسس و هیئت امنای دانشگاه آزاد
          اسلامی است. وی همچنین استاد بازنشسته دانشگاه علم و صنعت ایران، عضو
          سابق شورای عالی انقلاب فرهنگی و کاندیدای دوره‌های ششم و هشتم ریاست
          جمهوری بوده‌است. جاسبی در سال ۱۳۹۴ یک سازمان مردم نهاد به نام بنیاد
          آفرینش اُنس که در زمینه گسترش و تعاملات صاحب‌نظران و اندیشمندان دارای
          نقد سازنده و هماهنگ‌سازی و افزایش نقش و تأثیر سمن‌ها، تشکل‌ها،
          انجمن‌ها و نهادهای علمی پژوهشی کشور فعال است، راه اندازی نمود و در حال
          حاضر رئیس هیئت امنا و مدیرعامل این بنیاد می‌باشد. او دانشمند تمام عیار
          در ایران است
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
          <br />
          <div className={classes.details}>
            <p>سوابق اجرایی</p>
            <h2>{toFarsiNumber(53)}</h2>
          </div>
          <div className={classes.details}>
            <p>مقالات تحقیقی به زبان فارسی</p>
            <h2>{toFarsiNumber(47)}</h2>
          </div>
          <div className={classes.details}>
            <p>کتب منتشر شده</p>
            <h2>{toFarsiNumber(26)}</h2>
          </div>
          <div className={classes.details}>
            <p>تالیفات زیر نظر دکتر</p>
            <h2>{toFarsiNumber(15)}</h2>
          </div>
          <div className={classes.details}>
            <p>تحقیقات و پژوهش های علمی</p>
            <h2>{toFarsiNumber(14)}</h2>
          </div>
          <div className={classes.details}>
            <p>ترجمه ها</p>
            <h2>{toFarsiNumber(24)}</h2>
          </div>
          <div className={classes.details}>
            <p>سخنرانی ها</p>
            <h2>{toFarsiNumber(49)}</h2>
          </div>
        </div>
        <div className={classes.imageContainerMobile}>
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
      <div className={classes.uploadForm}>
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
      <div className={classes.uploadForm}>
        <Fragment>
          <button onClick={() => setMediaform(!mediaForm)}>
            بارگذاری رسانه ​
          </button>
          <p className="message">بارگذاری عکس و ویدئو</p>
          {mediaForm && <MediaForm />}
        </Fragment>
      </div>
    </Fragment>
  );
}
