import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddEvent.module.css';
import axios from 'axios';

export default function RequestEvent() {
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState(1);
    const [eventTitle, setEventTitle] = useState('');
    const [eventSummary, setEventSummary] = useState('');
    const [venue, setVenue] = useState('');
    const [capacity, setCapacity] = useState('');
    const [infoUrl, setInfoUrl] = useState('');

    const navigate = useNavigate();

    // axios.defaults.withCredentials = true;
    // useEffect(() => {
    //   axios.get('http://localhost:5001/addEvent')
    //   .then( res => {
    //     console.log(res);
    //     if(res.data.valid){
    //         navigate('/addEvent');
    //     }else {
    //         navigate('/signup');
    //     }
    //   })
    // })

    const handleDurationChange = (event) => {
        const newDuration = event.target.value;
        setDuration(newDuration);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const eventData = {
            startDate,
            duration,
            eventTitle,
            eventSummary,
            venue,
            capacity,
            infoUrl
        };

        axios.post('http://localhost:5001/request-event', eventData)
            .then(response => {
                console.log(response.data);
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
            });
    };

    return (
        <div className={ styles.dashboardContainer}>
            <div className={styles.dashboardHeader}>
                <h1>Request Event</h1>
            </div>
            <div className={styles.dashboardContent  }>
                <form onSubmit={handleSubmit}  >
                    <div className={ styles.formGroup}>
                        <h2>Event Date and Time</h2>
                        <label htmlFor="start-date">Start Date:</label>
                        <input type="date" id="start-date" name="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                        <label htmlFor="duration">Duration (days):</label>
                        <select id="duration" name="duration" value={duration} onChange={handleDurationChange}>
                        {[...Array(7).keys()].map((day) => (
                                <option key={day + 1} value={day + 1}>{day + 1}</option>
                            ))}
                        </select> 
                    </div>

                    <div className={  styles.formGroup }>
                        <h2>Event Description</h2>
                        <label htmlFor="event-title">Event Title:</label>
                        <input type="text" id="event-title" name="event-title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />

                        <label htmlFor="event-summary">Event Summary:</label>
                        <textarea id="event-summary" name="event-summary" value={eventSummary} onChange={(e) => setEventSummary(e.target.value)}></textarea>

                    </div>

                    <div className={  styles.formGroup }>
                        <h2>Venue Information</h2>
                        <label htmlFor="venue">Venue:</label>
                        <input type="text" id="venue" name="venue" value={venue} onChange={(e) => setVenue(e.target.value)} />

                        <label htmlFor="capacity">Capacity:</label>
                        <input type="number" id="capacity" name="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                    </div>

                    <div className={ styles.formGroup }>
                        <h2>Attachments and Results</h2>
                        <label htmlFor="info-url">Info URL/Attachment:</label>
                        <input type="url" id="info-url" name="info-url" value={infoUrl} onChange={(e) => setInfoUrl(e.target.value)} />
                    </div>

                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
}
