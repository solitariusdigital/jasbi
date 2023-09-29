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

export default function Publications({ publications }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [category, setCategory] = useState("کتاب" || "مقالات");
  const [selectedItem, setSelectedItem] = useState({});
  const [displayDetails, setDisplayDetails] = useState(false);
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
              onClick={() => setCategory("مقالات")}
            >
              مقالات
            </p>
            <p
              className={category === "کتاب" ? classes.navActive : classes.nav}
              onClick={() => setCategory("کتاب")}
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
                {!permissionControl && item.confirm && (
                  <div className={classes.item}>
                    <div className={classes.row}>
                      <div>
                        {item.image && (
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
                              setDisplayDetails(true);
                              window.scrollTo(0, 0);
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>گردآورنده : {item.author}</p>
                        {item.author !== "دکتر عبدالله جاسبی" && (
                          <p>زیر نظز : دکتر عبدالله جاسبی</p>
                        )}
                        <p>ناشر : {item.publisher}</p>
                        <p>سال چاپ : {item.year} </p>
                      </div>
                    </div>
                    <p>
                      {item.description.slice(0, 100)} ...{" "}
                      <span
                        onClick={() => {
                          setSelectedItem(item);
                          setDisplayDetails(true);
                          window.scrollTo(0, 0);
                        }}
                      >
                        بیشتر
                      </span>
                    </p>
                  </div>
                )}
                {permissionControl && (
                  <div className={classes.item}>
                    {item.confirm && (
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
                      <div>
                        {item.image && (
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
                              setDisplayDetails(true);
                              window.scrollTo(0, 0);
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>گردآورنده : {item.author}</p>
                        {item.author !== "دکتر عبدالله جاسبی" && (
                          <p>زیر نظز : دکتر عبدالله جاسبی</p>
                        )}
                        <p>ناشر : {item.publisher}</p>
                        <p>سال چاپ : {item.year} </p>
                      </div>
                    </div>
                    <p>
                      {item.description.slice(0, 100)} ...{" "}
                      <span
                        onClick={() => {
                          setSelectedItem(item);
                          setDisplayDetails(true);
                          window.scrollTo(0, 0);
                        }}
                      >
                        بیشتر
                      </span>
                    </p>
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
                  </div>
                )}
              </Fragment>
            ))}
        </div>
      )}
      {displayDetails && (
        <div
          className={`${classes.preview} animate__animated animate__slideInDown`}
        >
          <CloseIcon
            className="icon"
            onClick={() => setDisplayDetails(false)}
          />
          <div className={classes.details}>
            <div className={classes.row}>
              <div>
                <h3>{selectedItem.title}</h3>
                <p>گردآورنده : {selectedItem.author}</p>
                {selectedItem.author !== "دکتر عبدالله جاسبی" && (
                  <p>زیر نظز : دکتر عبدالله جاسبی</p>
                )}
                <p>ناشر : {selectedItem.publisher}</p>
                <p>سال چاپ : {selectedItem.year}</p>
              </div>
              {selectedItem.image && (
                <div>
                  <Image
                    className={classes.image}
                    src={selectedItem.image}
                    placeholder="blur"
                    blurDataURL={selectedItem.image}
                    alt="image"
                    loading="eager"
                    width={120}
                    height={150}
                    objectFit="cover"
                    priority
                  />
                </div>
              )}
            </div>
            <p>{selectedItem.description}</p>
          </div>
        </div>
      )}
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
