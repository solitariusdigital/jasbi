import classes from "./Footer.module.scss";
import { enToFaDigits } from "@/services/utility";
import Image from "next/legacy/image";
import bullet from "@/assets/bullet.png";
import logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <div
          className={classes.logo}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          <Image
            src={bullet}
            placeholder="blur"
            alt="image"
            width={60}
            height={60}
            loading="eager"
          />
          <div className={classes.image}>
            <Image width={100} height={100} src={logo} alt="logo" priority />
          </div>
          <Image
            src={bullet}
            placeholder="blur"
            alt="image"
            width={60}
            height={60}
            loading="eager"
          />
        </div>
      </div>
      <div className={classes.copyright}>
        <p>کليه حقوق اين وب سایت به دکتر جاسبی تعلق دارد</p>
        <p>jassbi.net @Copyright {enToFaDigits(1404)}</p>
      </div>
    </div>
  );
}
