import React from "react";

const ReviewText = ({ name, role, review }) => {
  return (
    <article className="card__text">
      <div className="text-container">
        <h1 className="card__testimonial">{review || "Hello world"}</h1>
        <section className="card__bio">
          <p className="card__name">{name || "John Smith"}</p>
          <p className="card__role">{role || "POTUS"}</p>
        </section>
      </div>
    </article>
  );
};

export default ReviewText;
