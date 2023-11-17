import { useRef, useState } from "react";
import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import Posts from "./Layout/Posts/Posts";
import { Route, Routes } from "react-router-dom";
import PostDetail from "./Layout/Posts/PostDetail";
import "react-confirm-alert/src/react-confirm-alert.css";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/post/:id" element={<PostDetail />} />

          <Route
            path="*"
            element={<h1 className="not-found">Page not Found</h1>}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
