import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRegister } from "../API/allAPI";
import { useNavigate } from "react-router-dom";

function Register() {
   const navigate = useNavigate();
   const [regData, setRegData] = useState({
      uName: "",
      email: "",
      password: "",
   });
   const [profile, setProfile] = useState("");

   const getRegData = (e) => {
      const { name, value } = e.target;
      setRegData({ ...regData, [name]: value });
   };

   const handleSubmit = async () => {
      const { uName, email, password } = regData;
      if (!uName || !email || !password || !profile) {
         toast.warning("Please fill the form");
      } else {
         const data = new FormData();
         data.append("uName", uName);
         data.append("email", email);
         data.append("password", password);
         data.append("profile", profile);

         const headers = {
            "Content-Typer": "multipart/form-data",
         };

         const result = await userRegister(data, headers);
         if (result.status === 200) {
            toast.success("Account created");
            setTimeout(() => {
               navigate("/users/login");
            }, 2000);
         }
      }
   };

   return (
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
            <h1 className="text-center text-uppercase">Sign-Up</h1>
            <div className="form-floating mb-2">
               <input
                  type="text"
                  className="form-control"
                  id="floatingUname"
                  placeholder="User Name"
                  name="uName"
                  onChange={(e) => getRegData(e)}
               />
               <label>User Name</label>
            </div>
            <div className="form-floating mb-2">
               <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  onChange={(e) => getRegData(e)}
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
                  onChange={(e) => getRegData(e)}
               />
               <label>Password</label>
            </div>
            <div className="mb-2">
               <label className="form-label">Profile Picture</label>
               <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="profile"
                  onChange={(e) => setProfile(e.target.files[0])}
               />
            </div>
            <button
               type="button"
               className="btn btn-outline-light"
               onClick={handleSubmit}
            >
               Sign-Up
            </button>
         </form>
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
         />{" "}
      </div>
   );
}

export default Register;
