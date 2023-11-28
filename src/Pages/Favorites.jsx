import React, { useContext, useEffect, useState } from "react";
import { detailsContext, userContext } from "../Components/ContextShare";
import { useNavigate } from "react-router-dom";
import { getAllFavorites, updateFavorites, viewMovieOrShow } from "../API/allAPI";
import CardLayout from "../Components/CardLayout";

function Favorites() {
   const navigate = useNavigate();
   const { details, setDetails } = useContext(detailsContext);
   const { userData, setUserData } = useContext(userContext);
   const [favorites, setFavorites] = useState([]);

   const getFavorites = async () => {
      if (userData) {
         setFavorites(userData.favorites);
      }
   };

   const handleDelete = async (e, id) => {
      e.preventDefault();
      userData.favorites = userData.favorites.filter((item) => item.id !== id);
      setFavorites(userData.favorites);
      const response = await updateFavorites(userData._id,userData)
   };

   const handleView = async (e, id) => {
      e.preventDefault();
      const { data } = await viewMovieOrShow("movie", id);
      setDetails(data);
      navigate(`/view/${data.id}`);
   };

   useEffect(() => {
      getFavorites();
   }, []);
   return (
      <>
         <div className="container mt-5">
            <h1 className="text-uppercase text-light fs-1">Favorites</h1>
            <div className="d-flex flex-wrap gap-5 mt-5">
               {favorites != "" ? (
                  favorites.map((data) => (
                     <>
                        <div style={{ position: "relative" }}>
                           <CardLayout data={data} />
                           <button
                              className="btn btn-danger"
                              style={{
                                 position: "absolute",
                                 right: "10px",
                                 bottom: "20px",
                              }}
                              onClick={(e) => handleDelete(e, data.id)}
                           >
                              Delete
                           </button>
                           <button
                              className="btn btn-primary"
                              style={{
                                 position: "absolute",
                                 right: "10px",
                                 top: "10px",
                              }}
                              onClick={(e) => handleView(e, data.id)}
                           >
                              View
                           </button>
                        </div>
                     </>
                  ))
               ) : (
                  <h1 className="text">Nothing to Display</h1>
               )}
            </div>
         </div>
      </>
   );
}

export default Favorites;
