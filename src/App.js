import { useState, useEffect } from "react";
import "./stylesheets/App.css";
import { ReviewText, ReviewPicture, ExtraActions } from "./components";
import list from "./placeholder-data";

const initialState = {
  list,
  active: 0,
  edit: {
    isEditing: false,
    name: "",
    role: "",
    review: "",
    photoUrl: "",
  },
};

function App() {
  const [reviewData, setReviewData] = useState(initialState);
  // const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  useEffect(() => {
    if (reviewData.edit.isEditing) {
      document.removeEventListener("keydown", handleKeyPress);
    } else {
      document.addEventListener("keydown", handleKeyPress);
    }
  }, [reviewData.edit.isEditing]);
  const prevReview = () => {
    if (reviewData.active === 0)
      return setReviewData({
        ...reviewData,
        active: reviewData.list.length - 1,
      });
    setReviewData({ ...reviewData, active: reviewData.active - 1 });
  };
  const nextReview = () => {
    if (reviewData.active === reviewData.list.length - 1)
      return setReviewData({ ...reviewData, active: 0 });
    setReviewData({ ...reviewData, active: reviewData.active + 1 });
  };
  const handleKeyPress = (event) => {
    const key = event.key;
    switch (key) {
      case "ArrowLeft":
      case "P":
      case "p":
        prevReview();
        break;
      case "ArrowRight":
      case "N":
      case "n":
        nextReview();
        break;
      default:
    }
  };
  const deleteReview = () => {
    setReviewData((state) => {
      const newList = state.list.filter(
        (data, index) => index !== state.active
      );
      let newActive = state.active - 1;
      if (newActive < 0) {
        newActive = newList.length - 1;
      }
      return { list: newList, active: newActive };
    });
  };
  const addReview = () => {
    console.log("Add review");
  };
  const editReview = () => {
    setReviewData((state) => {
      const { name, role, review, photoUrl } = state.list[state.active];
      return {
        ...state,
        edit: { isEditing: true, name, role, review, photoUrl },
      };
    });
  };
  const finishedEditing = () => {
    setReviewData((state) => {
      // const { name, role, review, photoUrl } = state.list[state.active];
      const { name, role, review, photoUrl } = state.edit;
      const newList = state.list.map((data, index) => {
        if (index === state.active) return { name, role, review, photoUrl };
        return data;
      });
      return {
        ...state,
        list: newList,
        edit: {
          isEditing: false,
          name: "",
          role: "",
          review: "",
          photoUrl: "",
        },
      };
    });
  };
  const cancelEditing = () => {};

  const activeReview = reviewData.list[reviewData.active];
  return (
    <main className="card">
      {!activeReview ? (
        <section className="card__noTestimonials">
          <div className="noTestimonialContainer">
            <h1>No testimonials here yet.</h1>
            <p>Click anywhere to add ...</p>
          </div>
        </section>
      ) : (
        <>
          <ReviewText
            name={activeReview.name}
            role={activeReview.role}
            review={activeReview.review}
            edit={reviewData.edit}
          />
          <ReviewPicture
            name={activeReview.name}
            url={activeReview.photoUrl}
            prev={prevReview}
            next={nextReview}
            edit={reviewData.edit}
          />
        </>
      )}

      <ExtraActions
        add={addReview}
        del={deleteReview}
        edit={editReview}
        isEditing={reviewData.edit.isEditing}
        finishedEditing={finishedEditing}
      />
    </main>
  );
}

export default App;
