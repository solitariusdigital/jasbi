import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import PoliticsForm from "@/components/PoliticsForm";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function Politics() {
  const [type, setType] = useState("بعد" || "قبل");
  const [selectedItem, setSelectedItem] = useState({});
  const [displayDetails, setDisplayDetails] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  const [activities, setActivities] = useState([
    {
      title: "قبل انقلاب",
      year: "۱۳۷۰",
      position: "تاسیس",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      category: "قبل",
      period: "حزب جمهوری اسلامی",
    },
    {
      title: "بعد انقلاب",
      year: "۱۳۷۰",
      position: "دانشگاه",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      category: "بعد",
      period: "تاسیس دانشگاه آزاد اسلامی",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
    },
  ]);

  const action = async (id, type) => {
    const message = `${type === "confirm" ? "انتشار مطمئنی؟" : "حذف مطمئنی؟"}`;
    const confirm = window.confirm(message);
  };

  return (
    <div className={classes.container}>
      <div className={classes.button}>
        <button onClick={() => setDisplayForm(!displayForm)}>
          {!displayForm ? "بارگذاری" : "برگشت"}
        </button>
      </div>
      {!displayForm && (
        <div className={classes.navigationContainer}>
          <div className={classes.navigation}>
            <p
              className={type === "قبل" ? classes.navActive : classes.nav}
              onClick={() => setType("قبل")}
            >
              قبل انقلاب
            </p>
            <p
              className={type === "بعد" ? classes.navActive : classes.nav}
              onClick={() => setType("بعد")}
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
          {activities
            .filter((item) => item.category === type)
            .map((item, index) => (
              <div className={classes.item} key={index}>
                <VerifiedIcon
                  className={classes.verified}
                  sx={{ color: "#57a361" }}
                />
                <div className={classes.row}>
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
                  <div>
                    <h3>{item.title}</h3>
                    <p>سمت : {item.position}</p>
                    <p>سال : {item.year} </p>
                    <p>فعالیت : {item.period}</p>
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
                  <TaskAltIcon
                    className={classes.icon}
                    sx={{ color: "#57a361" }}
                    onClick={() => action(item["_id"], "confirm")}
                  />
                  <CloseIcon
                    className={classes.icon}
                    sx={{ color: "#cd3d2c" }}
                    onClick={() => action(item["_id"], "cancel")}
                  />
                </div>
              </div>
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
                <p>سال : {selectedItem.year} </p>
                <p>فعالیت : {selectedItem.period}</p>
              </div>
              {selectedItem.image && (
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
              )}
            </div>
            <p>{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
