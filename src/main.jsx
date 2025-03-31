import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Reg from "./Reg.jsx";
import Settings from "./Settings.jsx";

const router = createBrowserRouter([
    {path:"/", element:<App/>},
    {path:"/registration", element:<Reg/>},
    {path:"/settings", element:<Settings/>},

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
)
