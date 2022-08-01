import { useState } from "react";
import "./stylesheets/App.css";
import { ReviewText, ReviewPicture, ExtraActions } from "./components";
import list from "./placeholder-data";

function App() {
  const [reviewData, setReviewData] = useState(list);
  const [activeReview, setActiveReview] = useState(0);

  const prevReview = () => {
    if (activeReview === 0) return setActiveReview(reviewData.length - 1);
    setActiveReview(activeReview - 1);
  };
  const nextReview = () => {
    if (activeReview === reviewData.length - 1)
      // last review
      return setActiveReview(0);
    setActiveReview(activeReview + 1);
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
