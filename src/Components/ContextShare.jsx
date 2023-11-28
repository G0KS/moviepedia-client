import React, { createContext, useState } from "react";

export const detailsContext = createContext();
export const userContext = createContext();

function ContextShare({ children }) {
   const [details, setDetails] = useState("");
   const [userData, setUserData] = useState("");
   return (
      <>
         <detailsContext.Provider value={{ details, setDetails }}>
            <userContext.Provider value={{ userData, setUserData }}>
               {children}
            </userContext.Provider>
         </detailsContext.Provider>
      </>
   );
}

export default ContextShare;
