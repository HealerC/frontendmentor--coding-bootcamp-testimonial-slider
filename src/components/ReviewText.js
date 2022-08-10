import React from 'react';

/* Shows the testimonial text given by the user as well as the name and the
job role. If the person is editing/adding a review though it renders text
inputs for the person to change/add text */
const ReviewText = ({ name, role, review, edit, handleChange }) => {
  return (
    <article className="card__text">
      <div className="text-container">
        {/* Show either a textarea to edit/add review or show the review
        itself (h1) */}
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
          // Render line breaks (new paragraphs perhaps) given by user in html
          <h1
            className="card__testimonial"
            dangerouslySetInnerHTML={{
              __html: review.replaceAll('\n', '<br />') || 'Hello world',
            }}
          ></h1>
        )}
        <section className="card__bio">
          {/* Show either an input field for the name and position or show the 
          name and position of the user itself (p) */}
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
              <p className="card__name">{name || 'John Smith'}</p>
              <p className="card__role">{role || 'POTUS'}</p>
            </>
          )}
        </section>
      </div>
    </article>
  );
};

export default ReviewText;
