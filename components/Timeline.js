import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Timeline.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Timeline() {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [details, setDetails] = useState("");

  const timeline = [
    {
      year: "1360",
      desc: "دانشگاه",
      active: false,
    },
    {
      year: "1360",
      desc: "بازنشسته",
      active: false,
    },
    {
      year: "1360",
      desc: "اسلامی",
      active: false,
    },
    {
      year: "1360",
      desc: "تأسیس",
      active: false,
    },
    {
      year: "1360",
      desc: "فرهنگی",
      active: false,
    },
    {
      year: "1360",
      desc: "جمهوری",
      active: false,
    },
    {
      year: "1360",
      desc: "سیاستمدار",
      active: false,
    },
    {
      year: "1360",
      desc: "دانشگاه",
      active: false,
    },
    {
      year: "1360",
      desc: "بازنشسته",
      active: false,
    },
    {
      year: "1360",
      desc: "اسلامی",
      active: false,
    },
    {
      year: "1360",
      desc: "تأسیس",
      active: false,
    },
    {
      year: "1360",
      desc: "فرهنگی",
      active: false,
    },
    {
      year: "1360",
      desc: "جمهوری",
      active: false,
    },
    {
      year: "1360",
      desc: "سیاستمدار",
      active: false,
    },
    {
      year: "1402",
      desc: "رویدادهای",
      active: false,
    },
  ];

  const selectYear = (index) => {
    setDisplayDetails(false);
    timeline.map((item, i) => {
      if (index === i) {
        item.active = true;
        setDetails(item);
      } else {
        item.active = false;
      }
    });
    setTimeout(() => {
      setDisplayDetails(true);
    }, 200);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <ArrowBackIosIcon sx={{ color: "#d6d6d6" }} />
        <div className={classes.timeline}>
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
        <ArrowForwardIosIcon sx={{ color: "#d6d6d6" }} />
      </div>
      {displayDetails && (
        <div className={`${classes.details} animate__animated animate__zoomIn`}>
          <h3>{details.year}</h3>
          <p>{details.desc}</p>
        </div>
      )}
    </Fragment>
  );
}
