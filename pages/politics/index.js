import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import PoliticsForm from "@/components/PoliticsForm";

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
    },
  ]);

  return (
    <div className={classes.container}>
      {!displayForm && (
        <div className={classes.navigation}>
          <p
            className={type === "بعد" ? classes.nav : classes.navActive}
            onClick={() => setType("قبل")}
          >
            قبل انقلاب
          </p>
          <p
            className={type === "قبل" ? classes.nav : classes.navActive}
            onClick={() => setType("بعد")}
          >
            بعد انقلاب
          </p>
        </div>
      )}
      <div className={classes.button}>
        <button onClick={() => setDisplayForm(!displayForm)}>
          {!displayForm ? "بارگذاری" : "برگشت"}
        </button>
      </div>
      {displayForm && (
        <div className={classes.form}>
          <PoliticsForm />
        </div>
      )}
      {!displayForm && (
        <div className={classes.list}>
          {activities
            .filter((item) => item.category === type)
            .map((item, index) => (
              <div
                className={classes.item}
                key={index}
                onClick={() => {
                  setSelectedItem(item);
                  setDisplayDetails(true);
                  window.scrollTo(0, 0);
                }}
              >
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
                  {item.description.slice(0, 110)} ... <span>بیشتر</span>
                </p>
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
