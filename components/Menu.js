import { useState, useContext, useRef, Fragment, useEffect } from "react";
import { StateContext } from "../context/stateContext";
import classes from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";

export default function Menu() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);

  return (
    <div className={classes.container}>
      <div className={classes.largeMenu}>
        <p>LOGO</p>
        <p className={classes.link}>Menu</p>
        <p className={classes.link}>Menu</p>
        <p className={classes.link}>Menu</p>
        <button>Click</button>
      </div>
      <div className={classes.smallMenu}>
        <p>LOGO</p>
        <MenuIcon
          className={classes.menuIcon}
          onClick={() => setMenuMobile(!menuMobile)}
          sx={{ fontSize: 30 }}
        />
      </div>
    </div>
  );
}
