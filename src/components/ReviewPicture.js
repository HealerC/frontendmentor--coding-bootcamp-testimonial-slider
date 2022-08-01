import patternBackground from "../images/pattern-bg.svg";

const ReviewPicture = ({ name, url, prev, next }) => {
  return (
    <section className="card__picture">
      <img src={patternBackground} alt="" className="card__backgroundImage" />
      <div className="card__photoContainer">
        <div
          className="card__photoDiv"
          style={{
            backgroundImage: `url(${url})`,
            width: "500px",
            height: "400px",
            border: "2px solid gray",
          }}
        >
          <span className="sr-only">Picture of {name}</span>
        </div>
        <section className="card__changeReviews">
          <button onClick={prev}>prev</button>
          <button onClick={next}>next</button>
        </section>
      </div>
    </section>
  );
};

export default ReviewPicture;
