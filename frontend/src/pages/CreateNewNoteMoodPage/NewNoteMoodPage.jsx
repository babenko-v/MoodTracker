import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/AuthService/interceptor.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateMood() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        mood_day: '',
        note: '',
        date: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const now = new Date();
        setForm(f => ({ ...f, date: now.toISOString() }));
    }, []);

    const moodOptions = [
        { id: 1, emoji: '😫', label: 'awful' },
        { id: 2, emoji: '🙁', label: 'bad' },
        { id: 3, emoji: '😐', label: 'could be better' },
        { id: 4, emoji: '🙂', label: 'good' },
        { id: 5, emoji: '🙂', label: 'very good' }
    ];

    const handleSelectMood = (id) => {
        setForm(f => ({ ...f, mood_day: id }));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);

        try {
            await api.post('mood/', {
                mood_day: form.mood_day,
                note: form.note || null,
                date: form.date,
            });
            navigate("/mood/today");
        } catch (err) {
            setError(err.response?.data || 'Сталася помилка.');
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Обрати настрій</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label d-block">Настрій</label>
                    <div className="btn-group" role="group" aria-label="Mood selection">
                        {moodOptions.map(opt => (
                            <button
                                key={opt.id}
                                type="button"
                                className={
                                    "btn btn-outline-primary" +
                                    (form.mood_day === opt.id ? " active" : "")
                                }
                                onClick={() => handleSelectMood(opt.id)}
                                title={opt.label}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{opt.emoji}</span>
                            </button>
                        ))}
                    </div>
                </div>


                <div className="mb-3">
                    <label className="form-label">Коментар (необов’язково)</label>
                    <textarea
                        name="note"
                        className="form-control"
                        rows={3}
                        value={form.note}
                        onChange={handleChange}
                    />
                </div>


                <input type="hidden" name="date" value={form.date} />

                {error && (
                    <div className="alert alert-danger">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!form.mood_day}
                >
                    Зберегти
                </button>
            </form>
        </div>
    );
}
