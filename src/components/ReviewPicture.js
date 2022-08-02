import prevIcon from "../images/icon-prev.svg";
import nextIcon from "../images/icon-next.svg";

const ReviewPicture = ({ name, url, prev, next }) => {
  return (
    <section className="card__picture">
      {/* <img src={patternBackground} alt="" className="card__backgroundImage" /> */}
      <div className="card__photoContainer">
        <div
          className="card__photoDiv"
          style={{
            backgroundImage: `url(${url})`,
          }}
        >
          <span className="sr-only">Picture of {name}</span>
          <section className="card__changeReviews">
            <button onClick={prev}>
              <img src={prevIcon} alt="Previous review icon" />
            </button>
            <button onClick={next}>
              <img src={nextIcon} alt="Next review icon" />
            </button>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ReviewPicture;
