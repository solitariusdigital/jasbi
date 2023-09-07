import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./home.module.scss";
import Image from "next/legacy/image";
import background from "@/assets/background.jpg";
import Menu from "@/components/Menu";

export default function Home() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);

  return (
    <Fragment>
      <div className={classes.heroHeader}>
        <Image
          className={classes.heroImage}
          src={background}
          placeholder="blur"
          alt="image"
          layout="fill"
          objectFit="cover"
          loading="eager"
        />
        <div className={classes.intro}>
          <h1>Find clarity in chaos</h1>
          <p>
            Major Tom is a full-service marketing agency been purpose-built to
            help organizations thrive in an increasingly complex landscape.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
