import { useState } from "react";
import classes from "./Form.module.scss";
import PoliticsForm from "./PoliticsForm";
import AcademicBioForm from "./AcademicBioForm";
import MediaForm from "./MediaForm";
import SpeechForm from "./SpeechForm";

export default function SendForm({ admin }) {
  const [type, setType] = useState("");
  const formTypes = ["سیاسی و اجرایی", "پژوهشی و علمی", "تصاویر", "سخنرانی"];

  return (
    <div className={classes.form}>
      <p className={classes.title}>ارسال خاطرات و مستندات​</p>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p className={classes.label}>
            دسته بندی
            <span>*</span>
          </p>
        </div>
        <select
          defaultValue={"default"}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="default" disabled>
            انتخاب
          </option>
          {formTypes.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
      </div>
      {type === "سیاسی و اجرایی" && <PoliticsForm admin={admin} />}
      {type === "پژوهشی و علمی" && (
        <AcademicBioForm admin={admin} type={"academic"} />
      )}
      {type === "تصاویر" && <MediaForm admin={admin} />}
      {type === "سخنرانی" && <SpeechForm admin={admin} />}
    </div>
  );
}
