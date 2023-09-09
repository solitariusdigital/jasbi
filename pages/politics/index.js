import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "../publications/publications.module.scss";
import Image from "next/legacy/image";

export default function Politics() {
  const [type, setType] = useState("after" || "before");

  const [beforeData, setBeforeData] = useState([
    {
      title: "دانشگاه",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
    {
      title: "تالیف",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
    {
      title: "پیشرفته",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
    {
      title: "پیشرفته",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
  ]);
  const [afterData, setAfterData] = useState([
    {
      title: "سمتهای سیاسی بعد از انقلاب و قبل از ورود به حزب جمهوری اسلامی",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
    {
      title: "فعالیت در حزب جمهوری اسلامی",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
    {
      title: "دانشگاه آزاد اسلامی",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
    {
      title: "جامعه اسلامی دانشگاهیان",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
    {
      title: "جشنواره تلاشگران کیفیت",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
    {
      title: "بنیاد آفرینش انس",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
    },
  ]);
  return (
    <div className={classes.container}>
      <div className={classes.navigation}>
        <p
          className={type === "after" ? classes.nav : classes.navActive}
          onClick={() => setType("before")}
        >
          قبل از انقلاب
        </p>
        <p
          className={type === "before" ? classes.nav : classes.navActive}
          onClick={() => setType("after")}
        >
          بعد از انقلاب
        </p>
      </div>
      {type === "before" && (
        <div className={classes.list}>
          {beforeData.map((item, index) => (
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
      )}
      {type === "after" && (
        <div className={classes.list}>
          {afterData.map((item, index) => (
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
      )}
    </div>
  );
}
