import { useState, useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "../pages.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import dbConnect from "@/services/dbConnect";
import academicModel from "@/models/Academic";
import publicationModel from "@/models/Publication";
import politicModel from "@/models/Politic";
import { NextSeo } from "next-seo";
import pattern from "@/assets/pattern.png";
import {
  enToFaDigits,
  onlyLettersAndNumbers,
  faToEnDigits,
  sliceString,
} from "@/services/utility";

export default function Search({ archiveArray }) {
  const { screenSize, setScreenSize } = useContext(StateContext);

  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [displayDetails, setDisplayDetails] = useState(false);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const searchDocuments = () => {
    setSearchEmpty(false);
    let searchDocuments = [];
    if (search) {
      searchDocuments = archiveArray.filter((item) =>
        Object.values(item).some((val) =>
          String(val).includes(
            onlyLettersAndNumbers(search) ? search.trim() : faToEnDigits(search)
          )
        )
      );
      setDocuments(searchDocuments);
      if (searchDocuments.length === 0) {
        setSearchEmpty(true);
      }
    }
  };

  const generateBanner = () => {
    let length = 0;
    switch (screenSize) {
      case "desktop":
        length = 4;
        break;
      case "tablet":
        length = 3;
        break;
      case "mobile":
        length = 1;
        break;
    }
    return (
      <Fragment>
        {Array.from(Array(length)).map((item, index) => {
          return (
            <div key={index} className={classes.image}>
              <Image
                src={pattern}
                placeholder="blur"
                alt="image"
                layout="fill"
                objectFit="cover"
                loading="eager"
              />
            </div>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <NextSeo
        title="جستجو"
        description="جستجو متن، عنوان، سمت، فعالیت، سال"
        openGraph={{
          type: "website",
          locale: "fa_IR",
          url: "https://jasbi.net/",
          siteName: "دکتر جاسبی",
        }}
      />
      <div className={classes.container}>
        <div className={classes.bannerContainer}>{generateBanner()}</div>
        <div className={classes.inputSearch}>
          <button onClick={() => searchDocuments()}>جستجو</button>
          <input
            placeholder="جستجو ... متن، عنوان، سمت، فعالیت، سال"
            type="text"
            id="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            maxLength={30}
            value={search}
            autoComplete="off"
            dir="rtl"
          />
          <CloseIcon
            className="icon"
            onClick={() => {
              setDocuments([]);
              setSearch("");
              setSearchEmpty(false);
            }}
          />
        </div>
        {searchEmpty && (
          <p className="message">مطلبی برای نمایش موجود نیست جستجو کنید</p>
        )}
        <div className={classes.list}>
          {documents.map((item, index) => (
            <Fragment key={index}>
              {item.confirm && (
                <div className={classes.item}>
                  <div className={classes.row}>
                    {item.image && (
                      <div className={classes.imageContainer}>
                        <Image
                          className={classes.image}
                          src={item.image}
                          placeholder="blur"
                          blurDataURL={item.image}
                          alt="image"
                          loading="eager"
                          width={300}
                          height={370}
                          objectFit="cover"
                          priority
                          onClick={() => setExpandedItem(item["_id"])}
                        />
                      </div>
                    )}
                    <div className={classes.info}>
                      <h3>{item.title}</h3>
                      {item.author && (
                        <Fragment>
                          <p>گردآورنده : {item.author}</p>
                          {item.author !== "دکتر عبدالله جاسبی" && (
                            <p>زیر نظز : دکتر عبدالله جاسبی</p>
                          )}
                        </Fragment>
                      )}
                      {item.publisher && <p>ناشر : {item.publisher}</p>}
                      {item.position && <p>سمت : {item.position}</p>}
                      {item.activity && <p>فعالیت : {item.activity}</p>}
                      <p>سال : {enToFaDigits(item.year)} </p>
                      {expandedItem === item["_id"] ? (
                        <p>{item.description}</p>
                      ) : (
                        <p>
                          {sliceString(item.description, 120)}...
                          <span onClick={() => setExpandedItem(item["_id"])}>
                            بیشتر
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

// initial connection to db
export async function getServerSideProps(context) {
  try {
    await dbConnect();
    const academics = await academicModel.find();
    const politics = await politicModel.find();
    const publications = await publicationModel.find();

    const archiveArray = [...academics, ...politics, ...publications].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return {
      props: {
        archiveArray: JSON.parse(JSON.stringify(archiveArray)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
