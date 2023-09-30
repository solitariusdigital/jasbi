import { useState, Fragment } from "react";
import classes from "../pages.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/legacy/image";
import dbConnect from "@/services/dbConnect";
import academicModel from "@/models/Academic";
import publicationModel from "@/models/Publication";
import politicModel from "@/models/Politic";
import {
  enToFaDigits,
  onlyLettersAndNumbers,
  faToEnDigits,
} from "@/services/utility";

export default function Search({ archiveArray }) {
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState([]);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchEmpty, setSearchEmpty] = useState(false);

  const searchDocuments = () => {
    setSearchEmpty(false);
    let searchDocuments = [];
    if (search) {
      searchDocuments = archiveArray.filter((item) =>
        Object.values(item).some((val) =>
          String(val)
            .toLowerCase()
            .includes(
              onlyLettersAndNumbers(search)
                ? search.trim()
                : faToEnDigits(search)
            )
        )
      );
      setDocuments(searchDocuments);
      if (searchDocuments.length === 0) {
        setSearchEmpty(true);
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.inputSearch}>
        <button onClick={() => searchDocuments()}>جستجو</button>
        <input
          placeholder="جستجو ... متن، عنوان، سمت، فعالیت، سال"
          type="text"
          id="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
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
                  <div>
                    {item.image && (
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
                        onClick={() => {
                          setSelectedItem(item);
                          setDisplayDetails(true);
                          window.scrollTo(0, 0);
                        }}
                      />
                    )}
                  </div>
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
                    <p>
                      {item.description.slice(0, 150)} ...{" "}
                      <span
                        onClick={() => {
                          setSelectedItem(item);
                          setDisplayDetails(true);
                          window.scrollTo(0, 0);
                        }}
                      >
                        بیشتر
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
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
              <div className={classes.info}>
                <h3>{selectedItem.title}</h3>
                {selectedItem.author && (
                  <Fragment>
                    <p>گردآورنده : {selectedItem.author}</p>
                    {selectedItem.author !== "دکتر عبدالله جاسبی" && (
                      <p>زیر نظز : دکتر عبدالله جاسبی</p>
                    )}
                  </Fragment>
                )}
                {selectedItem.publisher && (
                  <p>ناشر : {selectedItem.publisher}</p>
                )}
                {selectedItem.position && <p>سمت : {selectedItem.position}</p>}
                {selectedItem.activity && (
                  <p>فعالیت : {selectedItem.activity}</p>
                )}
                <p>سال : {enToFaDigits(selectedItem.year)} </p>
              </div>
              {selectedItem.image && (
                <div>
                  <Image
                    className={classes.image}
                    src={selectedItem.image}
                    placeholder="blur"
                    blurDataURL={selectedItem.image}
                    alt="image"
                    loading="eager"
                    width={270}
                    height={300}
                    objectFit="cover"
                    priority
                  />
                </div>
              )}
            </div>
            <p>{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
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
