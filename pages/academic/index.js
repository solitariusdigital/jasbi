import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import AcademicForm from "@/components/AcademicForm";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function Academic() {
  const [type, setType] = useState("projects" || "achievements" || "teaching");
  const [displayForm, setDisplayForm] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [items, setItems] = useState([
    {
      title: "پروژه",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
      type: "projects",
      year: "1380",
    },
    {
      title: "پروژه",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image: "",
      type: "projects",
      year: "1380",
    },
    {
      title: "پروژه",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image: "",
      type: "projects",
      year: "1380",
    },
    {
      title: "دستاورد",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image: "",
      type: "achievements",
      year: "1381",
    },
    {
      title: "تدریس",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image: "",
      type: "teaching",
      year: "1382",
    },
    {
      title: "پروژه",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image: "",
      type: "projects",
      year: "1380",
    },

    {
      title: "تدریس",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image: "",
      type: "teaching",
      year: "1382",
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
              className={type === "teaching" ? classes.navActive : classes.nav}
              onClick={() => setType("teaching")}
            >
              تدریس
            </p>
            <p
              className={
                type === "achievements" ? classes.navActive : classes.nav
              }
              onClick={() => setType("achievements")}
            >
              دستاورد
            </p>
            <p
              className={type === "projects" ? classes.navActive : classes.nav}
              onClick={() => setType("projects")}
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
          {items
            .filter((item) => item.type === type)
            .map((item, index) => (
              <div className={classes.item} key={index}>
                <VerifiedUserIcon
                  className={classes.verified}
                  sx={{ color: "#57a361" }}
                />
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
