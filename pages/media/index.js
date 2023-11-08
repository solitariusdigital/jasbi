import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import dbConnect from "@/services/dbConnect";
import mediaModel from "@/models/Media";
import Image from "next/legacy/image";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { enToFaDigits, sliceString } from "@/services/utility";
import MediaForm from "@/components/MediaForm";
import { NextSeo } from "next-seo";
import BannerPattern from "@/components/BannerPattern";
import ActionComponent from "@/components/ActionComponent";

export default function Media({ media }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

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
        <BannerPattern />
        {permissionControl !== "user" && (
          <div className={classes.button}>
            <button onClick={() => setDisplayForm(!displayForm)}>
              {!displayForm ? "بارگذاری" : "برگشت"}
            </button>
          </div>
        )}
        {displayForm && (
          <div className={classes.form}>
            <MediaForm admin={true} />
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
            {media
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
                        {item.mediaType === "video" && (
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
                      <ActionComponent item={item} route={"media"} />
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
