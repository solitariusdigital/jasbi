import { useState, useContext, Fragment, useEffect } from "react";
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

export default function Politics({ politics }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [category, setCategory] = useState("بعد" || "قبل");
  const [selectedItem, setSelectedItem] = useState({});
  const [displayDetails, setDisplayDetails] = useState(false);
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
              className={category === "قبل" ? classes.navActive : classes.nav}
              onClick={() => setCategory("قبل")}
            >
              قبل انقلاب
            </p>
            <p
              className={category === "بعد" ? classes.navActive : classes.nav}
              onClick={() => setCategory("بعد")}
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
            window.innerWidth > 1100
              ? "animate__animated animate__slideInRight"
              : ""
          }`}
        >
          {politics
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
                        <p>سمت : {item.position}</p>
                        <p>فعالیت : {item.activity}</p>
                        <p>سال : {item.year} </p>
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
                        <p>سمت : {item.position}</p>
                        <p>فعالیت : {item.activity}</p>
                        <p>سال : {item.year} </p>
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
                <p>سمت : {selectedItem.position}</p>
                <p>فعالیت : {selectedItem.activity}</p>
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
