import { useState, Fragment } from "react";
import classes from "../pages.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import dbConnect from "@/services/dbConnect";
import academicModel from "@/models/Academic";
import publicationModel from "@/models/Publication";
import politicModel from "@/models/Politic";
import mediaModel from "@/models/Media";
import speachModel from "@/models/Speech";
import { NextSeo } from "next-seo";
import BannerPattern from "@/components/BannerPattern";
import {
  enToFaDigits,
  onlyLettersAndNumbers,
  faToEnDigits,
  sliceString,
} from "@/services/utility";

export default function Search({ archiveArray }) {
  const [documents, setDocuments] = useState([]);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchYear, setSearchYear] = useState("");

  const searchDocuments = () => {
    setSearchEmpty(false);
    let searchDocuments = [];
    if (searchText || searchTitle || searchYear) {
      searchDocuments = archiveArray.filter((item) => {
        let matches = [];
        if (searchText || searchTitle) {
          let search = searchText || searchTitle;
          matches.push(
            Object.values(item).some((val) =>
              String(val).includes(
                !onlyLettersAndNumbers(search)
                  ? search.trim().slice(0, 20)
                  : null
              )
            )
          );
        }
        if (searchYear) {
          matches.push(
            Object.values(item).some((val) =>
              String(val).includes(faToEnDigits(searchYear))
            )
          );
        }
        return matches.every((match) => match);
      });
      setDocuments(searchDocuments);
    }
    if (searchDocuments.length === 0) {
      setSearchEmpty(true);
    }
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
        <BannerPattern />
        <div className={classes.inputSearch}>
          <div className={classes.row}>
            <CloseIcon
              className="icon"
              sx={{ fontSize: 16 }}
              onClick={() => {
                setDocuments([]);
                setSearchText("");
                setSearchEmpty(false);
              }}
            />
            <input
              placeholder="متن"
              type="text"
              id="searchText"
              name="searchText"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              autoComplete="off"
              dir="rtl"
            />
          </div>
          <div className={classes.row}>
            <CloseIcon
              className="icon"
              sx={{ fontSize: 16 }}
              onClick={() => {
                setDocuments([]);
                setSearchTitle("");
                setSearchEmpty(false);
              }}
            />
            <input
              placeholder="عنوان، سمت، کلمه"
              type="text"
              id="searchTitle"
              name="searchTitle"
              onChange={(e) => setSearchTitle(e.target.value)}
              value={searchTitle}
              autoComplete="off"
              dir="rtl"
            />
          </div>
          <div className={classes.row}>
            <CloseIcon
              className="icon"
              sx={{ fontSize: 16 }}
              onClick={() => {
                setDocuments([]);
                setSearchYear("");
                setSearchEmpty(false);
              }}
            />
            <input
              placeholder="سال"
              type="text"
              id="searchYear"
              name="searchYear"
              onChange={(e) => setSearchYear(e.target.value)}
              value={searchYear}
              autoComplete="off"
              dir="rtl"
            />
          </div>
          <button onClick={() => searchDocuments()}>جستجو</button>
        </div>
        {searchEmpty && (
          <p className="message">
            مطلبی برای نمایش موجود نیست. دوباره جستجو کنید
          </p>
        )}
        <div className={classes.list}>
          {documents.map((item, index) => (
            <Fragment key={index}>
              {item.confirm && (
                <div className={classes.item}>
                  <div className={classes.row}>
                    {item.media && (
                      <div className={classes.mediaContainer}>
                        <Image
                          className={classes.image}
                          src={item.media}
                          placeholder="blur"
                          blurDataURL={item.media}
                          alt="image"
                          loading="eager"
                          layout="fill"
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
    const media = await mediaModel.find();
    const speech = await speachModel.find();

    const archiveArray = [
      ...academics,
      ...politics,
      ...publications,
      ...media,
      ...speech,
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
