import React, { useContext, useEffect, useRef, useState } from "react";
import { detailsContext, userContext } from "../Components/ContextShare";
import {
   addReview,
   addToFavorites,
   getAllReviews,
   getVideos,
} from "../API/allAPI";
import "./View.css";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function View() {
   const { details, setDetails } = useContext(detailsContext);
   const { userData, setUserData } = useContext(userContext);
   const [videos, setVideos] = useState([]);
   const [videoKey, setVideoKey] = useState("");

   const allVideos = async () => {
      const { data } = await getVideos("movie", details.id);
      setVideos(data.results);
   };

   const handleFavorite = async (id) => {
      if (userData) {
         if (userData.favorites.find((item) => item.id === details.id)) {
            toast.warning("Already in Favorites");
         } else {
            const result = await addToFavorites(id, details);
            setUserData(result.data);
            toast.success("Added to Favorites");
         }
      } else {
         toast.warning("Please log-in to use this feature");
      }
   };

   const handleVideo = () => {
      setVideoKey(videos[0].key);
      handleShow();
   };

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   useEffect(() => {
      allVideos();
   }, []);

   const [review, setReview] = useState("");
   const [allReviews, setAllReviews] = useState([]);

   const handleAddReview = async () => {
      if (review) {
         const body = {
            review,
         };
         const result = await addReview(details.id, body);
         console.log(result.data);
         if (result.status === 200) {
            toast.success("Review Added");
            getReviews();
         }
      } else {
         toast.warning("Please add a review first");
      }
   };

   const getReviews = async () => {
      const result = await getAllReviews(details.id);
      console.log(result.data);
      if (result.data) setAllReviews(result.data.reviews);
   };

   console.log(allReviews);

   useEffect(() => {
      // getReviews();
   }, []);

   return (
      <>
         <div className="backgroundImg">
            <img
               src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
               alt="Background Image"
            />
         </div>
         <div className="viewContainer">
            <div className="detailsContainer card p-4">
               <div className="detailTitle text-uppercase">
                  <h1>{details.original_title || details.original_name}</h1>
               </div>
               <div className="detailDescription pt-5">
                  <div className="d-flex mb-2">
                     <p className="fw-bold me-1 text-uppercase">Overview:</p>
                     <span> {details.overview.slice(0, 500)}</span>
                  </div>
                  <div className="d-flex">
                     <p className="fw-bold me-1 text-uppercase">
                        Release Date :
                     </p>
                     <p> {details.release_date || details.first_air_date}</p>
                  </div>
                  {details.seasons ? (
                     <div className="d-flex">
                        <p className="fw-bold me-1 text-uppercase">Seasons :</p>
                        <p> {details.seasons.length} Seasons</p>
                     </div>
                  ) : (
                     ""
                  )}
                  <div className="d-flex justify-content-center">
                     <button className="btn btn-success" onClick={handleVideo}>
                        Watch A Clip
                     </button>

                     <button
                        className="btn btn-success ms-2"
                        onClick={() => handleFavorite(userData._id)}
                     >
                        Add to favorite
                     </button>
                  </div>
               </div>
            </div>
            <div className="poster">
               <img
                  src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
                  alt="Poster Image"
               />
            </div>

            <Modal show={show} onHide={handleClose} centered size="lg">
               <div style={{ height: "450px" }}>
                  <iframe
                     src={`https://www.youtube.com/embed/${videoKey}`}
                     title="video"
                     height={"100%"}
                     width={"100%"}
                     style={{ borderRadius: "10px" }}
                  ></iframe>
               </div>
            </Modal>
         </div>
         <div className="reviewContainer">
            <h1 className="text-light text-center text-uppercase">Reviews</h1>
            <div className="addReviewContainer">
               <input
                  type="text"
                  name="reviews"
                  className="form-control"
                  placeholder="Add a review"
                  onChange={(e) => setReview(e.target.value)}
               />
               <button className="btn btn-success" onClick={handleAddReview}>
                  Add Review
               </button>
            </div>
            <div className="viewReviewContainer">
               <h2 className="text-light mb-4">View Reviews</h2>
               {allReviews
                  ? allReviews.map((data) => (
                       <div className="card p-3">{data}</div>
                    ))
                  : ""}
            </div>
            <div className="overlay">
               <h1 className="d-flex justify-content-center align-items-center">
                  🚧Currently under construction🚧
               </h1>
            </div>
         </div>
         <ToastContainer
            position="top-center"
            autoClose={1200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
         />
      </>
   );
}

export default View;
