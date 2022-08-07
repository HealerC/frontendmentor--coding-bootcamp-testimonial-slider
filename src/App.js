import { useState, useEffect } from "react";
import "./stylesheets/App.css";
import { ReviewText, ReviewPicture, ExtraActions } from "./components";
import list from "./placeholder-data";
import { addCdnLibrary } from "./utils";

const CLOUDINARY_URL = "https://upload-widget.cloudinary.com/global/all.js";
const initialState = {
  list,
  active: 0,
  edit: {
    isEditing: false,
    isAdding: false,
    name: "",
    role: "",
    review: "",
    photoUrl: "",
  },
};
function App() {
  const [reviewData, setReviewData] = useState(initialState);
  // const [activeReview, setActiveReview] = useState(0);
  const [uploadWidget, setUploadWidget] = useState(null);
  const instantiateWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        multiple: false,
        cropping: true,
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const newPhotoUrl = result.info.secure_url;
          setReviewData((state) => ({
            ...state,
            edit: { ...state.edit, photoUrl: newPhotoUrl },
          }));
        }
        console.log(error);
      }
    );
    setUploadWidget(widget);
  };

  const uploadPhoto = () => {
    if (uploadWidget) uploadWidget.open();
  };
  useEffect(() => {
    addCdnLibrary(CLOUDINARY_URL, instantiateWidget);
  }, []);
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
    if (reviewData.edit.isEditing || reviewData.edit.isAdding) return;
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
      const newEdit = {
        isEditing: false,
        name: "",
        role: "",
        review: "",
        photoUrl: "",
      };
      return {
        ...state,
        list: newList,
        active: newActive,
        edit: { ...state.edit, edit: newEdit },
      };
    });
  };
  const addReview = () => {
    if (reviewData.edit.isEditing) return;
    setReviewData((state) => ({
      ...state,
      edit: {
        ...state.edit,
        isAdding: true,
        name: "",
        role: "",
        review: "",
        photoUrl: "",
      },
    }));
  };
  const finishedAdding = () => {
    setReviewData((state) => {
      const { name, role, review, photoUrl } = state.edit;

      /* Put the new review just after the active review.
      Basically slice the array from beginning including the active review,
      put the new one after it and then add up the remaining reviews  */
      const dataBefore = state.list.slice(0, state.active + 1); // 0 -> active
      const dataAfter = state.list.slice(state.active + 1); // active+1 -> end
      const newData = { name, role, review, photoUrl };
      const newList = [...dataBefore, newData, ...dataAfter];

      const newActive = state.active + 1; // The new review is now the active one

      const newEdit = {
        isAdding: false,
        name: "",
        role: "",
        review: "",
        photoUrl: "",
      };
      return {
        ...state,
        list: newList,
        active: newActive,
        edit: { ...state.edit, ...newEdit },
      };
    });
  };
  const cancelAdding = () => {
    setReviewData((state) => ({
      ...state,
      edit: {
        ...state.edit,
        isAdding: false,
        name: "",
        role: "",
        review: "",
        photoUrl: "",
      },
    }));
  };
  const editReview = () => {
    if (reviewData.edit.isAdding) return;
    setReviewData((state) => {
      const { name, role, review, photoUrl } = state.list[state.active];
      return {
        ...state,
        edit: { ...state.edit, isEditing: true, name, role, review, photoUrl },
      };
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewData((state) => ({
      ...state,
      edit: { ...state.edit, [name]: value },
    }));
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
          ...state.edit,
          isEditing: false,
          name: "",
          role: "",
          review: "",
          photoUrl: "",
        },
      };
    });
  };
  const cancelEditing = () => {
    setReviewData((state) => ({
      ...state,
      edit: {
        ...state.edit,
        isEditing: false,
        name: "",
        role: "",
        review: "",
        photoUrl: "",
      },
    }));
  };

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
            handleChange={handleChange}
          />
          <ReviewPicture
            name={activeReview.name}
            url={activeReview.photoUrl}
            prev={prevReview}
            next={nextReview}
            edit={reviewData.edit}
            uploadPhoto={uploadPhoto}
          />
        </>
      )}

      <ExtraActions
        add={addReview}
        del={deleteReview}
        edit={editReview}
        isEditing={reviewData.edit.isEditing}
        finishedEditing={finishedEditing}
        cancelEditing={cancelEditing}
        isAdding={reviewData.edit.isAdding}
        finishedAdding={finishedAdding}
        cancelAdding={cancelAdding}
      />
    </main>
  );
}

export default App;
