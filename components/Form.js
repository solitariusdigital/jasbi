import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Register.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { toFarsiNumber, onlyLettersAndNumbers } from "@/services/utility";

export default function Form() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["سیاسی و اجرایی", "پژوهشی و علمی"];
  const [alert, setAlert] = useState("");

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleSubmit = () => {
    if (onlyLettersAndNumbers(year)) {
      setYear(toFarsiNumber(year));
    }
    if (!title || !year || !comment || !category) {
      showAlert("همه موارد الزامیست");
      return;
    }
  };

  return (
    <div className={classes.form}>
      <p className={classes.title}>ارسال خاطرات و مستندات​</p>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p className={classes.label}>
            عنوان
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setTitle("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          placeholder="دانشگاه آزاد"
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoComplete="off"
          dir="rtl"
        />
      </div>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p className={classes.label}>
            سال
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setYear("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          placeholder={toFarsiNumber(1360)}
          type="tel"
          id="year"
          name="year"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          autoComplete="off"
          dir="rtl"
        />
      </div>
      <div className={classes.input}>
        <select
          defaultValue={"default"}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="default" disabled>
            دسته بندی
          </option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className={classes.input}>
        <p className={classes.label}>
          توضیحات
          <span>*</span>
        </p>
        <textarea
          placeholder="..."
          type="text"
          id="comment"
          name="comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          autoComplete="off"
          dir="rtl"
        ></textarea>
      </div>
      <p className="alert">{alert}</p>
      <button onClick={() => handleSubmit()}>ارسال</button>
    </div>
  );
}
