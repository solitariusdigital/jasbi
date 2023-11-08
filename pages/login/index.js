import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import { NextSeo } from "next-seo";
import Register from "@/components/Register";
import SendForm from "@/components/SendForm";
import secureLocalStorage from "react-secure-storage";
import BannerPattern from "@/components/BannerPattern";

export default function Login() {
  const { currentUser, setCurrentUser } = useContext(StateContext);

  const logOut = () => {
    window.location.assign("/");
    secureLocalStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <NextSeo
        title="عضویت"
        description="ارتباط با دکتر جاسبی برای ارسال خاطرات و مستندات"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://jasbi.net/",
          siteName: "دکتر جاسبی",
        }}
      />
      <div className={classes.container}>
        <BannerPattern />
        <div className={classes.uploadForm}>
          {!currentUser && <Register />}
          {currentUser && <SendForm admin={false} />}
        </div>
        {currentUser && (
          <div className={classes.logout} onClick={() => logOut()}>
            <p>خروج</p>
          </div>
        )}
      </div>
    </Fragment>
  );
}
