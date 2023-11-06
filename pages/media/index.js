import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import dbConnect from "@/services/dbConnect";
import mediaModel from "@/models/Media";
import Image from "next/legacy/image";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { enToFaDigits, sliceString } from "@/services/utility";
import { getMediaApi, updateMediaApi } from "@/services/api";
import MediaForm from "@/components/MediaForm";
import { NextSeo } from "next-seo";
import pattern from "@/assets/pattern.png";

export default function Media({ media }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const action = async (id, type) => {
    const message = `${
      type === "confirm" ? "انتشار مطمئنی؟" : "پنهان مطمئنی؟"
    }`;
    const confirm = window.confirm(message);

    if (confirm) {
      let data = await getMediaApi(id);
      switch (type) {
        case "confirm":
          data.confirm = true;
          break;
        case "cancel":
          data.confirm = false;
          break;
      }
      await updateMediaApi(data);
      window.location.assign("/media");
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
        title="تصاویر و ویدئو"
        description="تصاویر و ویدئو"
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
        {displayForm && (
          <div className={classes.form}>
            <MediaForm />
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
            {media.map((item, index) => (
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
                    <div>
                      <h3>{item.title}</h3>
                      {item.category === "image" && (
                        <div className={classes.mediaContainer}>
                          <Image
                            className={classes.image}
                            src={item.media}
                            placeholder="blur"
                            blurDataURL={item.media}
                            alt="image"
                            loading="eager"
                            objectFit="cover"
                            layout="fill"
                            priority
                            onClick={() => setExpandedItem(item["_id"])}
                          />
                        </div>
                      )}
                      {item.category === "video" && (
                        <div className={classes.mediaContainer}>
                          <video
                            className={classes.video}
                            preload="metadata"
                            src={item.media}
                            controls
                          />
                        </div>
                      )}

                      <p>سال : {enToFaDigits(item.year)} </p>
                    </div>
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
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const media = await mediaModel.find();
    media.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return {
      props: {
        media: JSON.parse(JSON.stringify(media)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
