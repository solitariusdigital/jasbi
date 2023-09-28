import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import { createPoliticApi } from "@/services/api";
import { onlyLettersAndNumbers, faToEnDigits } from "@/services/utility";

export default function PoliticsForm() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [activity, setActivity] = useState("");
  const [image, setImage] = useState("");
  const categories = ["قبل", "بعد"];
  const activities = [
    "قبل انقلاب",
    "حزب جمهوری اسلامی",
    "تاسیس دانشگاه آزاد اسلامی",
    "دهه اول تثبیت دانشگاه آزاد اسلامی",
    "دهه دوم گسترش کمی دانشگاه آزاد اسلامی",
    "دهه سوم گسترش کیفی دانشگاه آزاد اسلامی",
    "دهه چهارم گسترش و رقابت دانشگاه آزاد اسلامی",
  ];
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !year ||
      !description ||
      !category ||
      !position ||
      !activity
    ) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    let politicObject = {
      title: title,
      year: onlyLettersAndNumbers(year) ? year : faToEnDigits(year),
      position: position,
      description: description,
      category: category,
      activity: activity,
      image: image,
      confirm: false,
      hidden: false,
    };
    await createPoliticApi(politicObject);
    window.location.assign("/politics");
  };

  return (
    <div className={classes.form}>
      <p className={classes.title}>سیاسی و اجرایی</p>
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
            دوره انقلاب
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
        <div className={classes.bar}>
          <p className={classes.label}>
            فعالیت
            <span>*</span>
          </p>
        </div>
        <select
          defaultValue={"default"}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value="default" disabled>
            انتخاب
          </option>
          {activities.map((activity, index) => {
            return (
              <option key={index} value={activity}>
                {activity}
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
      <div className={classes.formAction}>
        <p className="alert">{alert}</p>
        {loader && (
          <div>
            <Image width={50} height={50} src={loaderImage} alt="isLoading" />
          </div>
        )}
        <button disabled={disableButton} onClick={() => handleSubmit()}>
          ذخیره
        </button>
      </div>
    </div>
  );
}
