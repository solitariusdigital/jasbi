import classes from "./Footer.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import Image from "next/legacy/image";
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
        <div className={classes.information}>
          <div className={classes.row}>
            <LocationOnOutlinedIcon />
            <p>تهران، فرشته، خیابان نیلوفر، مجتمع یوتوپیا، طبقه ۴</p>
          </div>
          <div className={classes.row}>
            <PhoneIphoneOutlinedIcon />
            <p>۰۲۱ ۹۱۶۹۰۰۳۰</p>
          </div>
          <div
            className={classes.row}
            onClick={() =>
              window.open(
                "https://www.instagram.com/belleclass.official",
                "_ blank"
              )
            }
          >
            <InstagramIcon className="icon" />
            <p>belleclass.official</p>
          </div>
        </div>
      </div>
    </div>
  );
}
