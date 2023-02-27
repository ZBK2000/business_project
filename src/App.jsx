import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";

import MainPage from "./components/MainPage";
import CertainTrack from "./components/CertainTrack";
import Register from "./components/Register";
import User from "./components/User";
import UserRegisterWithFirebase from "./components/UserRegisterWithFirebase";
import { AuthContextProvider } from "./context/AuthContext";
import LoginWithFirebase from "./components/loginWithFirebase";
import ProtectdRoute from "./components/ProtectedRoute";
import NeedToLogIn from "./components/NeedToLogIn";
import Help from "./components/Help";



function App() {

  //declaring states and  consts
  const [tracks, setTracks] = useState([]);
  const [success, setSuccess] = useState("s");
  const [name, setName] = useState("");
  const [change, setChange] = useState("");
  const [slots, setSlots] = useState(4);
  
  //we make an initial call for all of the tracks data on all rerender
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(import.meta.env.VITE_BACKEND_URL)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL);
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [change]);

  return (
    <AuthContextProvider>
      <div>
        <div className="App">
          {/* <Header title="Awesome" success={success} name={success}/> */}
          {/*   <div className="container">{newTracks}</div> */}
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  allTrack={tracks}
                  getDownData={success}
                  getDownData2={name}
                />
              }
            />
         
            <Route
              path="/register"
              element={
                <Register
                  getUpData={setTracks}
                  getUpData2={setSlots}
                  getDownData={success}
                  getDownData2={name}
                />
              }
            />
            <Route
              path="/tracks/:id"
              element={
                <ProtectdRoute>
                  <CertainTrack
                    allTrack={tracks}
                    getDownData={success}
                    getDownData2={name}
                    /* getDownData3={slots}  */ getUpData={setChange}
                  />
                </ProtectdRoute>
              }
            />
            <Route path="/signup" element={<UserRegisterWithFirebase />} />
            <Route
              path="/login/:name"
              element={
                <LoginWithFirebase
                  getUpData={setSuccess}
                  getUpData2={setName}
                />
              }
            />
            <Route
              path="/user"
              element={
                <ProtectdRoute>
                  {" "}
                  <User
                    getDownData={success}
                    getDownData2={name}
                    getUpData={setChange}
                  />
                </ProtectdRoute>
              }
            />

            <Route path="/needtologin" element={<NeedToLogIn />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
