import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import App from "./App";
import ThreadPage from "./ThreadPage";
import Thread_id from "./Thread_id";

export const router = createBrowserRouter([
  { path: "/home", element: <App /> },
  { path: "/thread/new", element: <ThreadPage /> },
  { path: "/thread/:thread_id", element: <Thread_id /> },
]);
