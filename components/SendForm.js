import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";

export default function SendForm() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");
  const [period, setPeriod] = useState("");
  const [image, setImage] = useState("");

  const categories = ["سیاسی و اجرایی", "پژوهشی و علمی"];
  const categoriesPeriod = ["قبل", "بعد"];
  const [alert, setAlert] = useState("");

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleSubmit = () => {
    if (!title || !year || !description || !category) {
      showAlert("همه موارد الزامیست");
      return;
    }
    if (category === "سیاسی و اجرایی") {
      if (!period || !position) {
        showAlert("همه موارد الزامیست");
        return;
      }
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
          placeholder="۱۳۷۰"
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
        <div className={classes.bar}>
          <p className={classes.label}>
            دسته بندی
            <span>*</span>
          </p>
        </div>
        <select
          defaultValue={"default"}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="default" disabled>
            انتخاب
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
      {category === "سیاسی و اجرایی" && (
        <Fragment>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                سمت
                <span>*</span>
              </p>
              <CloseIcon
                className="icon"
                onClick={() => setPosition("")}
                sx={{ fontSize: 16 }}
              />
            </div>
            <input
              type="text"
              id="position"
              name="position"
              onChange={(e) => setPosition(e.target.value)}
              value={position}
              autoComplete="off"
              dir="rtl"
            />
          </div>
          <div className={classes.input}>
            <div className={classes.bar}>
              <p className={classes.label}>
                دوره انقلاب
                <span>*</span>
              </p>
            </div>
            <select
              defaultValue={"default"}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="default" disabled>
                انتخاب
              </option>
              {categoriesPeriod.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </Fragment>
      )}
      <div className={classes.input}>
        <p className={classes.label}>
          توضیحات
          <span>*</span>
        </p>
        <textarea
          placeholder="..."
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          autoComplete="off"
          dir="rtl"
        ></textarea>
      </div>
      <div className={classes.input}>
        <label className={classes.file}>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            accept="image/*"
          />
          <p>عکس اختیاری</p>
        </label>
        {image !== "" && (
          <div className={classes.imagePreview}>
            <CloseIcon
              className="icon"
              onClick={() => setImage("")}
              sx={{ fontSize: 16 }}
            />
            <Image
              className={classes.image}
              width={50}
              height={200}
              objectFit="cover"
              src={URL.createObjectURL(image)}
              alt="image"
              priority
            />
          </div>
        )}
      </div>
      <p className="alert">{alert}</p>
      <button onClick={() => handleSubmit()}>ارسال</button>
    </div>
  );
}
