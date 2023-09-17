import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";

export default function PublicationsForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("دکتر عبدالله جاسبی");
  const [description, setDescription] = useState("");
  const [publication, setPublication] = useState("");
  const [shabak, setShabak] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const categories = ["مقالات", "کتاب"];
  const [alert, setAlert] = useState("");

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleSubmit = () => {
    if (
      !title ||
      !publication ||
      !description ||
      !category ||
      !shabak ||
      !author
    ) {
      showAlert("همه موارد الزامیست");
      return;
    }
  };

  return (
    <div className={classes.form}>
      <p className={classes.title}>انتشارات جدید</p>
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
            گردآورنده
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setAuthor("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          type="text"
          id="author"
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          autoComplete="off"
          dir="rtl"
        />
      </div>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p className={classes.label}>
            چاپ
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setPublication("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          placeholder="اول ۱۳۷۰"
          type="tel"
          id="publication"
          name="publication"
          onChange={(e) => setPublication(e.target.value)}
          value={publication}
          autoComplete="off"
          dir="rtl"
        />
      </div>
      <div className={classes.input}>
        <div className={classes.bar}>
          <p className={classes.label}>
            شابک
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setShabak("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          type="tel"
          id="shabak"
          name="shabak"
          onChange={(e) => setShabak(e.target.value)}
          value={shabak}
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
      <div className={classes.input}>
        <p className={classes.label}>
          خلاصه
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
            accept="image/png, image/jpeg"
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
      <button onClick={() => handleSubmit()}>ذخیره</button>
    </div>
  );
}
