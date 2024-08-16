import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import Header from './components/Header';
import Todo from './components/Todo'; 
import style from './components/style.css';

const App = () => {
  return (
    <>
      <Router>
        <Header />

        <Routes>
        <Route exact path="/" element={<Todo />} />
        </Routes>
      </Router>

      <></>
    </>
  );
}

export default App;
