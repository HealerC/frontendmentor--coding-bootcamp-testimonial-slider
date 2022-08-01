import React from "react";

const ReviewPicture = ({ name, url }) => {
  return (
    <section className="card__picture">
      <img
        src="picture-backImage"
        alt="Picture backimage"
        className="card__backImage"
      />
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
        <section className="card__changeReviews">{"< >"}</section>
      </div>
    </section>
  );
};

export default ReviewPicture;
