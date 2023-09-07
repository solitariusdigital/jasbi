import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Timeline.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Timeline() {
  const time = [
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1360",
      desc: "asdasdasdasd",
    },
    {
      year: "1402",
      desc: "asdasdasdasd",
    },
  ];

  return (
    <div className={classes.container}>
      <ArrowBackIosIcon sx={{ color: "#d6d6d6" }} />
      <div className={classes.timeline}>
        {time
          .map((item, index) => (
            <div
              className={classes.section}
              key={index}
              onClick={() => expertisesPage(item.title)}
            >
              <p>{item.year}</p>
            </div>
          ))
          .reverse()}
      </div>
      <ArrowForwardIosIcon sx={{ color: "#d6d6d6" }} />
    </div>
  );
}
