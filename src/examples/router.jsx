import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Datatable from "./Datatable";
export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Datatable/></>,
      
    }])

  return <RouterProvider router={router} />;
}
