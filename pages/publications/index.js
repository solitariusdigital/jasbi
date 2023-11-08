import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import PublicationsForm from "@/components/PublicationsForm";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import dbConnect from "@/services/dbConnect";
import publicationModel from "@/models/Publication";
import { enToFaDigits, sliceString } from "@/services/utility";
import DetailsPopup from "@/components/DetailsPopup";
import { NextSeo } from "next-seo";
import BannerPattern from "@/components/BannerPattern";
import ActionComponent from "@/components/ActionComponent";

export default function Publications({ publications }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { displayDetailsPopup, setDisplayDetailsPopup } =
    useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [category, setCategory] = useState("کتاب" || "مقالات");
  const [selectedItem, setSelectedItem] = useState({});
  const [displayForm, setDisplayForm] = useState(false);

  return (
    <Fragment>
      <NextSeo
        title="انتشارات"
        description="کتاب و مقالات"
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
          <div className={classes.categoryContainer}>
            <div className={classes.category}>
              <p
                className={
                  category === "مقالات" ? classes.navActive : classes.nav
                }
                onClick={() => {
                  setDisplayDetailsPopup(false);
                  setCategory("مقالات");
                }}
              >
                مقالات
              </p>
              <p
                className={
                  category === "کتاب" ? classes.navActive : classes.nav
                }
                onClick={() => {
                  setDisplayDetailsPopup(false);
                  setCategory("کتاب");
                }}
              >
                کتاب
              </p>
            </div>
          </div>
        )}
        {displayForm && (
          <div className={classes.form}>
            <PublicationsForm admin={true} />
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
            {publications
              .filter((item) => item.category === category)
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

                        {item.media && (
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
                              onClick={() => {
                                setSelectedItem(item);
                                setDisplayDetailsPopup(true);
                                window.scrollTo(0, 0);
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <p>گردآورنده : {item.author}</p>
                          {item.author !== "دکتر عبدالله جاسبی" && (
                            <p>زیر نظز : دکتر عبدالله جاسبی</p>
                          )}
                          <p>ناشر : {item.publisher}</p>
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
                      <ActionComponent item={item} route={"publications"} />
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
    const publications = await publicationModel.find();
    publications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return {
      props: {
        publications: JSON.parse(JSON.stringify(publications)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
