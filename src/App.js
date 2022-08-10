import { useState, useEffect } from 'react';
import './stylesheets/App.css';
import { ReviewText, ReviewPicture, ExtraActions } from './components';
import list from './placeholder-data';
import { addCdnLibrary } from './utils';

const CLOUDINARY_URL = 'https://upload-widget.cloudinary.com/global/all.js';

const lsList = localStorage.getItem('list');
const lsActive = localStorage.getItem('active');
const initialState = {
  list: lsList ? JSON.parse(lsList) : list, // [{name, role, review, photoUrl}]
  active: lsActive ? parseInt(lsActive) : 0, // the testimonial the app renders
  edit: {
    isEditing: false, // editing a particular testimonial?
    isAdding: false, // adding a new testimonial

    // Used when the user is editing/adding a testimonial
    name: '',
    role: '',
    review: '',
    photoUrl: '',
  },
};

function App() {
  const [reviewData, setReviewData] = useState(initialState);

  // Update the local storage when a review is added/removed and
  // when the user moves to the pre/next testimonial
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(reviewData.list));
  }, [reviewData.list]);
  useEffect(() => {
    localStorage.setItem('active', reviewData.active);
  }, [reviewData.active]);

  // Cloudinary upload widget. To be set up when it's cdn script is loaded
  const [uploadWidget, setUploadWidget] = useState(null);
  const instantiateWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        multiple: false,
        cropping: true,
        resourceType: 'image',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const newPhotoUrl = result.info.secure_url;

          // The url of the newly uploaded image is set as the edit photoUrl
          setReviewData((state) => ({
            ...state,
            edit: { ...state.edit, photoUrl: newPhotoUrl },
          }));
        }
        if (error) console.log(error);
      }
    );
    setUploadWidget(widget);
  };

  // The user clicks on `choose image` when adding/editing a review
  const uploadPhoto = () => {
    if (uploadWidget) uploadWidget.open();
  };

  // Add cloudinary cdn library as well as set up the widget after it loads
  useEffect(() => {
    addCdnLibrary(CLOUDINARY_URL, instantiateWidget);
  }, []);

  // (Arrowkeys Left and Right), p and n goes to previous or next review
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  // Go to previous review. If user is at first review, then go to last review
  const prevReview = () => {
    if (reviewData.active === 0)
      return setReviewData({
        ...reviewData,
        active: reviewData.list.length - 1,
      });
    setReviewData({ ...reviewData, active: reviewData.active - 1 });
  };

  // Go to next review. If user is at the last review, then go to the first
  const nextReview = () => {
    if (reviewData.active === reviewData.list.length - 1)
      return setReviewData({ ...reviewData, active: 0 });
    setReviewData({ ...reviewData, active: reviewData.active + 1 });
  };

  // Prev/next review on keyboard keydown as described above but doesn't
  // work if user is editing/adding (as the user will be typing on the
  // keyboard)
  const handleKeyPress = (event) => {
    if (reviewData.edit.isEditing || reviewData.edit.isAdding) return;

    const key = event.key;
    switch (key) {
      case 'ArrowLeft':
      case 'P':
      case 'p':
        prevReview();
        break;
      case 'ArrowRight':
      case 'N':
      case 'n':
        nextReview();
        break;
      default:
    }
  };

  // Delete a review and move to the previous review (if any)
  const deleteReview = () => {
    setReviewData((state) => {
      const newList = state.list.filter(
        (data, index) => index !== state.active
      );

      let newActive = state.active - 1;
      // Go to the last review if we are at first review
      if (newActive < 0) {
        newActive = newList.length - 1;
      }

      const newEdit = {
        isEditing: false,
        name: '',
        role: '',
        review: '',
        photoUrl: '',
      };

      return {
        ...state,
        list: newList,
        active: newActive,
        edit: { ...state.edit, edit: newEdit },
      };
    });
  };

  // Enter addReview state where user should add testimonial, name, job role
  // and photo. The edit object within the state is updated with these values
  // The use shouldn't attempt to add a review when an editing action is ongoing
  const addReview = () => {
    if (reviewData.edit.isEditing) return;

    setReviewData((state) => ({
      ...state,
      edit: {
        ...state.edit,
        isAdding: true,
        name: '',
        role: '',
        review: '',
        photoUrl: '',
      },
    }));
  };

  // The user has finished adding a review. If any of the input fields is
  // empty though, the review addition is cancelled.
  const finishedAdding = () => {
    if (
      !reviewData.edit.name ||
      !reviewData.edit.role ||
      !reviewData.edit.review ||
      !reviewData.edit.photoUrl
    ) {
      return cancelAdding();
    }

    setReviewData((state) => {
      const { name, role, review, photoUrl } = state.edit;

      /* Put the new review just after the active review.
      Basically slice the array from beginning including the active review,
      put the new one after it and then add the remaining reviews  */
      const dataBefore = state.list.slice(0, state.active + 1); // 0 -> active
      const dataAfter = state.list.slice(state.active + 1); // active+1 -> end
      const newData = { name, role, review, photoUrl };

      const newList = [...dataBefore, newData, ...dataAfter];

      const newActive = state.active + 1; // The new review is now the active one

      const newEdit = {
        isAdding: false,
        name: '',
        role: '',
        review: '',
        photoUrl: '',
      };

      return {
        ...state,
        list: newList,
        active: newActive,
        edit: { ...state.edit, ...newEdit },
      };
    });
  };

  // Cancel an adding action
  const cancelAdding = () => {
    setReviewData((state) => ({
      ...state,
      edit: {
        ...state.edit,
        isAdding: false,
        name: '',
        role: '',
        review: '',
        photoUrl: '',
      },
    }));
  };

  // Editing a review while an adding action is ongoing OR when there
  // are no testimonials is prohibited
  const editReview = () => {
    if (reviewData.edit.isAdding || reviewData.list.length === 0) return;

    setReviewData((state) => {
      // Copy the items from the active review to the edit object for
      // the user to work upon
      const { name, role, review, photoUrl } = state.list[state.active];
      return {
        ...state,
        edit: { ...state.edit, isEditing: true, name, role, review, photoUrl },
      };
    });
  };

  // Handle the text/textarea input when adding/editing a review
  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewData((state) => ({
      ...state,
      edit: { ...state.edit, [name]: value },
    }));
  };

  // Just like finisedAdding, no input field should be blank
  const finishedEditing = () => {
    if (
      !reviewData.edit.name ||
      !reviewData.edit.role ||
      !reviewData.edit.review ||
      !reviewData.edit.photoUrl
    ) {
      return cancelEditing();
    }

    setReviewData((state) => {
      // Copy the data from edit object to the active review
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
          name: '',
          role: '',
          review: '',
          photoUrl: '',
        },
      };
    });
  };

  // Cancel an editing option (perhaps user clicked cancel or failed to
  // provide some values and then submitted)
  const cancelEditing = () => {
    setReviewData((state) => ({
      ...state,
      edit: {
        ...state.edit,
        isEditing: false,
        name: '',
        role: '',
        review: '',
        photoUrl: '',
      },
    }));
  };

  // The review that is rendered on screen
  const activeReview = reviewData.list[reviewData.active];

  return (
    <main className="card">
      {!activeReview && !reviewData.edit.isAdding ? (
        // No testimonials... Click anywhere in the card to add a review
        <section className="card__noTestimonials" onClick={addReview}>
          <div className="noTestimonialContainer">
            <div>
              <h1>No testimonials here yet.</h1>
              <p>Click anywhere to add ...</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          <ReviewText
            name={activeReview ? activeReview.name : ''}
            role={activeReview ? activeReview.role : ''}
            review={activeReview ? activeReview.review : ''}
            edit={reviewData.edit}
            handleChange={handleChange}
          />
          <ReviewPicture
            name={activeReview ? activeReview.name : ''}
            url={activeReview ? activeReview.photoUrl : ''}
            prev={prevReview}
            next={nextReview}
            edit={reviewData.edit}
            uploadPhoto={uploadPhoto}
          />
        </>
      )}

      <ExtraActions
        edit={editReview}
        add={addReview}
        del={deleteReview}
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
