import React from "react";

const ReviewText = ({ name, role, review, edit, handleChange }) => {
  return (
    <article className="card__text">
      <div className="text-container">
        {edit.isEditing || edit.isAdding ? (
          <textarea
            className="card__testimonial card__testimonial--edit"
            name="review"
            value={edit.review}
            onChange={handleChange}
            cols="30"
            rows="6"
            maxLength="210"
            placeholder="How has this bootcamp benefited you?"
          />
        ) : (
          <h1
            className="card__testimonial"
            dangerouslySetInnerHTML={{
              __html: review.replaceAll("\n", "<br />") || "Hello world",
            }}
          ></h1>
        )}
        <section className="card__bio">
          {edit.isEditing || edit.isAdding ? (
            <div className="edit">
              <input
                type="text"
                name="name"
                value={edit.name}
                onChange={handleChange}
                className="card__name card__name--edit"
                maxLength="30"
                placeholder="Your full name"
              />
              <input
                type="text"
                name="role"
                value={edit.role}
                onChange={handleChange}
                className="card__role card__role--edit"
                maxLength="30"
                placeholder="Job role/position"
              />
            </div>
          ) : (
            <>
              <p className="card__name">{name || "John Smith"}</p>
              <p className="card__role">{role || "POTUS"}</p>
            </>
          )}
        </section>
      </div>
    </article>
  );
};

export default ReviewText;
