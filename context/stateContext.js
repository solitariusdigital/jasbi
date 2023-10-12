import { useState, createContext } from "react";
export const StateContext = createContext();

export const StateProvider = (props) => {
  // application user context
  const [appUsers, setAppUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [permissionControl, setPermissionControl] = useState(false);
  const [displayDetailsPopup, setDisplayDetailsPopup] = useState(false);
  const [screenSize, setScreenSize] = useState(
    "desktop" || "tablet" || "mobile"
  );
  const [menuMobile, setMenuMobile] = useState(false);
  const [navigationTopBar, setNavigationTopBar] = useState([
    {
      title: "صفحه اصلی",
      link: "/",
      active: false,
    },
    {
      title: "سیاسی و اجرایی",
      link: "/politics",
      active: false,
    },
    {
      title: "پژوهشی و علمی",
      link: "/academic",
      active: false,
    },
    {
      title: "انتشارات",
      link: "/publications",
      active: false,
    },
    {
      title: "تصاویر",
      link: "/media",
      active: false,
    },
    {
      title: "سخنرانی",
      link: "/speech",
      active: false,
    },
    {
      title: "جستجو",
      link: "/search",
      active: false,
    },
  ]);

  const stateContext = {
    menuMobile,
    setMenuMobile,
    navigationTopBar,
    setNavigationTopBar,
    currentUser,
    setCurrentUser,
    appUsers,
    setAppUsers,
    permissionControl,
    setPermissionControl,
    displayDetailsPopup,
    setDisplayDetailsPopup,
    screenSize,
    setScreenSize,
  };

  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
};
