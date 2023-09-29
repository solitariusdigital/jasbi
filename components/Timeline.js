import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Timeline.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { enToFaDigits } from "@/services/utility";

export default function Timeline({ timelineData }) {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [timeline, setTimeline] = useState(timelineData);
  const [details, setDetails] = useState({});
  const [description, setDescription] = useState("");

  const scrollRight = () => {
    document.getElementById("timeline").scrollLeft += 100;
  };
  const scrollLeft = () => {
    document.getElementById("timeline").scrollLeft -= 100;
  };

  const selectTimeData = (timeIndex, dataIndex) => {
    timeline.map((item, i) => {
      if (timeIndex === i) {
        item.active = true;
        setDescription(item.data[parseInt(dataIndex)].description);
        setDetails({
          year: item.year,
          title: item.data[parseInt(dataIndex)].title,
          description: item.data[parseInt(dataIndex)].description,
        });
      } else {
        item.active = false;
      }
    });
    setDisplayDetails(true);
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
            .map((time, index) => {
              const handleSelectChange = (e) => {
                const selectedIndex = e.target.value;
                const updatedTimelineData = timelineData.map((t, i) => {
                  if (i === index) {
                    return {
                      ...t,
                      active: true,
                    };
                  } else {
                    return {
                      ...t,
                      active: false,
                    };
                  }
                });
                setDescription(
                  updatedTimelineData[index].data[selectedIndex].description
                );
                selectTimeData(index, selectedIndex);
              };
              return (
                <div key={index} className={classes.section}>
                  <div className={classes.row}>
                    <h3>{enToFaDigits(time.year)}</h3>
                    <select
                      value={time.active ? time.selectedIndex : "default"}
                      onChange={handleSelectChange}
                    >
                      {time.data.map((item, i) => (
                        <option key={i} value={i}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {time.active ? (
                    <p
                      onClick={() => selectTimeData(index, 0)}
                      className={
                        time.active ? classes.active : classes.description
                      }
                    >
                      {description.slice(0, 25)} ... <span>بیشتر</span>
                    </p>
                  ) : (
                    <p
                      onClick={() => selectTimeData(index, 0)}
                      className={
                        time.active ? classes.active : classes.description
                      }
                    >
                      {time.data[0].description.slice(0, 25)} ...{" "}
                      <span>بیشتر</span>
                    </p>
                  )}
                </div>
              );
            })
            .reverse()}
        </div>
        <ArrowForwardIosIcon
          className={classes.icon}
          onClick={() => scrollRight()}
        />
      </div>
      {displayDetails && (
        <div className={`${classes.details} animate__animated animate__zoomIn`}>
          <h2>{enToFaDigits(details.year)}</h2>
          <h3>{details.title}</h3>
          <p className={classes.description}>{details.description}</p>
        </div>
      )}
    </Fragment>
  );
}
