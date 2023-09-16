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
      year: "۱۳۶۰",
      title: "سیاستمدار",
      active: false,
    },
    {
      year: "1402",
      title: "رویدادهای",
      active: false,
    },
  ]);

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
    document.getElementById("timeline").scrollLeft += 20;
  };
  const scrollLeft = () => {
    document.getElementById("timeline").scrollLeft -= 20;
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
              <div
                className={item.active ? classes.active : classes.section}
                key={index}
                onClick={() => selectYear(index)}
              >
                {item.year}
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
