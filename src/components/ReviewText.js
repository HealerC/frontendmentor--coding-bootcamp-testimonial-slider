import React from "react";

const ReviewText = ({ name, role, review, edit, handleChange }) => {
  return (
    <article className="card__text">
      <div className="text-container">
        {edit.isEditing ? (
          <textarea
            className="card__testimonial card__testimonial--edit"
            name="review"
            value={edit.review}
            onChange={handleChange}
            cols="30"
            rows="6"
            maxlength="210"
          />
        ) : (
          <h1 className="card__testimonial">{review || "Hello world"}</h1>
        )}
        <section className="card__bio">
          {edit.isEditing ? (
            <div className="edit">
              <input
                type="text"
                name="name"
                value={edit.name}
                onChange={handleChange}
                className="card__name card__name--edit"
                maxLength="30"
              />
              <input
                type="text"
                name="role"
                value={edit.role}
                onChange={handleChange}
                className="card__role card__role--edit"
                maxLength="30"
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
