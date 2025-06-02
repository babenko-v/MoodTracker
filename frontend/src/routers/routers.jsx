// router.jsx
import { createBrowserRouter } from "react-router-dom";

import Navbar     from "../components/Navbar/Navbar.jsx";
import MoodList   from "../pages/ListMood.jsx";
import MoodToday  from "../pages/MainPage/MainPage.jsx";
import CreateMood from "../pages/CreateNewNoteMoodPage/NewNoteMoodPage.jsx";
import Registration from "../pages/RagistrationPage/Registration.jsx";
import Login      from "../pages/LoginPage/Login.jsx";
import WeeklyMoodReport from "../pages/ReportMood/ReportMood.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            { path: "all",          element: <MoodList/>    },
            { path: "registration", element: <Registration/>},
            { path: "login",        element: <Login/>       },
            { path: "mood/today",   element: <MoodToday/>   },
            { path: "mood/create",  element: <CreateMood/>  },
            { path: "mood/report",  element: <WeeklyMoodReport/>  },
        ]
    }
]);

export default router;
