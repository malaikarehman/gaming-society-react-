// src/components/EventList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EventList.module.css';

export default function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/events')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div className={styles.container}>
            <h1>Rock Hall Schedule</h1>
            <div className={styles.filter}>
                <button>DATES</button>
            </div>
            <div className={styles.events}>
                {events.map(event => (
                    <div key={event._id} className={styles.eventCard}>
                        <Link to={`/event/${event._id}`}>
                            <img src={event.eventPhoto} alt={event.eventTitle} />
                            <div className={styles.eventInfo}>
                                <div className={styles.eventDate}>{new Date(event.startDate).toLocaleDateString()}</div>
                                <div className={styles.eventType}>{event.eventType}</div>
                                <div className={styles.eventTitle}>{event.eventTitle}</div>
                                <div  className={styles.eventTime}>Duration: {event.duration}</div>
                                </div>
                        </Link>
                        <button className={styles.getTickets}>GET TICKETS</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
