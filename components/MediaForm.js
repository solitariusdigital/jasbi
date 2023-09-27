import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";

export default function MediaForm() {
  const [mediaType, setMediaType] = useState("image" || "video");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [category, setCategory] = useState("");

  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleSubmit = () => {
    if (!title || !year || !description || !media) {
      showAlert("همه موارد الزامیست");
      return;
    }
  };

  return (
    <div className={classes.form}>
      <p className={classes.title}>بارگذاری رسانه ای ​</p>
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
      <div className={classes.navigation}>
        <p
          className={mediaType === "video" ? classes.navActive : classes.nav}
          onClick={() => setMediaType("video")}
        >
          ویدئو
        </p>
        <p
          className={mediaType === "image" ? classes.navActive : classes.nav}
          onClick={() => setMediaType("image")}
        >
          عکس
        </p>
      </div>
      {mediaType === "image" && (
        <div className={classes.input}>
          <label className={classes.file}>
            <input
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
              type="file"
              accept="image/*"
            />
            <p>انتخاب عکس</p>
          </label>
          {media !== "" && (
            <div className={classes.imagePreview}>
              <CloseIcon
                className="icon"
                onClick={() => setMedia("")}
                sx={{ fontSize: 16 }}
              />
              <Image
                className={classes.image}
                width={300}
                height={200}
                objectFit="contain"
                src={URL.createObjectURL(media)}
                alt="image"
                priority
              />
            </div>
          )}
        </div>
      )}
      {mediaType === "video" && (
        <div className={classes.input}>
          <label className={classes.file}>
            <input
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
              type="file"
              accept="video/*"
            />
            <p>انتخاب ویدئو</p>
          </label>
          {media !== "" && (
            <div className={classes.imagePreview}>
              <CloseIcon
                className="icon"
                onClick={() => setMedia("")}
                sx={{ fontSize: 16 }}
              />
              <video
                className={classes.imagePreview}
                width={300}
                preload="metadata"
                src={URL.createObjectURL(media)}
                controls
              />
            </div>
          )}
        </div>
      )}
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
