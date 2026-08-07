
import { createBrowserRouter , RouterProvider} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Registro from "../pages/Registro";

import Perfil from "../pages/Perfil";
import Usuarios from "../pages/Usuarios";
import MainLayout from "../layouts/MainLayout";
import Inicio from "../pages/Inicio";

import Error from "../pages/Error";

const router = createBrowserRouter([

    {
        path: "*",
        element: <Error/>
    },
    {
        path: "/",
        element: <Login/>,
    },

    {
        path: "/registro",
        element: <Registro/>
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <MainLayout/>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Inicio/>
            },
            {
                path: "perfil",
                element: <Perfil/>
            },
            {
                path: "usuarios",
                element: <Usuarios/>
            }
        ]
    }

]);



export default function Router(){
    return <RouterProvider router={router}/>
}