import { useState, useEffect } from "react";
import "./stylesheets/App.css";
import { ReviewText, ReviewPicture, ExtraActions } from "./components";
import list from "./placeholder-data";

function App() {
  const [reviewData, setReviewData] = useState({ list, active: 0 });
  // const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

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
    console.log("Edit " + activeReview);
  };

  const activeReview = reviewData.list[reviewData.active];
  return (
    <main className="card">
      {!activeReview ? (
        <h1>Nothing to show</h1>
      ) : (
        <>
          <ReviewText
            name={activeReview.name}
            role={activeReview.role}
            review={activeReview.review}
          />
          <ReviewPicture
            name={activeReview.name}
            url={activeReview.photoUrl}
            prev={prevReview}
            next={nextReview}
          />
        </>
      )}

      <ExtraActions add={addReview} del={deleteReview} edit={editReview} />
    </main>
  );
}

export default App;
