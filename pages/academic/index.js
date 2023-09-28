import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import AcademicForm from "@/components/AcademicForm";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import dbConnect from "@/services/dbConnect";
import academicModel from "@/models/Academic";
import { getAcademicApi, updateAcademicApi } from "@/services/api";

export default function Academic({ academics }) {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [category, setCategory] = useState("پروژه" || "دستاور" || "تدریس");
  const [displayForm, setDisplayForm] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
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
          data.hidden = true;
          break;
      }
      await updateAcademicApi(data);
      window.location.assign("/academic");
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
              className={category === "تدریس" ? classes.navActive : classes.nav}
              onClick={() => setCategory("تدریس")}
            >
              تدریس
            </p>
            <p
              className={
                category === "دستاور" ? classes.navActive : classes.nav
              }
              onClick={() => setCategory("دستاور")}
            >
              دستاورد
            </p>
            <p
              className={category === "پروژه" ? classes.navActive : classes.nav}
              onClick={() => setCategory("پروژه")}
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
            window.innerWidth > 1100
              ? "animate__animated animate__slideInRight"
              : ""
          }`}
        >
          {academics
            .filter((item) => item.category === category)
            .map((item, index) => (
              <Fragment key={index}>
                {item.confirm && !item.hidden && (
                  <div className={classes.item}>
                    {permissionControl && item.confirm && (
                      <VerifiedUserIcon
                        className={classes.verified}
                        sx={{ color: "#57a361" }}
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
                            width={100}
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
                        <p>سال : {item.year} </p>
                      </div>
                    </div>
                    <p>
                      {item.description.slice(0, 150)} ...{" "}
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
                    {permissionControl && (
                      <div className={classes.action}>
                        {!item.confirm && (
                          <TaskAltIcon
                            className={classes.icon}
                            sx={{ color: "#57a361" }}
                            onClick={() => action(item["_id"], "confirm")}
                          />
                        )}
                        <CloseIcon
                          className={classes.icon}
                          sx={{ color: "#cd3d2c" }}
                          onClick={() => action(item["_id"], "cancel")}
                        />
                      </div>
                    )}
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
                <p>سال : {selectedItem.year} </p>
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
                    width={100}
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
