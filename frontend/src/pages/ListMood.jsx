import {useEffect, useState} from "react";
import api from '../services/AuthService/interceptor.jsx'


function MoodList() {
    const [mood, setMood] = useState([]);


    useEffect(() => {
        api.get('mood/')
            .then(response => {
                setMood(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                console.error("Помилка при отриманні даних:", error);
            });
    }, []);


    return (
        <div className="bodys">
            <div className="bg">
                <h1>Users</h1>
                <ul>
                    {mood.map((mood) => (
                        <li key={mood.id}>{mood.mood_day} - ${mood.note}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MoodList;