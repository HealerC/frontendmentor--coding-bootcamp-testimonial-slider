import React from "react";

const ReviewPicture = () => {
  return (
    <section className="card__picture">
      <img
        src="picture-backImage"
        alt="Picture backimage"
        className="card__backImage"
      />
      <div className="card__photoContainer">
        <div className="card__photoDiv"></div>
        <section className="card__changeReviews">{"< >"}</section>
      </div>
    </section>
  );
};

export default ReviewPicture;
