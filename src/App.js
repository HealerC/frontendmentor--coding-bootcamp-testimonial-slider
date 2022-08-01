import { useState } from "react";
import data from "./placeholder-data";
import { ReviewText, ReviewPicture, ExtraActions } from "./components";

function App() {
  const [reviewList, setReviewList] = useState(data);
  return (
    <main>
      <ReviewText
        name={reviewList[1].name}
        role={reviewList[1].role}
        review={reviewList[1].review}
      />
      <ReviewPicture name={reviewList[1].name} url={reviewList[1].photoUrl} />
      <ExtraActions />
    </main>
  );
}

export default App;
