import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import MoviesGrid from "./components/grid/MoviesGrid";
import NotFound from "./components/NotFound";
import MyList from "./components/mylist/MyList";
import { MoviesProvider } from "./context/moviesContext";

function App() {
  return (
    <>
      <MoviesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MoviesGrid />} />
            <Route path="/search" element={<MoviesGrid />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MoviesProvider>
    </>
  );
}

export default App;
