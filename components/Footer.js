import classes from "./Footer.module.scss";
import Router from "next/router";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <button
          className={classes.register}
          onClick={() => Router.push("/register")}
        >
          ورود ​/ ثبت نام
        </button>
        <div className={classes.information}>info</div>
      </div>
    </div>
  );
}
