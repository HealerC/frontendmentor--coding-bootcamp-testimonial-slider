import patternBackground from "../images/pattern-bg.svg";

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
            <button onClick={prev}>prev</button>
            <button onClick={next}>next</button>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ReviewPicture;
