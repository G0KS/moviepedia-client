import React, { useContext, useState } from "react";
import { userLogin } from "../API/allAPI";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Components/ContextShare";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
   const navigate = useNavigate();
   const { userData, setUserData } = useContext(userContext);
   const [logData, setLogData] = useState({
      email: "",
      password: "",
   });

   const getLogData = (e) => {
      const { name, value } = e.target;
      setLogData({ ...logData, [name]: value });
   };

   const handleSubmit = async () => {
      const { email, password } = logData;
      if (!email || !password) {
         toast.warning("Please fill the credentials");
      } else {
         const data = {
            email,
            password,
         };

         const result = await userLogin(data);
         if (result.status === 200) {
            setUserData(result.data);
            toast.success(`Login Successful`);
            setTimeout(() => {
               navigate("/");
            }, 2000);
         }
      }
   };

   return (
      <>
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100vh",
            }}
         >
            <form
               style={{
                  width: "550px",
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  padding: "80px",
                  gap: "20px",
               }}
               className="card"
            >
               <h1 className="text-center text-uppercase">Log-In</h1>
               <div className="form-floating mb-2">
                  <input
                     type="email"
                     className="form-control"
                     id="floatingInput"
                     placeholder="name@example.com"
                     name="email"
                     onChange={(e) => getLogData(e)}
                  />
                  <label>Email address</label>
               </div>
               <div className="form-floating">
                  <input
                     type="password"
                     className="form-control"
                     id="floatingPassword"
                     placeholder="Password"
                     name="password"
                     onChange={(e) => getLogData(e)}
                  />
                  <label>Password</label>
               </div>
               <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleSubmit}
               >
                  Log-In
               </button>
            </form>
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

export default Login;
