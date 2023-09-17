import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import PublicationsForm from "@/components/PublicationsForm";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function Publications() {
  const [type, setType] = useState("book" || "article");
  const [selectedItem, setSelectedItem] = useState({});
  const [displayDetails, setDisplayDetails] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  const [items, setItems] = useState([
    {
      title: "دانشگاه",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image: "",
      publication: "اول ۱۳۴۲",
      shabak: "123412341234",
      author: "دکتر عبدالله جاسبی",
      type: "book",
    },
    {
      title: "تالیف",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
      publication: "اول ۱۳۴۲",
      shabak: "123412341234",
      author: "دکتر پویان",
      type: "article",
    },
    {
      title: "تالیف",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
      publication: "اول ۱۳۴۲",
      shabak: "123412341234",
      author: "دکتر عبدالله جاسبی",
      type: "article",
    },
    {
      title: "پیشرفته",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
      publication: "اول ۱۳۴۲",
      shabak: "123412341234",
      author: "دکتر پویان",
      type: "book",
    },
    {
      title: "پیشرفته",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
      publication: "اول ۱۳۴۲",
      shabak: "123412341234",
      author: "دکتر عبدالله جاسبی",
      type: "book",
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
              className={type === "article" ? classes.navActive : classes.nav}
              onClick={() => setType("article")}
            >
              مقالات
            </p>
            <p
              className={type === "book" ? classes.navActive : classes.nav}
              onClick={() => setType("book")}
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
          {items
            .filter((item) => item.type === type)
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
                    <p>گردآورنده : {item.author}</p>
                    {item.author !== "دکتر عبدالله جاسبی" && (
                      <p>زیر نظز : دکتر عبدالله جاسبی</p>
                    )}
                    <p>چاپ : {item.publication} </p>
                    <p>شابک : {item.shabak}</p>
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
                <p>گردآورنده : {selectedItem.author}</p>
                {selectedItem.author !== "دکتر عبدالله جاسبی" && (
                  <p>زیر نظز : دکتر عبدالله جاسبی</p>
                )}
                <p>چاپ : {selectedItem.publication}</p>
                <p>شابک : {selectedItem.shabak}</p>
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
