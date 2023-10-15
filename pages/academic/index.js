import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import AcademicForm from "@/components/AcademicForm";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import dbConnect from "@/services/dbConnect";
import academicModel from "@/models/Academic";
import { getAcademicApi, updateAcademicApi } from "@/services/api";
import { enToFaDigits, sliceString } from "@/services/utility";
import DetailsPopup from "@/components/DetailsPopup";
import { NextSeo } from "next-seo";

export default function Academic({ academics }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { displayDetailsPopup, setDisplayDetailsPopup } =
    useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);
  const [category, setCategory] = useState("پروژه" || "دستاور" || "تدریس");
  const [displayForm, setDisplayForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const action = async (id, type) => {
    const message = `${
      type === "confirm" ? "انتشار مطمئنی؟" : "پنهان مطمئنی؟"
    }`;
    const confirm = window.confirm(message);

    if (confirm) {
      let data = await getAcademicApi(id);
      switch (type) {
        case "confirm":
          data.confirm = true;
          break;
        case "cancel":
          data.confirm = false;
          break;
      }
      await updateAcademicApi(data);
      window.location.assign("/academic");
    }
  };

  return (
    <Fragment>
      <NextSeo
        title="پژوهشی و علمی"
        description="فعالیتهای پژوهشی و علمی"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://jasbi.net/",
          siteName: "دکتر جاسبی",
        }}
      />
      <div className={classes.container}>
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
                className={
                  category === "تدریس" ? classes.navActive : classes.nav
                }
                onClick={() => {
                  setDisplayDetailsPopup(false);
                  setCategory("تدریس");
                }}
              >
                تدریس
              </p>
              <p
                className={
                  category === "دستاور" ? classes.navActive : classes.nav
                }
                onClick={() => {
                  setDisplayDetailsPopup(false);
                  setCategory("دستاور");
                }}
              >
                دستاورد
              </p>
              <p
                className={
                  category === "پروژه" ? classes.navActive : classes.nav
                }
                onClick={() => {
                  setDisplayDetailsPopup(false);
                  setCategory("پروژه");
                }}
              >
                پروژه
              </p>
            </div>
          </div>
        )}
        {displayForm && (
          <div className={classes.form}>
            <AcademicForm />
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
            {academics
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
    const academics = await academicModel.find();
    academics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return {
      props: {
        academics: JSON.parse(JSON.stringify(academics)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
