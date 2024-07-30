// src/components/EventDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EventDetails.module.css';
import axios from 'axios';

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(""); // Replace with actual user ID from authentication

    useEffect(() => {
        fetch(`http://localhost:5001/event/${id}`)
            .then(response => {
                setUserId(response.data.userId);
                response.json()
            })
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching event:', error));
    }, [id]);

    const handleGetTickets = () => {
        axios.post('http://localhost:5001/bookings', { eventId: id, userId })
            .then(response => {
                console.log('Booking successful:', response.data);
                alert('Ticket booked successfully!');
                navigate('/bookings');
            })
            .catch(error => {
                console.error('Error booking ticket:', error);
                alert('Failed to book ticket.');
            });
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.eventCard}>
                <img src={event.eventPhoto} alt={event.eventTitle} />
                <div className={styles.eventInfo}>
                    <div className={styles.eventDate}>{new Date(event.startDate).toLocaleDateString()}</div>
                    <div className={styles.eventType}>{event.eventType}</div>
                    <div className={styles.eventTitle}>{event.eventTitle}</div>
                    <div className={styles.eventTime}>
                        <i className="fa fa-clock"></i>
                        {event.eventTimes && event.eventTimes.map((time, index) => (
                            <div key={index}>
                                {time.startTime} - {time.endTime}
                            </div>
                        ))}
                    </div>
                    <div className={styles.eventDescription}>{event.eventSummary}</div>
                    <button className={styles.getTickets} onClick={handleGetTickets}>GET TICKETS</button>
                </div>
            </div>
        </div>
    );
}
