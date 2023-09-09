import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "../publications/publications.module.scss";
import Image from "next/legacy/image";

export default function Politics() {
  const [type, setType] = useState("after" || "before");

  const [activities, setActivities] = useState([
    {
      title: "قبل انقلاب",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      period: "before",
    },
    {
      title: "بعد انقلاب",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      period: "after",
    },
    {
      title: "قبل انقلاب",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      period: "before",
    },
    {
      title: "بعد انقلاب",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      period: "after",
    },
  ]);

  return (
    <div className={classes.container}>
      <div className={classes.navigation}>
        <p
          className={type === "after" ? classes.nav : classes.navActive}
          onClick={() => setType("before")}
        >
          قبل انقلاب
        </p>
        <p
          className={type === "before" ? classes.nav : classes.navActive}
          onClick={() => setType("after")}
        >
          بعد انقلاب
        </p>
      </div>
      <div className={classes.list}>
        {activities
          .filter((item) => item.period === type)
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
                <div>
                  <h3>{item.title}</h3>
                </div>
              </div>
              <p>
                {item.description.slice(0, 110)} ... <span>بیشتر</span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
