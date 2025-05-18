import {
    createBrowserRouter,
    RouterProvider,
    Route
} from "react-router-dom";


import MoodList from "../pages/ListMood.jsx";

import Registration from "../pages/RagistrationPage/Registration.jsx"

import Login from "../pages/LoginPage/Login.jsx"


const router = createBrowserRouter([
    {
        path: "/all",
        element: <MoodList/>,
    },
    {

        path: "/registration",
        element: <Registration/>,
    },
    {

        path: "/login",
        element: <Login/>
    }

        // path: "/",
        // element: <Navbar />,
        // children: [
        //     {
        //         path: "/",
        //         element: <Landing />,
        //     },
        //     {
        //         path: "/landing",
        //         element: <Landing />,
        //
        //     },
        //
        //     {
        //         path: "/registration",
        //         element: <Registration />,
        //
        //     },
        //
        //     {
        //         path: "/login",
        //         element: <Login />,
        //
        //     },
        //
        //     {
        //         path: "/project_list",
        //         element: <ProjectsList />,
        //
        //     },
        //
        //     {
        //         path: "/about-us",
        //         element: <AboutUs />,
        //
        //     },
        //
        //     {
        //         path: "/user",
        //         element: <UserAccount />,
        //
        //     },
        //
        // ],
]);

export default router;