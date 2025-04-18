import { useContext, Fragment } from "react";
import { StateContext } from "@/context/stateContext";
import classes from "./DetailsPopup.module.scss";
import Image from "next/legacy/image";
import CloseIcon from "@mui/icons-material/Close";
import { enToFaDigits } from "@/services/utility";

export default function DetailsPopup({ selectedItem }) {
  const { displayDetailsPopup, setDisplayDetailsPopup } =
    useContext(StateContext);

  return (
    <div className={classes.popUp}>
      <CloseIcon
        className="icon"
        onClick={() => setDisplayDetailsPopup(false)}
      />
      <div className={classes.details}>
        <div className={classes.row}>
          <div>
            <h3>{selectedItem.title}</h3>
            {selectedItem.author && (
              <Fragment>
                <p>گردآورنده : {selectedItem.author}</p>
                {selectedItem.author !== "دکتر عبدالله جاسبی" && (
                  <p>زیر نظز : دکتر عبدالله جاسبی</p>
                )}
              </Fragment>
            )}
            {selectedItem.publisher && <p>ناشر : {selectedItem.publisher}</p>}
            {selectedItem.position && <p>سمت : {selectedItem.position}</p>}
            {selectedItem.activity && <p>فعالیت : {selectedItem.activity}</p>}
            <p>سال : {enToFaDigits(selectedItem.year)} </p>
          </div>
          {selectedItem.mediaType === "image" && (
            <div className={classes.image}>
              <Image
                src={selectedItem.media}
                placeholder="blur"
                blurDataURL={selectedItem.media}
                alt="image"
                loading="eager"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          )}
          {selectedItem.mediaType === "video" && (
            <div className={classes.mediaContainer}>
              <video
                className={classes.video}
                preload="metadata"
                src={selectedItem.media}
                controls
              />
            </div>
          )}
          {selectedItem.mediaType === "voice" && (
            <div>
              <audio preload="metadata" controls>
                <source src={selectedItem.media} />
              </audio>
            </div>
          )}
          {selectedItem.mediaType === "pdf" && (
            <div>
              <embed
                src={selectedItem.media}
                height="300px"
                type="application/pdf"
              />
            </div>
          )}
        </div>
        <p>{selectedItem.description}</p>
      </div>
    </div>
  );
}
