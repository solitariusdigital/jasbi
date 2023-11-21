import { useState } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import { createSpeechApi } from "@/services/api";
import {
  onlyLettersAndNumbers,
  faToEnDigits,
  sixGenerator,
  uploadImage,
} from "@/services/utility";

export default function MediaForm({ admin }) {
  const [mediaType, setMediaType] = useState("voice" || "video" || "pdf");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [tags, setTags] = useState("");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);

  const sourceLink = "https://jasbi.storage.iran.liara.space";

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const handleSubmit = async () => {
    if (admin) {
      if (!title || !year || !description || !media) {
        showAlert("همه موارد الزامیست");
        return;
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
    let mediaFolder = "speech";
    let format = "";
    if (media) {
      let mediaId = `spe${sixGenerator()}`;
      switch (mediaType) {
        case "voice":
          format = ".mp3";
          break;
        case "video":
          format = ".mp4";
          break;
        case "pdf":
          format = ".pdf";
          break;
      }
      mediaLink = `${sourceLink}/${mediaFolder}/${mediaId}${format}`;
      await uploadImage(media, mediaId, mediaFolder, format);
    }

    let mediaObject = {
      title: title,
      year: onlyLettersAndNumbers(year) ? year : faToEnDigits(year),
      description: description,
      group: mediaFolder,
      media: mediaLink,
      mediaType: mediaType,
      tags: tags,
      confirm: false,
    };
    await createSpeechApi(mediaObject);
    window.location.assign("/speech");
  };

  return (
    <div className={classes.form}>
      <p className={classes.title}>سخنرانی</p>
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
          className={mediaType === "video" ? classes.navActive : classes.nav}
          onClick={() => {
            setMediaType("video");
            setMedia("");
          }}
        >
          ویدئو
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
      </div>
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
            <p>انتخاب فایل صوتی</p>
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
            <p>انتخاب ویدئو</p>
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
