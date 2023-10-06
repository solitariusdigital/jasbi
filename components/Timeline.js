import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Timeline.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { enToFaDigits } from "@/services/utility";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";

export default function Timeline({ timelineData }) {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [timeline, setTimeline] = useState(timelineData);
  const [details, setDetails] = useState({});
  const [description, setDescription] = useState("");

  const category = {
    academic: "پژوهشی و علمی",
    publications: "انتشارات",
    politics: "سیاسی و اجرایی",
  };

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
          group: item.data[parseInt(dataIndex)].group,
          author: item.data[parseInt(dataIndex)].author,
          publisher: item.data[parseInt(dataIndex)].publisher,
          position: item.data[parseInt(dataIndex)].position,
          activity: item.data[parseInt(dataIndex)].activity,
          image: item.data[parseInt(dataIndex)].image,
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
          <h2>{enToFaDigits(details.year)} </h2>
          <CloseIcon
            className={classes.icon}
            onClick={() => setDisplayDetails(false)}
          />
          <div className={classes.row}>
            {details.image && (
              <Image
                className={classes.image}
                src={details.image}
                placeholder="blur"
                blurDataURL={details.image}
                alt="image"
                loading="eager"
                width={300}
                height={180}
                objectFit="cover"
                priority
              />
            )}
            <div className={classes.information}>
              <h3>{details.title}</h3>
              {details.group && <p>دسته : {category[details.group]}</p>}
              {details.author && (
                <Fragment>
                  <p>گردآورنده : {details.author}</p>
                  {details.author !== "دکتر عبدالله جاسبی" && (
                    <p>زیر نظز : دکتر عبدالله جاسبی</p>
                  )}
                </Fragment>
              )}
              {details.publisher && <p>ناشر : {details.publisher}</p>}
              {details.position && <p>سمت : {details.position}</p>}
              {details.activity && <p>فعالیت : {details.activity}</p>}
            </div>
            <p className={classes.description}>{details.description}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}
