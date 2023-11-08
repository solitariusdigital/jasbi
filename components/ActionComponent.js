import { useState, useContext } from "react";
import { StateContext } from "@/context/stateContext";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import classes from "./ActionComponent.module.scss";
import {
  getPoliticApi,
  updatePoliticApi,
  getAcademicApi,
  updateAcademicApi,
  getPublicationApi,
  updatePublicationApi,
  getMediaApi,
  updateMediaApi,
  getSpeechApi,
  updateSpeechApi,
  getUsersApi,
} from "@/services/api";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";

export default function ActionComponent({ item, route }) {
  const { permissionControl, setPermissionControl } = useContext(StateContext);
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [password, setPassword] = useState("");

  const actionObject = {
    politics: {
      get: getPoliticApi,
      update: updatePoliticApi,
    },
    publications: {
      get: getPublicationApi,
      update: updatePublicationApi,
    },
    academic: {
      get: getAcademicApi,
      update: updateAcademicApi,
    },
    media: {
      get: getMediaApi,
      update: updateMediaApi,
    },
    speech: {
      get: getSpeechApi,
      update: updateSpeechApi,
    },
  };

  const action = async (id, type) => {
    const users = await getUsersApi();
    const admin = users.find((user) => user["_id"] === currentUser["_id"]);

    const decryptedBytes = AES.decrypt(
      admin.code,
      process.env.NEXT_PUBLIC_CRYPTO_SECRETKEY
    );
    const decryptedPassword = decryptedBytes.toString(enc.Utf8);

    if (decryptedPassword === password) {
      const message = `${
        type === "confirm" ? "انتشار مطمئنی؟" : "پنهان مطمئنی؟"
      }`;
      const confirm = window.confirm(message);
      if (confirm) {
        let data = await actionObject[route].get(id);
        switch (type) {
          case "confirm":
            data.confirm = true;
            break;
          case "cancel":
            data.confirm = false;
            break;
        }
        await actionObject[route].update(data);
        window.location.assign(`/${route}`);
      }
    } else {
      window.confirm("کد تایید اشتباه");
    }
  };

  return (
    <div>
      {permissionControl === "super" && (
        <div className={classes.action}>
          {!item.confirm && (
            <TaskAltIcon
              className={classes.icon}
              sx={{ color: "#57a361" }}
              onClick={() => action(item["_id"], "confirm")}
            />
          )}
          {item.confirm && (
            <CloseIcon
              className={classes.icon}
              sx={{ color: "#cd3d2c" }}
              onClick={() => action(item["_id"], "cancel")}
            />
          )}
          <input
            placeholder="کد تایید"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            maxLength={6}
            autoComplete="off"
          />
        </div>
      )}
    </div>
  );
}
