import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import backgroundDesktop from "@/assets/backgroundDesktop.png";
import banner from "@/assets/banner.png";
import bullet from "@/assets/bullet.png";
import Timeline from "@/components/Timeline";
import Register from "@/components/Register";
import SendForm from "@/components/SendForm";
import { enToFaDigits, sliceString } from "@/services/utility";
import dbConnect from "@/services/dbConnect";
import academicModel from "@/models/Academic";
import publicationModel from "@/models/Publication";
import mediaModel from "@/models/Media";
import speachModel from "@/models/Speech";
import politicModel from "@/models/Politic";
import secureLocalStorage from "react-secure-storage";
import { NextSeo } from "next-seo";

export default function Home({
  timelineData,
  archiveArray,
  academics,
  politics,
  publications,
  media,
  speech,
}) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [displayRegister, setDisplayRegister] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const { screenSize, setScreenSize } = useContext(StateContext);

  const category = {
    academic: "پژوهشی و علمی",
    publications: "انتشارات",
    politics: "سیاسی و اجرایی",
  };

  const logOut = () => {
    secureLocalStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.assign("/");
  };

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
                src={banner}
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
        title="دکتر جاسبی"
        description="زندگینامه، دستاوردها و فعالیتهای دکتر جاسبی"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://jasbi.net/",
          siteName: "دکتر جاسبی",
        }}
      />
      <div className={classes.imageContainer}>
        {screenSize === "desktop" && (
          <div className={classes.imageBoxDesktop}>
            <Image
              className={classes.image}
              src={backgroundDesktop}
              placeholder="blur"
              alt="image"
              layout="fill"
              objectFit="cover"
              loading="eager"
            />
            <div className={classes.information}>
              <h3>آمار سایت</h3>
              <div className={classes.section}>
                <div className={classes.details}>
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                  />
                  <p>سیاسی و اجرایی</p>
                  <h2>
                    {enToFaDigits(
                      politics?.filter((item) => item.confirm).length
                    )}
                  </h2>
                </div>
                <div className={classes.details}>
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                  />
                  <p>پژوهشی و علمی</p>
                  <h2>
                    {enToFaDigits(
                      academics?.filter((item) => item.confirm).length
                    )}
                  </h2>
                </div>
                <div className={classes.details}>
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                  />
                  <p>انتشارات</p>
                  <h2>
                    {enToFaDigits(
                      publications?.filter((item) => item.confirm).length
                    )}
                  </h2>
                </div>
                <div className={classes.details}>
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                  />
                  <p>تصاویر</p>
                  <h2>
                    {enToFaDigits(media?.filter((item) => item.confirm).length)}
                  </h2>
                </div>
                <div className={classes.details}>
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                  />
                  <p>سخنرانی</p>
                  <h2>
                    {enToFaDigits(
                      speech?.filter((item) => item.confirm).length
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
        {screenSize !== "desktop" && (
          <Image
            className={classes.image}
            src={backgroundDesktop}
            placeholder="blur"
            alt="image"
            layout="fill"
            objectFit="cover"
            loading="eager"
          />
        )}
      </div>
      {screenSize !== "desktop" && (
        <div className={classes.information}>
          <h3>آمار سایت</h3>
          <div className={classes.section}>
            <div className={classes.details}>
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
              />
              <p>سیاسی و اجرایی</p>
              <h2>
                {enToFaDigits(politics?.filter((item) => item.confirm).length)}
              </h2>
            </div>
            <div className={classes.details}>
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
              />
              <p>پژوهشی و علمی</p>
              <h2>
                {enToFaDigits(academics?.filter((item) => item.confirm).length)}
              </h2>
            </div>
            <div className={classes.details}>
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
              />
              <p>انتشارات</p>
              <h2>
                {enToFaDigits(
                  publications?.filter((item) => item.confirm).length
                )}
              </h2>
            </div>
            <div className={classes.details}>
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
              />
              <p>تصاویر</p>
              <h2>
                {enToFaDigits(media?.filter((item) => item.confirm).length)}
              </h2>
            </div>
            <div className={classes.details}>
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
              />
              <p>سخنرانی</p>
              <h2>
                {enToFaDigits(speech?.filter((item) => item.confirm).length)}
              </h2>
            </div>
          </div>
        </div>
      )}
      <div className={classes.timeline}>
        <h2>سیر تاریخی</h2>
        <p>رویدادهای مهم و ماندگار</p>
        <Timeline timelineData={timelineData} />
      </div>
      <div className={classes.bannerContainer}>{generateBanner()}</div>
      <div className={classes.update}>
        <h2>آخرین به روزرسانی</h2>
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
                  {item.group && <p>{category[item.group]}</p>}
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
                      {sliceString(item.description, 120)}...
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
    const media = await mediaModel.find();
    const speech = await speachModel.find();

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
        academics: JSON.parse(JSON.stringify(academics)),
        politics: JSON.parse(JSON.stringify(politics)),
        publications: JSON.parse(JSON.stringify(publications)),
        media: JSON.parse(JSON.stringify(media)),
        speech: JSON.parse(JSON.stringify(speech)),
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
