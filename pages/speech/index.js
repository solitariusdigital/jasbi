import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import dbConnect from "@/services/dbConnect";
import speechModel from "@/models/Speech";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import { enToFaDigits, sliceString } from "@/services/utility";
import SpeechForm from "@/components/SpeechForm";
import { NextSeo } from "next-seo";
import BannerPattern from "@/components/BannerPattern";
import ActionComponent from "@/components/ActionComponent";
import { getSpeechApi } from "@/services/api";

export default function Media({ speech }) {
  const { screenSize, setScreenSize } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [editData, setEditData] = useState({});

  const getEditItem = async (id) => {
    let data = await getSpeechApi(id);
    setEditData(data);
    setDisplayForm(true);
  };

  return (
    <Fragment>
      <NextSeo
        title="سخنرانی"
        description="سخنرانی"
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
            <SpeechForm admin={true} editData={editData} />
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
            {speech
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
                      {permissionControl === "super" && (
                        <EditIcon
                          className={classes.edit}
                          onClick={() => getEditItem(item["_id"])}
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
                              as="document"
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
                      <ActionComponent item={item} route={"speech"} />
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
    const speech = await speechModel.find();
    speech.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return {
      props: {
        speech: JSON.parse(JSON.stringify(speech)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
