import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import Image from "next/legacy/image";
import { NextSeo } from "next-seo";
import classes from "../pages.module.scss";
import BannerPattern from "@/components/BannerPattern";
import biographyModel from "@/models/Biography";
import dbConnect from "@/services/dbConnect";
import DetailsPopup from "@/components/DetailsPopup";
import ActionComponent from "@/components/ActionComponent";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import AcademicBioForm from "@/components/AcademicBioForm";
import { enToFaDigits, sliceString } from "@/services/utility";
import { getBiographyApi } from "@/services/api";

export default function Biography({ biographys }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { displayDetailsPopup, setDisplayDetailsPopup } =
    useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [displayForm, setDisplayForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [editData, setEditData] = useState({});

  const getEditItem = async (id) => {
    let data = await getBiographyApi(id);
    setEditData(data);
    setDisplayForm(true);
  };

  return (
    <Fragment>
      <NextSeo
        title="زندگینامه"
        description="زندگینامه"
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
            <AcademicBioForm
              admin={true}
              type={"biography"}
              editData={editData}
            />
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
            {biographys
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
                              as="image"
                              onClick={() => {
                                setSelectedItem(item);
                                setDisplayDetailsPopup(true);
                                window.scrollTo(0, 0);
                                document.body.style.overflow = "hidden";
                              }}
                            />
                          </div>
                        )}
                        <div>
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
                            document.body.style.overflow = "hidden";
                          }}
                        >
                          بیشتر
                        </span>
                      </p>
                      <ActionComponent item={item} route={"biography"} />
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
    const biographys = await biographyModel.find();
    biographys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return {
      props: {
        biographys: JSON.parse(JSON.stringify(biographys)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
