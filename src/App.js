import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import View from "./Pages/View";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Favorites from "./Pages/Favorites";
import NavbarHeader from "./Components/NavbarHeader";

function App() {
   return (
      <>
        <div className="App">
            <div>
               <NavbarHeader />
               <Routes>
                  <Route path="/" Component={Home} />
                  <Route path="/view/:id" Component={View} />
                  <Route path="/user/register" Component={Register} />
                  <Route path="/user/login" Component={Login} />
                  <Route path="/user/favorites" Component={Favorites} />
               </Routes>
            </div>
        </div>
      </>
   );
}

export default App;
