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
    <div
      className={`${classes.popUp} ${
        window.innerWidth > 1200
          ? "animate__animated animate__slideInRight"
          : ""
      }`}
    >
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
  );
}
