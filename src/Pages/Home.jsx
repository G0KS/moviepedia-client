import React, { useContext, useEffect, useState } from "react";
import {
   getMoviesOrShows,
   searchMoviesOrShows,
   viewMovieOrShow,
} from "../API/allAPI";
import CardLayout from "../Components/CardLayout";
import { detailsContext } from "../Components/ContextShare";
import { useNavigate } from "react-router-dom";

function Home() {
   const navigate = useNavigate();
   const { details, setDetails } = useContext(detailsContext);
   const [type, setType] = useState("");
   const [displayList, setDipslayList] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

   const getDetails = async (ch) => {
      const type = ch ? ch : "movie";
      setType(type);
      const { data } = await getMoviesOrShows(type);
      setDipslayList(data.results);
   };

   const search = async (searchTerm) => {
      const { data } = await searchMoviesOrShows(searchTerm);
      setDipslayList(data.results);
   };

   const handleView = async (e, id) => {
      e.preventDefault();
      const { data } = await viewMovieOrShow(type, id);
      setDetails(data);
      navigate(`/view/${data.id}`);
   };

   useEffect(() => {
      getDetails();
   }, []);
   return (
      <>
         <div className="container mt-5 mb-5" style={{height:"100%"}}>
            <div className="d-flex justify-content-evenly">
               <div className="d-flex">
                  <input
                     type="text"
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="form-control me-2 fs-5"
                     placeholder="Make a search"
                     style={{ width: "700px", borderRadius: "20px" }}
                  />
                  <button
                     className="btn btn-success"
                     style={{ borderRadius: "11px" }}
                     onClick={() => search(searchTerm)}
                  >
                     Search
                  </button>
               </div>
               <div className="d-flex justify-content-end align-items-center">
                  <button
                     onClick={() => getDetails("tv")}
                     className="btn btn-outline-dark text-light me-2"
                  >
                     TV Shows
                  </button>
                  <button
                     onClick={() => getDetails("movie")}
                     className="btn btn-outline-dark text-light"
                  >
                     Movie
                  </button>
               </div>{" "}
            </div>

            <h1 className="mt-5 text-light">Discover</h1>
            <div className="d-flex flex-wrap justify-content-between gap-5 mt-5">
               {displayList != "" ? (
                  displayList.map((data) => (
                     <div onClick={(e) => handleView(e, data.id)}>
                        <CardLayout data={data} />
                     </div>
                  ))
               ) : (
                  <h1 style={{height:"60vh"}} className="text-light text-center">
                     <CardLayout data={""}/>
                  </h1>
               )}
            </div>
         </div>
      </>
   );
}

export default Home;
