import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/AuthService/interceptor.jsx";
import { moodIcons } from "../../utils/moodIcons";

export default function MoodToday() {
    const [moodToday, setMoodToday] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10);
        console.log(dateStr);
        api
            .get(`mood/by-date/?date=${dateStr}`)
            .then(({ data }) => setMoodToday(data))
            .catch((err) => {
                if (err.response?.status === 404) setNotFound(true);
                else console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading…</div>;
    if (notFound) {
        return (
            <div className="bodys">
                <div className="bg">
                    <h1>На сьогодні ви ще не обрали свій настрій</h1>
                    <button
                        onClick={() => navigate("/mood/create")}
                        className="btn btn-primary mt-3"
                    >
                        Обрати настрій
                    </button>
                </div>
            </div>
        );
    }

    const emoji = moodIcons[moodToday.mood_day] || '❓';

    return (
        <div className="bodys">
            <div className="bg text-center p-4">
                <h1>Настрій на сьогодні ({moodToday.date.slice(0, 10)})</h1>
                <div className="my-3" style={{ fontSize: '2.5rem' }}>
                    {emoji}
                </div>
                {moodToday.note && <p>{moodToday.note}</p>}
            </div>
        </div>
    );
}
