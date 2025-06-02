import './App.css'
import {RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import router from '../src/routers/routers.jsx'


function App() {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App