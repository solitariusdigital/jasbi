import classes from "./Footer.module.scss";
import { enToFaDigits } from "@/services/utility";
import Image from "next/legacy/image";
import bullet from "@/assets/bullet.png";
import logo from "@/assets/logo.svg";
import MuseTechLab from "@/assets/MuseTechLab.svg";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

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
            width={80}
            height={80}
            loading="eager"
          />
          <div className={classes.image}>
            <Image width={100} height={100} src={logo} alt="logo" priority />
          </div>
          <Image
            src={bullet}
            placeholder="blur"
            alt="image"
            width={80}
            height={80}
            loading="eager"
          />
        </div>
      </div>
      <div className={classes.copyright}>
        <p>کليه حقوق اين وب سایت به دکتر جاسبی تعلق دارد</p>
        <p>jasbi.net @Copyright {enToFaDigits(1402)}</p>
        {/* <div
          className={classes.row}
          onClick={() => window.open("https://musetechlab.com/")}
        >
          <Image
            className={classes.image}
            src={MuseTechLab}
            alt="image"
            width={120}
            height={30}
            loading="eager"
          />
          <p className={classes.action}>طراحی توسعه پشتیبانی</p>
          <PrecisionManufacturingIcon sx={{ fontSize: 18 }} />
        </div> */}
      </div>
    </div>
  );
}
