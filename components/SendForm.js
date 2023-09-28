import { useState } from "react";
import classes from "./Form.module.scss";
import PoliticsForm from "./PoliticsForm";
import AcademicForm from "./AcademicForm";

export default function SendForm() {
  const [type, setType] = useState("");
  const formTypes = ["سیاسی و اجرایی", "پژوهشی و علمی"];

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
      {type === "سیاسی و اجرایی" && <PoliticsForm />}
      {type === "پژوهشی و علمی" && <AcademicForm />}
    </div>
  );
}
