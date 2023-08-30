import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home'
import Read from './Pages/Read';
import ReadSurah from './Pages/Extra/ReadSurah';
import Listen from './Pages/Listen';
import ListenSurah from './Pages/Extra/ListenSurah'
import Search from './Pages/Search';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>Page Not Found</h1> ,
  } ,
  {
    path: "read",
    element: <Read />,
  } ,
  {
    path: "read/surah",
    element: <ReadSurah />,
  } ,
  {
    path: "listen",
    element: <Listen />,
  } ,
  {
    path: "listen/surah",
    element: <ListenSurah />,
  } ,
  {
    path: "search",
    element: <Search />,
  } ,
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
    <Home />
  </RouterProvider>
);
