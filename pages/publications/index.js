import { useState, useContext, useRef, Fragment, useEffect } from "react";
import classes from "./publications.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";

export default function Publications() {
  const [items, setItems] = useState([
    {
      title: "دانشگاه",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
      publication: "اول ۱۳۴۲",
      shabak: "123412341234",
    },
    {
      title: "تالیف",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
      publication: "اول ۱۳۴۲",
      shabak: "123412341234",
    },
    {
      title: "پیشرفته",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
      publication: "اول ۱۳۴۲",
      shabak: "123412341234",
    },
    {
      title: "پیشرفته",
      description:
        "دانشگاه آزاد اسلامی: نقش ایشان در ایجاد و گسترش دانشگاه آزاد اسلامی به صورت کامل و طبقه بندی شده دراین بخش توضیح داده خواهد شد",
      image:
        "https://delmare.storage.iran.liara.space/CARE584661/img724628.jpg",
      publication: "اول ۱۳۴۲",
      shabak: "123412341234",
    },
  ]);
  const [selectedItem, setSelectedItem] = useState({});
  const [displayDetails, setDisplayDetails] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        {items.map((item, index) => (
          <div
            className={classes.item}
            key={index}
            onClick={() => {
              setSelectedItem(item);
              setDisplayDetails(true);
              window.scrollTo(0, 0);
            }}
          >
            <div className={classes.row}>
              <Image
                className={classes.image}
                src={item.image}
                placeholder="blur"
                blurDataURL={item.image}
                alt="image"
                loading="eager"
                width={100}
                height={150}
                objectFit="cover"
                priority
              />
              <div>
                <h3>{item.title}</h3>
                <p>چاپ {item.publication}</p>
                <p>شابک {item.shabak}</p>
              </div>
            </div>
            <p>{item.description.slice(0, 110)} ...</p>
          </div>
        ))}
      </div>
      {displayDetails && (
        <div
          className={`${classes.preview} animate__animated animate__slideInDown`}
        >
          <CloseIcon
            className="icon"
            onClick={() => setDisplayDetails(false)}
          />
          <div className={classes.details}>
            <div className={classes.row}>
              <div>
                <h3>{selectedItem.title}</h3>
                <p>چاپ {selectedItem.publication}</p>
                <p>شابک {selectedItem.shabak}</p>
              </div>
              <Image
                className={classes.image}
                src={selectedItem.image}
                placeholder="blur"
                blurDataURL={selectedItem.image}
                alt="image"
                loading="eager"
                width={100}
                height={150}
                objectFit="cover"
                priority
              />
            </div>
            <p>{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
