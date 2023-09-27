import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Timeline.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toFarsiNumber } from "@/services/utility";

export default function Timeline() {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [details, setDetails] = useState("");
  const [timeline, setTimeline] = useState([
    {
      year: "1360",
      title: "دانشگاه",
      active: false,
    },
    {
      year: "1360",
      title: "بازنشسته",
      active: false,
    },
    {
      year: "1360",
      title: "اسلامی",
      active: false,
    },
    {
      year: "1360",
      title: "تأسیس",
      active: false,
    },
    {
      year: "1360",
      title: "فرهنگی",
      active: false,
    },
    {
      year: "1360",
      title: "جمهوری",
      active: false,
    },
    {
      year: "1360",
      title: "سیاستمدار",
      active: false,
    },
    {
      year: "1360",
      title: "اسلامی",
      active: false,
    },
    {
      year: "1360",
      title: "تأسیس",
      active: false,
    },
    {
      year: "1360",
      title: "فرهنگی",
      active: false,
    },
    {
      year: "1360",
      title: "جمهوری",
      active: false,
    },
    {
      year: "1360",
      title: "سیاستمدار",
      active: false,
    },
    {
      year: "1360",
      title: "دانشگاه",
      active: false,
    },
    {
      year: "1360",
      title: "بازنشسته",
      active: false,
    },
    {
      year: "1360",
      title: "اسلامی",
      active: false,
    },
    {
      year: "1360",
      title: "تأسیس",
      active: false,
    },
    {
      year: "1360",
      title: "فرهنگی",
      active: false,
    },
    {
      year: "1360",
      title: "جمهوری",
      active: false,
    },
    {
      year: "1360",
      title: "سیاستمدار",
      active: false,
    },
    {
      year: "1402",
      title:
        "سیاستمدار رویدادهای سیاستمدار ر رویدادهای رویدادهای سیاستمدار سیاستمدار سیاستمدار سیاستمدار سیاستمدار ر رویدادهای رویدادهای ویدادهای",
      active: false,
    },
  ]);

  const periods = [
    "قبل انقلاب",
    "حزب جمهوری اسلامی",
    "تاسیس دانشگاه آزاد اسلامی",
    "دهه اول تثبیت دانشگاه آزاد اسلامی",
    "دهه دوم گسترش کمی دانشگاه آزاد اسلامی",
    "دهه سوم گسترش کیفی دانشگاه آزاد اسلامی",
    "دهه چهارم گسترش و رقابت دانشگاه آزاد اسلامی",
  ];

  const selectYear = (index) => {
    timeline.map((item, i) => {
      if (index === i) {
        item.active = true;
        setDetails(item);
      } else {
        item.active = false;
      }
    });
    setDisplayDetails(true);
  };

  const scrollRight = () => {
    document.getElementById("timeline").scrollLeft += 100;
  };
  const scrollLeft = () => {
    document.getElementById("timeline").scrollLeft -= 100;
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <ArrowBackIosIcon
          className={classes.icon}
          onClick={() => scrollLeft()}
        />
        <div className={classes.timeline} id="timeline">
          {timeline
            .map((item, index) => (
              <div key={index} className={classes.section}>
                <div className={classes.row}>
                  <p className={classes.year}>{toFarsiNumber(item.year)}</p>
                  <select
                    defaultValue={"default"}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <option value="default" disabled>
                      انتخاب
                    </option>
                    {periods.map((period, index) => {
                      return (
                        <option key={index} value={period}>
                          {period}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p
                  onClick={() => selectYear(index)}
                  className={item.active ? classes.active : classes.title}
                >
                  {item.title.slice(0, 22)} ... <span>بیشتر</span>
                </p>
              </div>
            ))
            .reverse()}
        </div>
        <ArrowForwardIosIcon
          className={classes.icon}
          onClick={() => scrollRight()}
        />
      </div>
      {displayDetails && (
        <div className={`${classes.details} animate__animated animate__zoomIn`}>
          <h3>{details.year}</h3>
          <p>{details.title}</p>
        </div>
      )}
    </Fragment>
  );
}
