import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import PoliticsForm from "@/components/PoliticsForm";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import dbConnect from "@/services/dbConnect";
import politicModel from "@/models/Politic";
import { enToFaDigits, sliceString } from "@/services/utility";
import DetailsPopup from "@/components/DetailsPopup";
import { NextSeo } from "next-seo";
import BannerPattern from "@/components/BannerPattern";
import ActionComponent from "@/components/ActionComponent";

export default function Politics({ politics }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { displayDetailsPopup, setDisplayDetailsPopup } =
    useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [category, setCategory] = useState("بعد انقلاب" || "قبل انقلاب");
  const [type, setType] = useState(
    "دانشگاه آزاد اسلامی" ||
      "حزب جمهوری اسلامی" ||
      "قبل حزب جمهوری اسلامی" ||
      "جامعه اسلامی دانشگاهیان" ||
      "جشنواره تلاشگران کیفیت" ||
      "بنیاد آفرینش انس" ||
      "چکاد آزاد اندیشان"
  );
  const [selectedItem, setSelectedItem] = useState({});
  const [displayForm, setDisplayForm] = useState(false);

  const categories = [{ name: "قبل انقلاب" }, { name: "بعد انقلاب" }];
  const types = [
    { name: "دانشگاه آزاد اسلامی" },
    { name: "حزب جمهوری اسلامی" },
    { name: "قبل حزب جمهوری اسلامی" },
    { name: "جامعه اسلامی دانشگاهیان" },
    { name: "جشنواره تلاشگران کیفیت" },
    { name: "بنیاد آفرینش انس" },
    { name: "چکاد آزاد اندیشان" },
  ];

  const filterPolitics = () => {
    if (category === "بعد انقلاب") {
      return politics
        .filter((item) => item.category === category)
        .filter((item) => item.type === type);
    } else {
      return politics.filter((item) => item.category === category);
    }
  };

  return (
    <Fragment>
      <NextSeo
        title="سیاسی و اجرایی"
        description="فعالیتهای سیاسی و اجرایی"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://jasbi.net/",
          siteName: "دکتر جاسبی",
        }}
      />
      <div className={classes.container}>
        <BannerPattern />
        {permissionControl !== "user" && (
          <div className={classes.button}>
            <button onClick={() => setDisplayForm(!displayForm)}>
              {!displayForm ? "بارگذاری" : "برگشت"}
            </button>
          </div>
        )}
        {!displayForm && (
          <Fragment>
            <div className={classes.categoryContainer}>
              <div className={classes.category}>
                {categories.map((item) => (
                  <p
                    key={item.name}
                    className={
                      category === item.name ? classes.navActive : classes.nav
                    }
                    onClick={() => {
                      setDisplayDetailsPopup(false);
                      setCategory(item.name);
                    }}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
            {category === "بعد انقلاب" && (
              <div className={classes.typeContainer}>
                <div className={classes.type}>
                  {types.map((item) => (
                    <p
                      key={item.name}
                      className={
                        type === item.name ? classes.navActive : classes.nav
                      }
                      onClick={() => {
                        setType(item.name);
                      }}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </Fragment>
        )}
        {displayForm && (
          <div className={classes.form}>
            <PoliticsForm admin={true} />
          </div>
        )}
        {!displayForm && !displayDetailsPopup && (
          <div
            className={`${classes.list} ${
              screenSize === "desktop"
                ? "animate__animated animate__slideInRight"
                : ""
            }`}
          >
            {filterPolitics()
              .sort((a, b) => a.confirm - b.confirm)
              .map((item, index) => (
                <Fragment key={index}>
                  {(permissionControl !== "user" || item.confirm) && (
                    <div className={classes.item}>
                      {permissionControl !== "user" && item.confirm && (
                        <VerifiedUserIcon
                          className={classes.verified}
                          sx={{ color: "#57a361" }}
                        />
                      )}
                      {!item.confirm && (
                        <VisibilityOffIcon
                          className={classes.verified}
                          sx={{ color: "#cd3d2c" }}
                        />
                      )}
                      <div>
                        <h3>{item.title}</h3>
                        {item.mediaType === "image" && (
                          <div className={classes.mediaContainer}>
                            <Image
                              src={item.media}
                              placeholder="blur"
                              blurDataURL={item.media}
                              alt="image"
                              loading="eager"
                              layout="fill"
                              objectFit="cover"
                              priority
                              as="image"
                              onClick={() => {
                                setSelectedItem(item);
                                setDisplayDetailsPopup(true);
                                window.scrollTo(0, 0);
                              }}
                            />
                          </div>
                        )}
                        {item.mediaType === "voice" && (
                          <div className={classes.speechContainer}>
                            <audio preload="metadata" controls as="audio">
                              <source src={item.media} />
                            </audio>
                          </div>
                        )}
                        {item.mediaType === "video" && (
                          <div className={classes.mediaContainer}>
                            <video
                              className={classes.video}
                              preload="metadata"
                              src={item.media}
                              controls
                              as="video"
                            />
                          </div>
                        )}
                        {item.mediaType === "pdf" && (
                          <div className={classes.mediaContainer}>
                            <embed
                              src={item.media}
                              height="300px"
                              type="application/pdf"
                            />
                          </div>
                        )}
                        <div>
                          <p>سمت : {item.position}</p>
                          {type === "دانشگاه آزاد اسلامی" && (
                            <p>دوره : {item.activity}</p>
                          )}
                          {type === "بنیاد آفرینش انس" && (
                            <p>بخش : {item.activity}</p>
                          )}
                          <p>سال : {enToFaDigits(item.year)} </p>
                        </div>
                      </div>
                      <p>
                        {sliceString(item.description, 120)}...
                        <span
                          onClick={() => {
                            setSelectedItem(item);
                            setDisplayDetailsPopup(true);
                            window.scrollTo(0, 0);
                          }}
                        >
                          بیشتر
                        </span>
                      </p>
                      <ActionComponent item={item} route={"politics"} />
                    </div>
                  )}
                </Fragment>
              ))}
          </div>
        )}
        {displayDetailsPopup && <DetailsPopup selectedItem={selectedItem} />}
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const politics = await politicModel.find();
    politics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return {
      props: {
        politics: JSON.parse(JSON.stringify(politics)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
