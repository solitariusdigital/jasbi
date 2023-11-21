import { useState } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import { createPoliticApi } from "@/services/api";
import {
  onlyLettersAndNumbers,
  faToEnDigits,
  sixGenerator,
  uploadImage,
} from "@/services/utility";

export default function PoliticsForm({ admin }) {
  const [mediaType, setMediaType] = useState(
    "image" || "video" || "voice" || "pdf"
  );
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [activity, setActivity] = useState("");
  const [media, setMedia] = useState("");
  const [tags, setTags] = useState("");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);

  const categories = ["قبل انقلاب", "بعد انقلاب"];
  const types = [
    "قبل حزب جمهوری اسلامی",
    "حزب جمهوری اسلامی",
    "دانشگاه آزاد اسلامی",
    "جامعه اسلامی دانشگاهیان",
    "جشنواره تلاشگران کیفیت",
    "بنیاد آفرینش انس",
    "چکاد آزاد اندیشان",
  ];
  const uniActivities = [
    "تاسیس دانشگاه آزاد اسلامی",
    "دهه اول تثبیت دانشگاه آزاد اسلامی",
    "دهه دوم گسترش کمی دانشگاه آزاد اسلامی",
    "دهه سوم گسترش کیفی دانشگاه آزاد اسلامی",
    "دهه چهارم گسترش و رقابت دانشگاه آزاد اسلامی",
    "دستاوردهای دانشگاه آزاد اسلامی",
  ];
  const onsActivities = [
    "اهداف و ساختار",
    "جلسات برگزار شده و سخنرانان",
    "صورتجلسات و مصوبات",
    "دعوتنامه برگزاری جلسات",
    "انتشارات",
  ];

  const sourceLink = "https://jasbi.storage.iran.liara.space";

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleSubmit = async () => {
    const maxSizeInBytes = 1 * 1024 * 1024;
    if (mediaType === "image" && media.size > maxSizeInBytes) {
      showAlert("1MB سایز عکس کمتر از");
      const inputFile = document.getElementById("inputFile");
      inputFile.value = null;
      return;
    }
    if (admin) {
      if (!title || !year || !description || !category || !position || !tags) {
        showAlert("همه موارد الزامیست");
        return;
      }
      if (category === "بعد انقلاب") {
        if (!type) {
          showAlert("همه موارد الزامیست");
          return;
        }
        if (type === "دانشگاه آزاد اسلامی") {
          if (!activity) {
            showAlert("همه موارد الزامیست");
            return;
          }
        }
      }
    } else {
      if (!title) {
        showAlert("عنوان  الزامیست");
        return;
      }
    }

    setLoader(true);
    setDisableButton(true);

    // upload media
    let mediaLink = "";
    let mediaFolder = "politics";
    let format = "";
    if (media) {
      let mediaId = `pol${sixGenerator()}`;
      switch (mediaType) {
        case "voice":
          format = ".mp3";
          break;
        case "video":
          format = ".mp4";
          break;
        case "image":
          format = ".jpg";
          break;
        case "pdf":
          format = ".pdf";
          break;
      }
      mediaLink = `${sourceLink}/${mediaFolder}/${mediaId}${format}`;
      await uploadImage(media, mediaId, mediaFolder, format);
    }

    let politicObject = {
      title: title,
      year: onlyLettersAndNumbers(year) ? year : faToEnDigits(year),
      position: position,
      description: description,
      category: category,
      type: type,
      activity: activity,
      group: mediaFolder,
      media: mediaLink,
      mediaType: media ? mediaType : "",
      tags: tags,
      confirm: false,
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
            {admin && <span>*</span>}
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
            {admin && <span>*</span>}
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
            {admin && <span>*</span>}
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
      {category === "بعد انقلاب" && (
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              فعالیت
              {admin && <span>*</span>}
            </p>
          </div>
          <select
            defaultValue={"default"}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="default" disabled>
              انتخاب
            </option>
            {types.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {type === "دانشگاه آزاد اسلامی" && (
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              دوره
              {admin && <span>*</span>}
            </p>
          </div>
          <select
            defaultValue={"default"}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="default" disabled>
              انتخاب
            </option>
            {uniActivities.map((activity, index) => {
              return (
                <option key={index} value={activity}>
                  {activity}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {type === "بنیاد آفرینش انس" && (
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              بخش
              {admin && <span>*</span>}
            </p>
          </div>
          <select
            defaultValue={"default"}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="default" disabled>
              انتخاب
            </option>
            {onsActivities.map((activity, index) => {
              return (
                <option key={index} value={activity}>
                  {activity}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {admin && (
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              کلمات کلیدی
              <span>*</span>
            </p>
            <CloseIcon
              className="icon"
              onClick={() => setTags("")}
              sx={{ fontSize: 16 }}
            />
          </div>
          <input
            placeholder="دانشگاه علم فرهنگ"
            type="text"
            id="tags"
            name="tags"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            autoComplete="off"
            dir="rtl"
          />
        </div>
      )}
      <div className={classes.input}>
        <p className={classes.label}>
          خلاصه
          {admin && <span>*</span>}
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
          className={mediaType === "pdf" ? classes.navActive : classes.nav}
          onClick={() => {
            setMediaType("pdf");
            setMedia("");
          }}
        >
          pdf
        </p>
        <p
          className={mediaType === "voice" ? classes.navActive : classes.nav}
          onClick={() => {
            setMediaType("voice");
            setMedia("");
          }}
        >
          صوتی
        </p>
        <p
          className={mediaType === "video" ? classes.navActive : classes.nav}
          onClick={() => {
            setMediaType("video");
            setMedia("");
          }}
        >
          ویدئو
        </p>
        <p
          className={mediaType === "image" ? classes.navActive : classes.nav}
          onClick={() => {
            setMediaType("image");
            setMedia("");
          }}
        >
          عکس
        </p>
      </div>
      {mediaType === "image" && (
        <div className={classes.input}>
          <label className="file">
            <input
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
              id="inputFile"
              type="file"
              accept="image/*"
            />
            <p>انتخاب عکس اختیاری</p>
          </label>
          {media && (
            <div className={classes.mediaPreview}>
              <CloseIcon
                className="icon"
                onClick={() => setMedia("")}
                sx={{ fontSize: 16 }}
              />
              <Image
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
          <label className="file">
            <input
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
              type="file"
              accept="video/*"
            />
            <p>انتخاب ویدئو اختیاری</p>
          </label>
          {media !== "" && (
            <div className={classes.mediaPreview}>
              <CloseIcon
                className="icon"
                onClick={() => setMedia("")}
                sx={{ fontSize: 16 }}
              />
              <video
                className={classes.media}
                preload="metadata"
                src={URL.createObjectURL(media)}
                controls
              />
            </div>
          )}
        </div>
      )}
      {mediaType === "voice" && (
        <div className={classes.input}>
          <label className="file">
            <input
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
              type="file"
              accept="audio/*"
            />
            <p>انتخاب فایل صوتی اختیاری</p>
          </label>
          {media !== "" && (
            <div className={classes.mediaPreview}>
              <CloseIcon
                className="icon"
                onClick={() => setMedia("")}
                sx={{ fontSize: 16 }}
              />
              <audio className={classes.voice} preload="metadata" controls>
                <source src={URL.createObjectURL(media)} />
              </audio>
            </div>
          )}
        </div>
      )}
      {mediaType === "pdf" && (
        <div className={classes.input}>
          <label className="file">
            <input
              onChange={(e) => {
                setMedia(e.target.files[0]);
              }}
              type="file"
              accept=".pdf"
            />
            <p>اختیاری pdf انتخاب فایل</p>
          </label>
          {media !== "" && (
            <div className={classes.mediaPreview}>
              <CloseIcon
                className="icon"
                onClick={() => setMedia("")}
                sx={{ fontSize: 16 }}
              />
              <embed
                className={classes.media}
                src={URL.createObjectURL(media)}
                height="300px"
                type="application/pdf"
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
