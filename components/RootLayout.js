import { useState, useContext, Fragment, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import secureLocalStorage from "react-secure-storage";
import Image from "next/legacy/image";

export default function RootLayout({ children }) {
  const { navigationTopBar, setNavigationTopBar } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [appLoader, setAppLoader] = useState(false);

  const router = useRouter();
  let pathname = router.pathname;

  useEffect(() => {
    navigationTopBar.map((nav) => {
      if (nav.link === "/") {
        navigationTopBar[0].active = true;
      } else if (pathname.includes(nav.link)) {
        navigationTopBar[0].active = false;
        nav.active = true;
      } else {
        nav.active = false;
      }
    });
    setNavigationTopBar([...navigationTopBar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAppLoader(true);
    }, 500);
  }, [setCurrentUser]);

  return (
    <Fragment>
      {appLoader ? (
        <Fragment>
          <div className="menu">
            <Menu />
          </div>
          <div className="main">
            <main>{children}</main>
          </div>
          <Footer />
        </Fragment>
      ) : (
        <div className="appload">
          {/* <Image
            className="animate__animated animate__heartBeat"
            width={150}
            height={150}
            src={logo}
            alt="logo"
            priority
          /> */}
        </div>
      )}
    </Fragment>
  );
}
