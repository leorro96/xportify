import React, {Fragment} from "react";
import {Header, Main, Footer, About} from "./containers/index"
import "./App.css"

export function App() {
  return (
    <Fragment>
      <Header/>
      <Main/>
      <About/>
      <Footer/>
    </Fragment>
  );
}
