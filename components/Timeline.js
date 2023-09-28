import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Timeline.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { enToFaDigits } from "@/services/utility";

export default function Timeline({ timelineData }) {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [details, setDetails] = useState("");
  const [timeline, setTimeline] = useState(timelineData);

  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(timeline);
  }, [timeline]);

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
          {timelineData
            .map((time, index) => (
              <div key={index} className={classes.section}>
                <div className={classes.row}>
                  <p className={classes.year}>{enToFaDigits(time.year)}</p>
                  <select
                    defaultValue={"default"}
                    onChange={(e) =>
                      setDescription(time.data[e.target.value].description)
                    }
                  >
                    <option value="default" disabled>
                      انتخاب
                    </option>
                    {time.data.map((item, index) => {
                      return (
                        <option key={index} value={index}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p
                  onClick={() => selectYear(index)}
                  className={time.active ? classes.active : classes.title}
                >
                  {description.slice(0, 22)} ... <span>بیشتر</span>
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
