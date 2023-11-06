import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import PoliticsForm from "@/components/PoliticsForm";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import dbConnect from "@/services/dbConnect";
import politicModel from "@/models/Politic";
import { getPoliticApi, updatePoliticApi } from "@/services/api";
import { enToFaDigits, sliceString } from "@/services/utility";
import DetailsPopup from "@/components/DetailsPopup";
import { NextSeo } from "next-seo";
import pattern from "@/assets/pattern.png";

export default function Politics({ politics }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { displayDetailsPopup, setDisplayDetailsPopup } =
    useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [category, setCategory] = useState("بعد" || "قبل");
  const [selectedItem, setSelectedItem] = useState({});
  const [displayForm, setDisplayForm] = useState(false);

  const action = async (id, type) => {
    const message = `${
      type === "confirm" ? "انتشار مطمئنی؟" : "پنهان مطمئنی؟"
    }`;
    const confirm = window.confirm(message);

    if (confirm) {
      let data = await getPoliticApi(id);
      switch (type) {
        case "confirm":
          data.confirm = true;
          break;
        case "cancel":
          data.confirm = false;
          break;
      }
      await updatePoliticApi(data);
      window.location.assign("/politics");
    }
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
                src={pattern}
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
        <div className={classes.bannerContainer}>{generateBanner()}</div>
        {permissionControl && (
          <div className={classes.button}>
            <button onClick={() => setDisplayForm(!displayForm)}>
              {!displayForm ? "بارگذاری" : "برگشت"}
            </button>
          </div>
        )}
        {!displayForm && (
          <div className={classes.navigationContainer}>
            <div className={classes.navigation}>
              <p
                className={category === "قبل" ? classes.navActive : classes.nav}
                onClick={() => {
                  setDisplayDetailsPopup(false);
                  setCategory("قبل");
                }}
              >
                قبل انقلاب
              </p>
              <p
                className={category === "بعد" ? classes.navActive : classes.nav}
                onClick={() => {
                  setDisplayDetailsPopup(false);
                  setCategory("بعد");
                }}
              >
                بعد انقلاب
              </p>
            </div>
          </div>
        )}
        {displayForm && (
          <div className={classes.form}>
            <PoliticsForm />
          </div>
        )}
        {!displayForm && (
          <div
            className={`${classes.list} ${
              screenSize === "desktop"
                ? "animate__animated animate__slideInRight"
                : ""
            }`}
          >
            {politics
              .filter((item) => item.category === category)
              .map((item, index) => (
                <Fragment key={index}>
                  {(permissionControl || item.confirm) && (
                    <div className={classes.item}>
                      {permissionControl && item.confirm && (
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
                      <div className={classes.row}>
                        {item.image && (
                          <div className={classes.imageContainer}>
                            <Image
                              className={classes.image}
                              src={item.image}
                              placeholder="blur"
                              blurDataURL={item.image}
                              alt="image"
                              loading="eager"
                              width={120}
                              height={150}
                              objectFit="cover"
                              priority
                              onClick={() => {
                                setSelectedItem(item);
                                setDisplayDetailsPopup(true);
                                window.scrollTo(0, 0);
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <h3>{item.title}</h3>
                          <p>سمت : {item.position}</p>
                          <p>فعالیت : {item.activity}</p>
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
                      {permissionControl && (
                        <div className={classes.action}>
                          {!item.confirm && (
                            <TaskAltIcon
                              className={classes.icon}
                              sx={{ color: "#57a361" }}
                              onClick={() => action(item["_id"], "confirm")}
                            />
                          )}
                          {item.confirm && (
                            <CloseIcon
                              className={classes.icon}
                              sx={{ color: "#cd3d2c" }}
                              onClick={() => action(item["_id"], "cancel")}
                            />
                          )}
                        </div>
                      )}
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
