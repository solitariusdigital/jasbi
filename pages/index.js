import { useState, useContext, Fragment } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import banner from "@/assets/banner.png";
import bullet from "@/assets/bullet.png";
import Timeline from "@/components/Timeline";
import { enToFaDigits, sliceString, uploadImage } from "@/services/utility";
import dbConnect from "@/services/dbConnect";
import academicModel from "@/models/Academic";
import publicationModel from "@/models/Publication";
import mediaModel from "@/models/Media";
import speachModel from "@/models/Speech";
import biographyModel from "@/models/Biography";
import politicModel from "@/models/Politic";
import { NextSeo } from "next-seo";
import Router from "next/router";
import loaderImage from "@/assets/loader.png";

export default function Home({
  timelineData,
  archiveArray,
  academics,
  politics,
  publications,
  media,
  speech,
  biography,
}) {
  const [expandedItem, setExpandedItem] = useState(null);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [image, setImage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);

  const category = {
    academic: "پژوهشی و علمی",
    publications: "انتشارات",
    politics: "سیاسی و اجرایی",
    biography: "زندگینامه",
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

  const activateNav = (link) => {
    navigationTopBar.map((nav) => {
      if (nav.link === link) {
        Router.push(link);
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
  };

  const uploadImageToServer = async () => {
    if (image) {
      setLoader(true);
      setDisableButton(true);
      await uploadImage(image, "imgCover", "cover", ".jpg");
      window.location.assign("/");
    }
  };

  return (
    <Fragment>
      <NextSeo
        title="دکتر جاسبی"
        description="زندگینامه، دستاوردها و فعالیتهای دکتر جاسبی"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://jassbi.net/",
          siteName: "دکتر جاسبی",
        }}
      />
      <div className={classes.coverImageContainer}>
        {screenSize === "desktop" && (
          <div className={classes.imageBoxDesktop}>
            <Image
              className={classes.image}
              src="https://jassbi.storage.iran.liara.space/cover/imgCover.jpg"
              blurDataURL="https://jassbi.storage.iran.liara.space/cover/imgCover.jpg"
              placeholder="blur"
              alt="image"
              layout="fill"
              objectFit="cover"
              loading="eager"
              as="image"
            />
            <div className={classes.information}>
              <h3>دستاوردها و فعالیتهای دکتر جاسبی</h3>
              <div className={classes.section}>
                <div
                  className={classes.details}
                  onClick={() => activateNav("/biography")}
                >
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                    as="image"
                  />
                  <p>زندگینامه</p>
                  <h2>
                    {enToFaDigits(
                      biography?.filter((item) => item.confirm).length
                    )}
                  </h2>
                </div>
                <div
                  className={classes.details}
                  onClick={() => activateNav("/politics")}
                >
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                    as="image"
                  />
                  <p>سیاسی و اجرایی</p>
                  <h2>
                    {enToFaDigits(
                      politics?.filter((item) => item.confirm).length
                    )}
                  </h2>
                </div>
                <div
                  className={classes.details}
                  onClick={() => activateNav("/academic")}
                >
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                    as="image"
                  />
                  <p>پژوهشی و علمی</p>
                  <h2>
                    {enToFaDigits(
                      academics?.filter((item) => item.confirm).length
                    )}
                  </h2>
                </div>
                <div
                  className={classes.details}
                  onClick={() => activateNav("/publications")}
                >
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                    as="image"
                  />
                  <p>انتشارات</p>
                  <h2>
                    {enToFaDigits(
                      publications?.filter((item) => item.confirm).length
                    )}
                  </h2>
                </div>
                <div
                  className={classes.details}
                  onClick={() => activateNav("/media")}
                >
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                    as="image"
                  />
                  <p>تصاویر</p>
                  <h2>
                    {enToFaDigits(media?.filter((item) => item.confirm).length)}
                  </h2>
                </div>
                <div
                  className={classes.details}
                  onClick={() => activateNav("/speech")}
                >
                  <Image
                    className={classes.image}
                    src={bullet}
                    placeholder="blur"
                    alt="image"
                    width={40}
                    height={40}
                    loading="eager"
                    as="image"
                  />
                  <p>سخنرانی</p>
                  <h2>
                    {enToFaDigits(
                      speech?.filter((item) => item.confirm).length
                    )}
                  </h2>
                </div>
                {permissionControl === "super" && (
                  <div className={classes.input}>
                    <label className="file">
                      <input
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                        type="file"
                        accept="image/*"
                      />
                      <p>تغییر عکس</p>
                    </label>
                    {image && (
                      <div className={classes.image}>
                        <Image
                          width={100}
                          height={50}
                          objectFit="contain"
                          src={URL.createObjectURL(image)}
                          alt="image"
                          priority
                          as="image"
                        />
                      </div>
                    )}
                    {loader && (
                      <div className={classes.loader}>
                        <Image
                          width={50}
                          height={50}
                          src={loaderImage}
                          alt="isLoading"
                          as="image"
                        />
                      </div>
                    )}
                    {image && (
                      <button
                        disabled={disableButton}
                        onClick={() => uploadImageToServer()}
                      >
                        بارگذاری
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {screenSize !== "desktop" && (
          <Image
            className={classes.image}
            src="https://jassbi.storage.iran.liara.space/cover/imgCover.jpg"
            blurDataURL="https://jassbi.storage.iran.liara.space/cover/imgCover.jpg"
            placeholder="blur"
            alt="image"
            layout="fill"
            objectFit="cover"
            loading="eager"
            as="image"
          />
        )}
      </div>
      {screenSize !== "desktop" && (
        <div className={classes.information}>
          <h3>دستاوردها و فعالیتهای دکتر جاسبی</h3>
          <div className={classes.section}>
            <div
              className={classes.details}
              onClick={() => activateNav("/biography")}
            >
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
                as="image"
              />
              <p>زندگینامه</p>
              <h2>
                {enToFaDigits(biography?.filter((item) => item.confirm).length)}
              </h2>
            </div>
            <div
              className={classes.details}
              onClick={() => activateNav("/politics")}
            >
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
                as="image"
              />
              <p>سیاسی و اجرایی</p>
              <h2>
                {enToFaDigits(politics?.filter((item) => item.confirm).length)}
              </h2>
            </div>
            <div
              className={classes.details}
              onClick={() => activateNav("/academic")}
            >
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
                as="image"
              />
              <p>پژوهشی و علمی</p>
              <h2>
                {enToFaDigits(academics?.filter((item) => item.confirm).length)}
              </h2>
            </div>
            <div
              className={classes.details}
              onClick={() => activateNav("/publications")}
            >
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
                as="image"
              />
              <p>انتشارات</p>
              <h2>
                {enToFaDigits(
                  publications?.filter((item) => item.confirm).length
                )}
              </h2>
            </div>
            <div
              className={classes.details}
              onClick={() => activateNav("/media")}
            >
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
                as="image"
              />
              <p>تصاویر</p>
              <h2>
                {enToFaDigits(media?.filter((item) => item.confirm).length)}
              </h2>
            </div>
            <div
              className={classes.details}
              onClick={() => activateNav("/speech")}
            >
              <Image
                className={classes.image}
                src={bullet}
                placeholder="blur"
                alt="image"
                width={40}
                height={40}
                loading="eager"
                as="image"
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
        <div className={classes.row}>
          {screenSize === "desktop" && (
            <Image
              className={classes.image}
              src={bullet}
              placeholder="blur"
              alt="image"
              width={60}
              height={60}
              loading="eager"
              as="image"
            />
          )}
          <div>
            <h2>سیر تاریخی</h2>
            <p>رویدادهای مهم و ماندگار</p>
          </div>
          {screenSize === "desktop" && (
            <Image
              className={classes.image}
              src={bullet}
              placeholder="blur"
              alt="image"
              width={60}
              height={60}
              loading="eager"
              as="image"
            />
          )}
        </div>
        <Timeline timelineData={timelineData} />
      </div>
      <div className={classes.bannerContainer}>{generateBanner()}</div>
      <div className={classes.update}>
        <h2>آخرین به روزرسانی</h2>
      </div>
      <div className={classes.cardGrid}>
        {archiveArray
          .filter((item) => item.confirm)
          .filter((item) => item.mediaType === "image")
          .map((item, index) => (
            <Fragment key={index}>
              <div className={classes.card}>
                {item.media && (
                  <div className={classes.coverImageContainer}>
                    <Image
                      className={classes.image}
                      src={item.media}
                      placeholder="blur"
                      blurDataURL={item.media}
                      alt="image"
                      loading="eager"
                      objectFit="contain"
                      layout="fill"
                      priority
                      as="image"
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
    const biography = await biographyModel.find();

    const archiveArray = [
      ...academics,
      ...politics,
      ...publications,
      ...media,
      ...speech,
      ...biography,
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
      const dataObj4 = media.filter((obj) => obj.year === year);
      const dataObj5 = speech.filter((obj) => obj.year === year);
      const dataObj6 = biography.filter((obj) => obj.year === year);
      const combined = {
        year: year,
        data: [
          ...dataObj1,
          ...dataObj2,
          ...dataObj3,
          ...dataObj4,
          ...dataObj5,
          ...dataObj6,
        ],
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
        biography: JSON.parse(JSON.stringify(biography)),
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
