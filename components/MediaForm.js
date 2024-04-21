import { useState, useEffect } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import { createMediaApi, updateMediaApi } from "@/services/api";
import {
  onlyLettersAndNumbers,
  faToEnDigits,
  enToFaDigits,
  sixGenerator,
  uploadImage,
} from "@/services/utility";

export default function MediaForm({ admin, editData }) {
  const [mediaType, setMediaType] = useState("image" || "video");
  const [title, setTitle] = useState(editData ? editData.title : "");
  const [year, setYear] = useState(editData ? enToFaDigits(editData.year) : "");
  const [description, setDescription] = useState(
    editData ? editData.description : ""
  );
  const [media, setMedia] = useState(editData ? editData.media : "");
  const [tags, setTags] = useState(editData ? editData.tags : "");
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editMedia, setEditMedia] = useState(editData ? true : false);

  const sourceLink = "https://jassbi.storage.iran.liara.space";

  useEffect(() => {
    if (editData) {
      setMediaType(editData.mediaType);
    }
  }, [editData]);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const removeMediaInputFile = () => {
    const inputFile = document.getElementById("inputFile");
    inputFile.value = null;
  };

  const handleSubmit = async () => {
    const maxSizeInBytes = 1 * 1024 * 1024;
    if (media && mediaType === "image" && media.size > maxSizeInBytes) {
      showAlert("1MB سایز عکس کمتر از");
      removeMediaInputFile();
      return;
    }
    if (admin) {
      if (!title || !year || !description || !media || !tags) {
        showAlert("همه موارد الزامیست");
        return;
      }
    } else {
      if (!title || !media) {
        showAlert("عنوان و فایل الزامیست");
        return;
      }
    }

    setLoader(true);
    setDisableButton(true);

    // upload media
    let mediaLink = "";
    let mediaFolder = "media";
    if (media && !editMedia) {
      let mediaId = `med${sixGenerator()}`;
      let format = mediaType === "image" ? ".jpg" : ".mp4";
      mediaLink = `${sourceLink}/${mediaFolder}/${mediaId}${format}`;
      await uploadImage(media, mediaId, mediaFolder, format);
    } else {
      mediaLink = media;
    }

    let dataObject = {
      title: title,
      year: onlyLettersAndNumbers(year) ? year : faToEnDigits(year),
      description: description,
      group: mediaFolder,
      media: mediaLink,
      mediaType: mediaType,
      tags: tags,
      confirm: false,
    };
    if (editData) {
      dataObject.id = editData["_id"];
      await updateMediaApi(dataObject);
    } else {
      await createMediaApi(dataObject);
    }
    window.location.assign("/media");
  };

  return (
    <div className={classes.form}>
      <p className={classes.title}>تصاویر​</p>
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
                setEditMedia(false);
              }}
              id="inputFile"
              type="file"
              accept="image/*"
            />
            <p>انتخاب عکس</p>
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
                src={editMedia ? media : URL.createObjectURL(media)}
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
                setEditMedia(false);
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
                src={editMedia ? media : URL.createObjectURL(media)}
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
