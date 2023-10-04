import classes from "./Footer.module.scss";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { enToFaDigits } from "@/services/utility";
import Image from "next/legacy/image";
import logo from "@/assets/logo.svg";
import bullet from "@/assets/bullet.png";

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
          <Image width={100} height={100} src={logo} alt="logo" priority />
          <div className={classes.image}>
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
      </div>
      <div className={classes.copyright}>
        <p>کليه حقوق اين وب اپلیکیشن به دکتر جاسبی تعلق دارد</p>
        <p>jasbi.com @Copyright {enToFaDigits(1402)}</p>
        <div
          className={classes.row}
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSdqKHLBydQIfm06LTtw0wELHaDJJFGU3GNQFsVWNd3t0jz5hA/viewform?usp=sf_link",
              "_ self"
            )
          }
        >
          <p className={classes.action}>طراحی، توسعه و پشتیبانی</p>
          <PrecisionManufacturingIcon sx={{ fontSize: 18 }} />
        </div>
      </div>
    </div>
  );
}
