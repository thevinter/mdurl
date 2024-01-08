import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UploadPage from './UploadPage';
import MarkdownPage from './MarkdownPage';
import './App.css';
import React from "react";

const router = createBrowserRouter([
  {
    path: "/upload",
    element: <UploadPage />
  },
  {
    path: "/markdown/:fileId",
    element: <MarkdownPage />
  },
  {
    path: "/",
    element: <UploadPage />
  }
])

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;

