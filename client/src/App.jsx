import React, {Fragment} from "react";
import {Header, Main, Footer, About} from "./containers/index"
import "./App.css"
import { Route, Routes } from "react-router";

export function App() {
  return (
    <Fragment>
      <Header/>
      <Routes>
        <Route path="*" element={<Main/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <Footer/>
    </Fragment>
  );
}
