import { useState, useEffect } from "react";
import "./stylesheets/App.css";
import { ReviewText, ReviewPicture, ExtraActions } from "./components";
import list from "./placeholder-data";

function App() {
  const [reviewData, setReviewData] = useState(list);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
  const prevReview = () => {
    // first review
    if (activeReview === 0) return setActiveReview(reviewData.length - 1);
    setActiveReview(activeReview - 1);
  };
  const nextReview = () => {
    // last review
    if (activeReview === reviewData.length - 1) return setActiveReview(0);
    setActiveReview(activeReview + 1);
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
  return (
    <main className="card">
      <ReviewText
        name={reviewData[activeReview].name}
        role={reviewData[activeReview].role}
        review={reviewData[activeReview].review}
      />
      <ReviewPicture
        name={reviewData[activeReview].name}
        url={reviewData[activeReview].photoUrl}
        prev={prevReview}
        next={nextReview}
      />
      <ExtraActions />
    </main>
  );
}

export default App;
