// src/pages/WeeklyMoodReport.jsx
import { useEffect, useState } from 'react';
import api from '../../services/AuthService/interceptor.jsx';
import { moodIcons } from '../../utils/moodIcons';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WeeklyMoodReport() {
    const [weekOffset, setWeekOffset] = useState(0);
    const [moods, setMoods]           = useState([]);
    const [loading, setLoading]       = useState(true);

    useEffect(() => {
        setLoading(true);
        api
            .get(`mood/?week_offset=${weekOffset}`)
            .then(({ data }) => setMoods(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [weekOffset]);

    // підготовка даних для таблиці
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const cells = Array(7).fill(null);
    moods.forEach(rec => {
        const dateObj = new Date(rec.date);
        const idx = (dateObj.getDay() + 6) % 7;
        cells[idx] = rec;
    });


    const chartData = days.map((day, idx) => {
        const rec = cells[idx];
        return {
            day,
            mood: rec ? rec.mood_day : null
        };
    });

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => setWeekOffset(o => o + 1)}
                >
                    &lt; Prev Week
                </button>
                <h4 className="mb-0">Week Offset: {weekOffset}</h4>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => setWeekOffset(o => Math.max(o - 1, 0))}
                    disabled={weekOffset === 0}
                >
                    Next Week &gt;
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <table className="table table-bordered text-center">
                        <thead>
                        <tr>
                            {days.map(d => (
                                <th key={d}>{d}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {cells.map((rec, i) => {
                                const emoji = rec ? moodIcons[rec.mood_day] || '❓' : null;
                                return (
                                    <td key={i} style={{ verticalAlign: 'middle' }}>
                                        {rec ? (
                                            <>
                                                <span style={{ fontSize: '2rem' }}>{emoji}</span>
                                                {rec.note && <div><small>{rec.note}</small></div>}
                                            </>
                                        ) : (
                                            <span className="text-muted">–</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                        </tbody>
                    </table>

                    <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
                        <ResponsiveContainer>
                            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis
                                    domain={[1, 5]}
                                    allowDecimals={false}
                                    ticks={[1, 2, 3, 4, 5]}
                                    tickFormatter={value => moodIcons[value] || ''}
                                />
                                <Tooltip formatter={(value) => moodIcons[value] || value} />
                                <Line type="monotone" dataKey="mood" stroke="#8884d8" dot />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
}
