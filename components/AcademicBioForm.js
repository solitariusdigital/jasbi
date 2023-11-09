import { useState } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import { createAcademicApi, createBiographyApi } from "@/services/api";
import {
  onlyLettersAndNumbers,
  faToEnDigits,
  sixGenerator,
  uploadImage,
} from "@/services/utility";

export default function AcademicBioForm({ admin, type }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState("");
  const [tags, setTags] = useState("");
  const categories = ["پروژه", "دستاور", "تدریس"];
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
    const maxSizeInBytes = 1 * 1024 * 1024;
    if (media.size > maxSizeInBytes) {
      showAlert("1MB سایز عکس کمتر از");
      const inputFile = document.getElementById("inputFile");
      inputFile.value = null;
      return;
    }
    if (admin) {
      if (!title || !year || !description || !tags) {
        showAlert("همه موارد الزامیست");
        return;
      }
      if (type === "academic") {
        if (!category) {
          showAlert("همه موارد الزامیست");
          return;
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

    // upload image
    let mediaLink = "";
    let mediaFolder = type;
    if (media) {
      let imageId = `img${sixGenerator()}`;
      mediaLink = `${sourceLink}/${mediaFolder}/${imageId}.jpg`;
      await uploadImage(media, imageId, mediaFolder, ".jpg");
    }

    let dataObject = {
      title: title,
      year: onlyLettersAndNumbers(year) ? year : faToEnDigits(year),
      description: description,
      category: category,
      group: mediaFolder,
      media: mediaLink,
      mediaType: "image",
      tags: tags,
      confirm: false,
    };
    if (type === "academic") {
      await createAcademicApi(dataObject);
    } else {
      await createBiographyApi(dataObject);
    }
    window.location.assign(`/${type}`);
  };

  return (
    <div className={classes.form}>
      <p className={classes.title}>
        {type === "academic" ? "پژوهشی و علمی" : "زندگینامه"}
      </p>
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
      {type === "academic" && (
        <div className={classes.input}>
          <div className={classes.bar}>
            <p className={classes.label}>
              دسته بندی
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
          <p>عکس اختیاری</p>
        </label>
        {media && (
          <div className={classes.mediaPreview}>
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
