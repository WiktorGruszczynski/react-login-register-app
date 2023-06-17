import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import isLogged from "./tools/isLogged";
import axios from "axios";
import serverUrl from "./tools/serverUrl";



function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogged) {
        axios.post(serverUrl+"/user", {
          id: localStorage.getItem("id"),
      })
      .then(res=>{
          if (res.data==="invalid id"){
            localStorage.clear();
            window.location.reload();
          }
          else{
            Object.keys(res.data).forEach(key=>{
              if (res.data[key]==null) {
                  localStorage.setItem(key, '')
              }
              else{
                  localStorage.setItem(key, res.data[key])
              }
            })
            setLoading(false);
          }
      })
      .catch(err=>{
          console.log(err)
      })
    }
    else{
      setLoading(false)
    }

  }, []);



  if (!isLoading) return (
    <>
      <Navigation/>
      <main>
        <BrowserRouter>
          <Routes>
            {!isLogged? (<>
              <Route path="/" element={<Login/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
            </>): <>
              <Route path="/" element={<Profile/>}/>
            </>}
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
