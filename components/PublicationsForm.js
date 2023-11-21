import { useState } from "react";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import loaderImage from "@/assets/loader.png";
import { createPublicationApi } from "@/services/api";
import {
  onlyLettersAndNumbers,
  faToEnDigits,
  sixGenerator,
  uploadImage,
} from "@/services/utility";

export default function PublicationsForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("دکتر عبدالله جاسبی");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState("");
  const [tags, setTags] = useState("");
  const categories = ["مقالات", "کتاب"];
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
    if (
      !title ||
      !author ||
      !description ||
      !year ||
      !publisher ||
      !category ||
      !tags
    ) {
      showAlert("همه موارد الزامیست");
      return;
    }

    setLoader(true);
    setDisableButton(true);

    // upload media
    let mediaLink = "";
    let mediaFolder = "publications";
    if (media) {
      let imageId = `pub${sixGenerator()}`;
      mediaLink = `${sourceLink}/${mediaFolder}/${imageId}.jpg`;
      await uploadImage(media, imageId, mediaFolder, ".jpg");
    }

    let publicationObject = {
      title: title,
      author: author,
      year: onlyLettersAndNumbers(year) ? year : faToEnDigits(year),
      description: description,
      category: category,
      publisher: publisher,
      group: mediaFolder,
      media: mediaLink,
      mediaType: media ? "image" : "",
      tags: tags,
      confirm: false,
    };
    await createPublicationApi(publicationObject);
    window.location.assign("/publications");
  };

  return (
    <div className={classes.form}>
      <p className={classes.title}>انتشارات</p>
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
            سال چاپ
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
            ناشر
            <span>*</span>
          </p>
          <CloseIcon
            className="icon"
            onClick={() => setPublisher("")}
            sx={{ fontSize: 16 }}
          />
        </div>
        <input
          type="tel"
          id="publisher"
          name="publisher"
          onChange={(e) => setPublisher(e.target.value)}
          value={publisher}
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
