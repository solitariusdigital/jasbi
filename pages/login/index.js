import { Fragment, useContext, useState } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import { NextSeo } from "next-seo";
import Register from "@/components/Register";
import SendForm from "@/components/SendForm";
import secureLocalStorage from "react-secure-storage";
import CloseIcon from "@mui/icons-material/Close";
import BannerPattern from "@/components/BannerPattern";
import { createUserApi, getUsersApi, updateUserApi } from "@/services/api";

export default function Login() {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const [disableButton, setDisableButton] = useState(false);
  const [phone, setPhone] = useState("");
  const [alert, setAlert] = useState("");

  const logOut = () => {
    window.location.assign("/");
    secureLocalStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const handleAdmin = async (type) => {
    if (!phone) {
      showAlert("موبایل خالی");
      return;
    }
    const isPhoneNumberValid =
      phone.length === 11 && phone.slice(0, 2) === "09";
    setDisableButton(true);
    if (isPhoneNumberValid) {
      const data = await getUsersApi();
      const userData = data.find((user) => user.phone === phone);
      let user = {
        name: "",
        phone: phone.trim(),
        permission: "admin",
        code: "",
      };
      if (userData) {
        user.name = userData.name;
        user._id = userData._id;
      }
      switch (type) {
        case "add":
          if (userData) {
            await updateUserApi(user);
          } else {
            await createUserApi(user);
          }
          break;
        case "remove":
          if (userData) {
            user.permission = "user";
          }
          await updateUserApi(user);
          break;
      }
      showAlert("انجام شد");
      setPhone("");
    } else {
      showAlert("موبایل اشتباه");
    }
    setDisableButton(false);
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <Fragment>
      <NextSeo
        title="عضویت"
        description="ارتباط با دکتر جاسبی برای ارسال خاطرات و مستندات"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://jassbi.net/",
          siteName: "دکتر جاسبی",
        }}
      />
      <div className={classes.container}>
        <BannerPattern />
        {permissionControl === "user" && (
          <div className={classes.uploadForm}>
            {!currentUser && <Register />}
            {currentUser && <SendForm admin={false} />}
          </div>
        )}
        {permissionControl === "super" && (
          <div className={classes.controlPanel}>
            <h3>کنترل پنل مدیر سایت</h3>
            <p className="message">افزودن یا حذف ادمین</p>
            <div className={classes.input}>
              <div className={classes.bar}>
                <p className={classes.label}>
                  <span>*</span>
                  موبایل
                </p>
                <CloseIcon
                  className="icon"
                  onClick={() => setPhone("")}
                  sx={{ fontSize: 16 }}
                />
              </div>
              <input
                placeholder="09121234567"
                type="tel"
                id="phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                autoComplete="off"
                dir="rtl"
              />
            </div>
            <div className={classes.button}>
              <button
                className={classes.remove}
                disabled={disableButton}
                onClick={() => handleAdmin("remove")}
              >
                حذف ادمین
              </button>
              <button
                disabled={disableButton}
                onClick={() => handleAdmin("add")}
              >
                افزودن ادمین
              </button>
            </div>
            <p className="alert">{alert}</p>
          </div>
        )}
        {currentUser && (
          <div className={classes.logout}>
            <p onClick={() => logOut()}>خروج</p>
          </div>
        )}
      </div>
    </Fragment>
  );
}
