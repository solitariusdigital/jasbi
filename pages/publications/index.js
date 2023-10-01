import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import PublicationsForm from "@/components/PublicationsForm";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import dbConnect from "@/services/dbConnect";
import publicationModel from "@/models/Publication";
import { getPublicationApi, updatePublicationApi } from "@/services/api";
import { enToFaDigits } from "@/services/utility";
import DetailsPopup from "@/components/DetailsPopup";

export default function Publications({ publications }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { displayDetailsPopup, setDisplayDetailsPopup } =
    useContext(StateContext);
  const [category, setCategory] = useState("کتاب" || "مقالات");
  const [selectedItem, setSelectedItem] = useState({});
  const [displayForm, setDisplayForm] = useState(false);

  const action = async (id, type) => {
    const message = `${
      type === "confirm" ? "انتشار مطمئنی؟" : "پنهان مطمئنی؟"
    }`;
    const confirm = window.confirm(message);

    if (confirm) {
      let data = await getPublicationApi(id);
      switch (type) {
        case "confirm":
          data.confirm = true;
          break;
        case "cancel":
          data.confirm = false;
          break;
      }
      await updatePublicationApi(data);
      window.location.assign("/publications");
    }
  };

  return (
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
              className={category === "کتاب" ? classes.navActive : classes.nav}
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
          <PublicationsForm />
        </div>
      )}
      {!displayForm && (
        <div
          className={`${classes.list} ${
            window.innerWidth > 1100
              ? "animate__animated animate__slideInRight"
              : ""
          }`}
        >
          {publications
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
                        <p>گردآورنده : {item.author}</p>
                        {item.author !== "دکتر عبدالله جاسبی" && (
                          <p>زیر نظز : دکتر عبدالله جاسبی</p>
                        )}
                        <p>ناشر : {item.publisher}</p>
                        <p>سال : {enToFaDigits(item.year)} </p>
                      </div>
                    </div>
                    <p>
                      {item.description.slice(0, 100)} ...{" "}
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
