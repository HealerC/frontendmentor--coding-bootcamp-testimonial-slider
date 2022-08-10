import prevIcon from '../images/icon-prev.svg';
import nextIcon from '../images/icon-next.svg';
import { FaImage } from 'react-icons/fa';

/* The picture of the person that wrote the testimonial set as background
image of a div (card__photoDiv). If the person is Editing/Adding a testimonial though, 
a click event on the div of the picture triggers cloudinary upload api widget to 
upload a picture */
const ReviewPicture = ({ name, url, prev, next, edit, uploadPhoto }) => {
  return (
    <section className="card__picture">
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
          {/* Hide the change photo overlay if user is editing/adding a review */}
          {(edit.isEditing || edit.isAdding) && (
            <div className="card__changePhoto" onClick={uploadPhoto}>
              <div className="changePhotoContainer">
                <FaImage className="icon-changePhoto" />
                <p>Choose photo</p>
              </div>
            </div>
          )}
          {/* Hide the sr-only text (name of person who has the photo) as
          well as buttons to go to prev/next review if the user is editing/adding
          a review */}
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
