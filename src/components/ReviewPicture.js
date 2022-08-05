import prevIcon from "../images/icon-prev.svg";
import nextIcon from "../images/icon-next.svg";
import { FaImage } from "react-icons/fa";

const ReviewPicture = ({ name, url, prev, next, edit }) => {
  return (
    <section className="card__picture">
      {/* <img src={patternBackground} alt="" className="card__backgroundImage" /> */}
      <div className="card__photoContainer">
        <div
          className="card__photoDiv"
          style={
            edit.isEditing || edit.isAdding
              ? {
                  backgroundImage: `url(${edit.photoUrl})`,
                }
              : {
                  backgroundImage: `url(${url})`,
                }
          }
        >
          {(edit.isEditing || edit.isAdding) && (
            <div className="card__changePhoto">
              <div className="changePhotoContainer">
                <FaImage className="icon-changePhoto" />
                <p>Change photo</p>
              </div>
            </div>
          )}
          {!edit.isEditing && !edit.isAdding && (
            <>
              <span className="sr-only">Picture of {name}</span>
              <section className="card__changeReviews">
                <button onClick={prev}>
                  <img src={prevIcon} alt="Previous review icon" />
                </button>
                <button onClick={next}>
                  <img src={nextIcon} alt="Next review icon" />
                </button>
              </section>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewPicture;
