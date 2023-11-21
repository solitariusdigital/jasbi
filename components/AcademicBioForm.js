import { useState } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import {
  createAcademicApi,
  createBiographyApi,
  updateAcademicApi,
  updateBiographyApi,
} from "@/services/api";
import {
  onlyLettersAndNumbers,
  faToEnDigits,
  enToFaDigits,
  sixGenerator,
  uploadImage,
} from "@/services/utility";

export default function AcademicBioForm({ admin, type, editData }) {
  const [title, setTitle] = useState(editData ? editData.title : "");
  const [year, setYear] = useState(editData ? enToFaDigits(editData.year) : "");
  const [description, setDescription] = useState(
    editData ? editData.description : ""
  );
  const [category, setCategory] = useState(editData ? editData.category : "");
  const [media, setMedia] = useState(editData ? editData.media : "");
  const [tags, setTags] = useState(editData ? editData.tags : "");
  const categories = ["پروژه", "دستاورد", "تدریس"];
  const [alert, setAlert] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editMedia, setEditMedia] = useState(editData ? true : false);

  const sourceLink = "https://jasbi.storage.iran.liara.space";

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
    if (media.size > maxSizeInBytes) {
      showAlert("1MB سایز عکس کمتر از");
      removeMediaInputFile();
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
    if (media && !editMedia) {
      let imageId = `aca${sixGenerator()}`;
      mediaLink = `${sourceLink}/${mediaFolder}/${imageId}.jpg`;
      await uploadImage(media, imageId, mediaFolder, ".jpg");
    } else {
      mediaLink = media;
    }

    let dataObject = {
      title: title,
      year: onlyLettersAndNumbers(year) ? year : faToEnDigits(year),
      description: description,
      category: category,
      group: mediaFolder,
      media: mediaLink,
      mediaType: media ? "image" : "",
      tags: tags,
      confirm: false,
    };
    if (type === "academic") {
      if (editData) {
        dataObject.id = editData["_id"];
        await updateAcademicApi(dataObject);
      } else {
        await createAcademicApi(dataObject);
      }
    } else {
      if (editData) {
        dataObject.id = editData["_id"];
        await updateBiographyApi(dataObject);
      } else {
        await createBiographyApi(dataObject);
      }
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
              {editData ? category : "انتخاب"}
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
              {
                setMedia(e.target.files[0]);
                setEditMedia(false);
              }
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
              src={editMedia ? media : URL.createObjectURL(media)}
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
