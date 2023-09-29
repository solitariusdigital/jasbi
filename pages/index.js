import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import background from "@/assets/background.jpg";
import Timeline from "@/components/Timeline";
import Register from "@/components/Register";
import SendForm from "@/components/SendForm";
import { enToFaDigits } from "@/services/utility";
import MediaForm from "@/components/MediaForm";
import dbConnect from "@/services/dbConnect";
import academicModel from "@/models/Academic";
import publicationModel from "@/models/Publication";
import politicModel from "@/models/Politic";

export default function Home({ timelineData, archiveObject }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
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
            <h2>{enToFaDigits(53)}</h2>
          </div>
          <div className={classes.details}>
            <p>مقالات تحقیقی به زبان فارسی</p>
            <h2>{enToFaDigits(47)}</h2>
          </div>
          <div className={classes.details}>
            <p>کتب منتشر شده</p>
            <h2>{enToFaDigits(26)}</h2>
          </div>
          <div className={classes.details}>
            <p>تالیفات زیر نظر دکتر</p>
            <h2>{enToFaDigits(15)}</h2>
          </div>
          <div className={classes.details}>
            <p>تحقیقات و پژوهش های علمی</p>
            <h2>{enToFaDigits(14)}</h2>
          </div>
          <div className={classes.details}>
            <p>ترجمه ها</p>
            <h2>{enToFaDigits(24)}</h2>
          </div>
          <div className={classes.details}>
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
      <div className={classes.banners}>
        {archiveObject.academic?.map((item, index) => (
          <Fragment key={index}>
            {item.confirm && (
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
                      onClick={() => {
                        window.location.assign("/academic");
                      }}
                    />
                  </div>
                )}
                <div className={classes.info}>
                  <h3>{item.title}</h3>
                  <p>سال : {item.year} </p>
                  <p>
                    {item.description.slice(0, 150)} ...{" "}
                    <span
                      onClick={() => {
                        window.location.assign("/academic");
                      }}
                    >
                      بیشتر
                    </span>
                  </p>
                </div>
              </div>
            )}
          </Fragment>
        ))}
        {archiveObject.politics?.map((item, index) => (
          <Fragment key={index}>
            {item.confirm && (
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
                      onClick={() => {
                        window.location.assign("/politics");
                      }}
                    />
                  </div>
                )}
                <div className={classes.info}>
                  <h3>{item.title}</h3>
                  <p>سمت : {item.position}</p>
                  <p>فعالیت : {item.activity}</p>
                  <p>سال : {item.year} </p>
                  <p>
                    {item.description.slice(0, 150)} ...{" "}
                    <span
                      onClick={() => {
                        window.location.assign("/politics");
                      }}
                    >
                      بیشتر
                    </span>
                  </p>
                </div>
              </div>
            )}
          </Fragment>
        ))}
        {archiveObject.publications?.map((item, index) => (
          <Fragment key={index}>
            {item.confirm && (
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
                      onClick={() => {
                        window.location.assign("/publications");
                      }}
                    />
                  </div>
                )}
                <div className={classes.info}>
                  <h3>{item.title}</h3>
                  <p>گردآورنده : {item.author}</p>
                  {item.author !== "دکتر عبدالله جاسبی" && (
                    <p>زیر نظز : دکتر عبدالله جاسبی</p>
                  )}
                  <p>ناشر : {item.publisher}</p>
                  <p>سال چاپ : {item.year} </p>
                  <p>
                    {item.description.slice(0, 150)} ...{" "}
                    <span
                      onClick={() => {
                        window.location.assign("/publications");
                      }}
                    >
                      بیشتر
                    </span>
                  </p>
                </div>
              </div>
            )}
          </Fragment>
        ))}
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
      {permissionControl && (
        <div className={classes.uploadForm}>
          <button onClick={() => setMediaform(!mediaForm)}>
            بارگذاری رسانه ​
          </button>
          <p className="message">بارگذاری عکس و ویدئو</p>
          {mediaForm && <MediaForm />}
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

    academics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    politics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    politics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const archiveArray = [...academics, ...politics, ...publications];
    const archiveObject = {
      academic: [...academics.filter((item) => item.confirm).slice(0, 3)],
      politics: [...politics.filter((item) => item.confirm).slice(0, 3)],
      publications: [
        ...publications.filter((item) => item.confirm).slice(0, 3),
      ],
    };

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
        archiveObject: JSON.parse(JSON.stringify(archiveObject)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
