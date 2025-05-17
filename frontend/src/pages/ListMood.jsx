import {useEffect, useState} from "react";
import api from "../../../services/AuthService/interceptor.jsx";


function MoodList() {
    const [mood, setMood] = useState([]);


    useEffect(() => {
        api.get('projects/')
            .then(response => {
                setMood(response.data);
            })
            .catch(error => {
                console.log(error);
                console.error("Помилка при отриманні даних:", error);
            });
    }, []);


    return (
        <div className="container-fluid bodys">
            <div className="bg-black">
                <h1>Users</h1>
                <ul>
                    {mood.map((project) => (
                        <li key={project.id}>{project.username} - ${project.email}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MoodList;