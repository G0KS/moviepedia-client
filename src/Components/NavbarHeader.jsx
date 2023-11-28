import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { userContext } from "./ContextShare";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { baseURL } from "../API/base_URL";
import { deleteUser } from "../API/allAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NavbarHeader() {
   const navigate = useNavigate();
   const { userData, setUserData } = useContext(userContext);

   const handleDelete = async () => {
      const response = await deleteUser(userData._id);
      console.log(response);
      if (response.status === 200) {
         setUserData("");
         toast.success("Account deleted");
         setTimeout(() => {
            navigate("/");
         }, 2000);
      }
   };

   const handleLogout = () => {
      setUserData("");
      toast.success("Logged Out");
      setTimeout(() => {
         navigate("/");
      }, 2000);
   };

   return (
      <>
         <Navbar expand="lg">
            <Container>
               <Link to={"/"} style={{ textDecoration: "none" }}>
                  <Navbar.Brand style={{ fontSize: "30px", color: "white" }}>
                     MoviePedia
                  </Navbar.Brand>
               </Link>
               <Navbar.Toggle aria-controls="navbar-dark-example" />
               <Navbar.Collapse id="navbar-dark-example">
                  <Nav className="ms-auto">
                     {userData ? (
                        <>
                           <div className="d-flex align-items-center">
                              <Nav.Link>
                                 <Link
                                    to={"/user/favorites"}
                                    className="text-light fs-5 me-3 text-uppercase"
                                    style={{ textDecoration: "none" }}
                                 >
                                    Favorites
                                 </Link>
                              </Nav.Link>
                              <img
                                 width={"40px"}
                                 height={"40px"}
                                 style={{ borderRadius: "50%" }}
                                 src={`${baseURL}/Uploads/${userData.profile}`}
                                 alt=""
                                 className="me-2"
                              />
                              <NavDropdown
                                 id="basic-nav-dropdown"
                                 title={userData.uName}
                                 className="btn btn-light"
                                 style={{ fontWeight: "600", height: "50px" }}
                              >
                                 <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                 </NavDropdown.Item>
                                 <NavDropdown.Item
                                    className="text-danger"
                                    onClick={handleDelete}
                                 >
                                    Delete Account
                                 </NavDropdown.Item>
                              </NavDropdown>
                           </div>
                        </>
                     ) : (
                        <div className="d-flex">
                           <Nav.Link>
                              <Link
                                 to={"/user/login"}
                                 className="text-light fs-5 me-2"
                                 style={{ textDecoration: "none" }}
                              >
                                 Login
                              </Link>
                           </Nav.Link>
                           <Nav.Link>
                              <Link
                                 to={"/user/register"}
                                 className="text-light fs-5 me-2"
                                 style={{ textDecoration: "none" }}
                              >
                                 Register
                              </Link>
                           </Nav.Link>
                        </div>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
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

export default NavbarHeader;
