import React from "react";
import "./CardLayout.css";

function CardLayout({ data }) {
   return (
      <div>
         <div className="cardlayout">
            <p className="cardHead">{data.original_language}</p>
            <div className="cardImg">
               <img
                  src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
               />
            </div>
            <div className="cardDescription">
               <p className="cardTitle fw-bold">{data.title || data.name}</p>
               <p>{data.release_date || data.first_air_date}</p>
            </div>
         </div>
      </div>
   );
}

export default CardLayout;
