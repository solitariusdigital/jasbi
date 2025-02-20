import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./Menu.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import logo from "@/assets/logo.svg";
import Router from "next/router";
import SearchIcon from "@mui/icons-material/Search";

export default function Menu() {
  const { menuMobile, setMenuMobile } = useContext(StateContext);
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { displayDetailsPopup, setDisplayDetailsPopup } =
    useContext(StateContext);
  const { screenSize, setScreenSize } = useContext(StateContext);

  const activateNav = (link, index) => {
    setDisplayDetailsPopup(false);
    setMenuMobile(false);
    navigationTopBar.map((nav, i) => {
      if (i === index) {
        Router.push(link);
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
  };

  return (
    <div className={classes.container}>
      {screenSize === "desktop" && (
        <div className={classes.largeMenu}>
          <div className={classes.largeNavigation}>
            {navigationTopBar
              .map((nav, index) => (
                <Fragment key={index}>
                  <div
                    className={!nav.active ? classes.nav : classes.navActive}
                    onClick={() => activateNav(nav.link, index)}
                  >
                    <p>{nav.title}</p>
                    {nav.title === "جستجو" && (
                      <SearchIcon className={classes.icon} />
                    )}
                  </div>
                </Fragment>
              ))
              .reverse()}
          </div>
          <button onClick={() => Router.push("/login")}>
            ارتباط با دکتر جاسبی
          </button>
          <Image
            className={classes.logo}
            width={70}
            height={50}
            src={logo}
            alt="logo"
            onClick={() => window.location.assign("/")}
            priority
          />
        </div>
      )}
      {screenSize !== "desktop" && (
        <div className={classes.smallMenu}>
          <div className={classes.topBar}>
            {menuMobile ? (
              <CloseIcon
                className="icon"
                onClick={() => setMenuMobile(!menuMobile)}
                sx={{ fontSize: 30 }}
              />
            ) : (
              <MenuIcon
                className="icon"
                onClick={() => setMenuMobile(!menuMobile)}
                sx={{ fontSize: 30 }}
              />
            )}
            <Image
              className={classes.logo}
              width={70}
              height={50}
              src={logo}
              alt="logo"
              onClick={() => window.location.assign("/")}
              priority
            />
          </div>
          {menuMobile && (
            <Fragment>
              <div
                className={`${classes.menuMobile} animate__animated animate__slideInDown`}
              >
                <div className={classes.menuItems}>
                  {navigationTopBar.map((nav, index) => (
                    <Fragment key={index}>
                      <div
                        className={
                          !nav.active ? classes.nav : classes.navActive
                        }
                        onClick={() => activateNav(nav.link, index)}
                      >
                        <p>{nav.title}</p>
                        {nav.title === "جستجو" && (
                          <SearchIcon className={classes.icon} />
                        )}
                      </div>
                    </Fragment>
                  ))}
                  <button
                    onClick={() => {
                      Router.push("/login");
                      setMenuMobile(false);
                    }}
                  >
                    ارتباط با دکتر جاسبی
                  </button>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
}
