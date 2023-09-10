import classes from "./Footer.module.scss";
import Router from "next/router";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.information}>info</div>
      </div>
    </div>
  );
}
