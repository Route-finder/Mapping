import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Layout from './components/layout/Layout';
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListOfBooksPage from './pages/ListOfBooks';
import AddBooksPage from './pages/AddBooks';
import 'normalize.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='book-list' element = {<ListOfBooksPage />} />
        <Route path='add' element={<AddBooksPage />} />
      </Routes>
    </Layout>
  );
}

reportWebVitals();

export default App
