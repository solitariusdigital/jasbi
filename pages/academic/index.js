import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "../pages.module.scss";
import Image from "next/legacy/image";

export default function Academic() {
  const [categories, setCategories] = useState([
    {
      title: "پروژه ها",
      active: false,
    },
    {
      title: "دستاوردها",
      active: false,
    },
    {
      title: "تدریس",
      active: false,
    },
  ]);

  const activeCat = (index) => {
    categories.map((nav, i) => {
      if (i === index) {
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setCategories([...categories]);
  };

  return (
    <div className={classes.container}>
      <div className={classes.navigationContainer}>
        <div className={classes.navigation}>
          {categories
            .map((cat, index) => (
              <p
                key={index}
                className={!cat.active ? classes.nav : classes.navActive}
                onClick={() => activeCat(index)}
              >
                {cat.title}
              </p>
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
}
