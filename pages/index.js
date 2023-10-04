import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import background from "@/assets/background.jpg";
import banner from "@/assets/banner.png";
import bullet from "@/assets/bullet.png";
import Timeline from "@/components/Timeline";
import Register from "@/components/Register";
import SendForm from "@/components/SendForm";
import { enToFaDigits } from "@/services/utility";
import MediaForm from "@/components/MediaForm";
import dbConnect from "@/services/dbConnect";
import academicModel from "@/models/Academic";
import publicationModel from "@/models/Publication";
import politicModel from "@/models/Politic";
import secureLocalStorage from "react-secure-storage";

export default function Home({ timelineData, archiveArray }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [displayRegister, setDisplayRegister] = useState(false);
  const [mediaForm, setMediaform] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet" || "mobile"
  );

  const handleResize = () => {
    if (window.innerWidth < 700) {
      setScreenSize("mobile");
    } else if (window.innerWidth > 700 && window.innerWidth < 1200) {
      setScreenSize("tablet");
    } else {
      setScreenSize("desktop");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const logOut = () => {
    secureLocalStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.assign("/");
  };

  const generateBanner = () => {
    let length = 0;
    let objectFit = "contain";
    switch (screenSize) {
      case "desktop":
        length = 4;
        objectFit = "contain";
        break;
      case "tablet":
        length = 2;
        objectFit = "cover";
        break;
      case "mobile":
        length = 1;
        objectFit = "cover";
        break;
    }
    return (
      <Fragment>
        {Array.from(Array(length)).map((item, index) => {
          return (
            <div key={index} className={classes.image}>
              <Image
                src={banner}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit={objectFit}
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
      <div className={classes.bannerContainer}>{generateBanner()}</div>
      <div className={classes.heroHeader}>
        <div className={classes.informationBio}>
          عبدالله جعفر علی جاسبی سیاستمدار میانه‌رو و ارائه دهنده پیشنهاد تشکیل
          دانشگاه آزاد اسلامی و رئیس این دانشگاه از ابتدای تأسیس آن در سال ۱۳۶۱
          تا دی ۱۳۹۰ بود و در حال حاضر عضو هیئت مؤسس و هیئت امنای دانشگاه آزاد
          اسلامی است. وی همچنین استاد بازنشسته دانشگاه علم و صنعت ایران، عضو
          سابق شورای عالی انقلاب فرهنگی و کاندیدای دوره‌های ششم و هشتم ریاست
          جمهوری بوده‌ است. جاسبی در سال ۱۳۹۴ یک سازمان مردم نهاد به نام بنیاد
          آفرینش اُنس که در زمینه گسترش و تعاملات صاحب‌نظران و اندیشمندان دارای
          نقد سازنده و هماهنگ سازی و افزایش نقش و تأثیر سمن‌ها، تشکل‌ها،
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
            <Image
              className={classes.image}
              src={bullet}
              placeholder="blur"
              alt="image"
              width={70}
              height={70}
              loading="eager"
            />
            <p>سوابق اجرایی</p>
            <h2>{enToFaDigits(53)}</h2>
          </div>
          <div className={classes.details}>
            <Image
              className={classes.image}
              src={bullet}
              placeholder="blur"
              alt="image"
              width={70}
              height={70}
              loading="eager"
            />
            <p>مقالات تحقیقی به زبان فارسی</p>
            <h2>{enToFaDigits(47)}</h2>
          </div>
          <div className={classes.details}>
            <Image
              className={classes.image}
              src={bullet}
              placeholder="blur"
              alt="image"
              width={70}
              height={70}
              loading="eager"
            />
            <p>کتب منتشر شده</p>
            <h2>{enToFaDigits(26)}</h2>
          </div>
          <div className={classes.details}>
            <Image
              className={classes.image}
              src={bullet}
              placeholder="blur"
              alt="image"
              width={70}
              height={70}
              loading="eager"
            />
            <p>تالیفات زیر نظر دکتر</p>
            <h2>{enToFaDigits(15)}</h2>
          </div>
          <div className={classes.details}>
            <Image
              className={classes.image}
              src={bullet}
              placeholder="blur"
              alt="image"
              width={70}
              height={70}
              loading="eager"
            />
            <p>تحقیقات و پژوهش های علمی</p>
            <h2>{enToFaDigits(14)}</h2>
          </div>
          <div className={classes.details}>
            <Image
              className={classes.image}
              src={bullet}
              placeholder="blur"
              alt="image"
              width={70}
              height={70}
              loading="eager"
            />
            <p>ترجمه ها</p>
            <h2>{enToFaDigits(24)}</h2>
          </div>
          <div className={classes.details}>
            <Image
              className={classes.image}
              src={bullet}
              placeholder="blur"
              alt="image"
              width={70}
              height={70}
              loading="eager"
            />
            <p>سخنرانی ها</p>
            <h2>{enToFaDigits(49)}</h2>
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
        <Timeline timelineData={timelineData} />
      </div>
      <div className={classes.cardGrid}>
        {archiveArray
          .filter((item) => item.confirm)
          .map((item, index) => (
            <Fragment key={index}>
              <div className={classes.card}>
                {item.image && (
                  <div className={classes.imageContainer}>
                    <Image
                      className={classes.image}
                      src={item.image}
                      placeholder="blur"
                      blurDataURL={item.image}
                      alt="image"
                      loading="eager"
                      objectFit="cover"
                      layout="fill"
                      priority
                      onClick={() => setExpandedItem(item["_id"])}
                    />
                  </div>
                )}
                <div className={classes.info}>
                  <h3>{item.title}</h3>
                  {item.author && (
                    <Fragment>
                      <p>گردآورنده : {item.author}</p>
                      {item.author !== "دکتر عبدالله جاسبی" && (
                        <p>زیر نظز : دکتر عبدالله جاسبی</p>
                      )}
                    </Fragment>
                  )}
                  {item.publisher && <p>ناشر : {item.publisher}</p>}
                  {item.position && <p>سمت : {item.position}</p>}
                  {item.activity && <p>فعالیت : {item.activity}</p>}
                  <p>سال : {enToFaDigits(item.year)} </p>
                  {expandedItem === item["_id"] ? (
                    <p>{item.description}</p>
                  ) : (
                    <p>
                      {item.description.slice(0, 100)} ...{" "}
                      <span onClick={() => setExpandedItem(item["_id"])}>
                        بیشتر
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </Fragment>
          ))
          .slice(0, 9)}
      </div>
      <div className={classes.uploadForm}>
        {!displayRegister && (
          <p className="message">
            ارتباط با دکتر جاسبی برای ارسال خاطرات و مستندات
          </p>
        )}
        <button onClick={() => setDisplayRegister(!displayRegister)}>
          {!displayRegister ? "ارتباط با دکتر جاسبی" : "برگشت"}
        </button>
        {displayRegister && !currentUser && <Register />}
        {displayRegister && currentUser && <SendForm />}
      </div>
      {permissionControl && (
        <div className={classes.uploadForm}>
          <p className="message">بارگذاری عکس و ویدئو</p>
          <button onClick={() => setMediaform(!mediaForm)}>
            {!mediaForm ? "بارگذاری رسانه" : "برگشت"}​
          </button>
          {mediaForm && <MediaForm />}
        </div>
      )}
      {currentUser && (
        <div className={classes.logout} onClick={() => logOut()}>
          <p>خروج</p>
        </div>
      )}
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const academics = await academicModel.find();
    const politics = await politicModel.find();
    const publications = await publicationModel.find();

    const archiveArray = [...academics, ...politics, ...publications].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    let years = archiveArray.map((item) => {
      return item.year;
    });
    let sortedYears = [...new Set(years)].sort((a, b) => {
      return a - b;
    });

    const timelineData = [];
    sortedYears.forEach((year) => {
      const dataObj1 = academics.filter((obj) => obj.year === year);
      const dataObj2 = politics.filter((obj) => obj.year === year);
      const dataObj3 = publications.filter((obj) => obj.year === year);
      const combined = {
        year: year,
        data: [...dataObj1, ...dataObj2, ...dataObj3],
        active: false,
      };
      timelineData.push(combined);
    });

    return {
      props: {
        timelineData: JSON.parse(JSON.stringify(timelineData)),
        archiveArray: JSON.parse(JSON.stringify(archiveArray)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
