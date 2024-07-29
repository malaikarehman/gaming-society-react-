import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddEvent.module.css';
import axios from 'axios';

export default function AddEvent() {
    const [startDate, setStartDate] = useState('');
    const [duration, setDuration] = useState(1);
    const [eventTimes, setEventTimes] = useState([{ startTime: '', endTime: '' }]);
    const [eventTitle, setEventTitle] = useState('');
    const [eventSummary, setEventSummary] = useState('');
    const [eventPhoto, setEventPhoto] = useState('');
    const [venue, setVenue] = useState('');
    const [capacity, setCapacity] = useState('');
    const [venueOptions, setVenueOptions] = useState(false);
    const [infoUrl, setInfoUrl] = useState('');

    const navigate = useNavigate();

    const handleDurationChange = (event) => {
        const newDuration = event.target.value;
        setDuration(newDuration);
        const newEventTimes = [];
        for (let i = 0; i < newDuration; i++) {
            newEventTimes.push({ startTime: '', endTime: '' });
        }
        setEventTimes(newEventTimes);
    };

    const handleEventTimeChange = (index, field, value) => {
        const newEventTimes = [...eventTimes];
        newEventTimes[index][field] = value;
        setEventTimes(newEventTimes);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const eventData = {
            startDate,
            duration,
            eventTimes,
            eventTitle,
            eventSummary,
            eventPhoto,
            venue,
            capacity,
            venueOptions,
            infoUrl
        };

        axios.post('http://localhost:5001/addevent', eventData)
            .then(response => {
                console.log(response.data);
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
            });
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardHeader}>
                <h1>Add Event</h1>
            </div>
            <div className={styles.dashboardContent}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <h2>Event Date and Time</h2>
                        <label htmlFor="start-date">Start Date:</label>
                        <input type="date" id="start-date" name="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                        <label htmlFor="duration">Duration (days):</label>
                        <select id="duration" name="duration" value={duration} onChange={handleDurationChange}>
                            {[...Array(7).keys()].map((day) => (
                                <option key={day + 1} value={day + 1}>{day + 1}</option>
                            ))}
                        </select>

                        {eventTimes.map((eventTime, index) => (
                            <div key={index} className={styles.eventTime}>
                                <h3>Day {index + 1}</h3>
                                <label htmlFor={`start-time-${index}`}>Start Time:</label>
                                <input type="time" id={`start-time-${index}`} name={`start-time-${index}`} value={eventTime.startTime} onChange={(e) => handleEventTimeChange(index, 'startTime', e.target.value)} />

                                <label htmlFor={`end-time-${index}`}>End Time:</label>
                                <input type="time" id={`end-time-${index}`} name={`end-time-${index}`} value={eventTime.endTime} onChange={(e) => handleEventTimeChange(index, 'endTime', e.target.value)} />
                            </div>
                        ))}
                    </div>

                    <div className={styles.formGroup}>
                        <h2>Event Description</h2>
                        <label htmlFor="event-title">Event Title:</label>
                        <input type="text" id="event-title" name="event-title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />

                        <label htmlFor="event-summary">Event Summary:</label>
                        <textarea id="event-summary" name="event-summary" value={eventSummary} onChange={(e) => setEventSummary(e.target.value)}></textarea>

                        <label htmlFor="event-photo">Photo/Image:</label>
                        <input type="file" id="event-photo" name="event-photo" value={eventPhoto} onChange={(e) => setEventPhoto(e.target.value)} />
                    </div>

                    <div className={styles.formGroup}>
                        <h2>Venue Information</h2>
                        <label htmlFor="venue">Venue:</label>
                        <input type="text" id="venue" name="venue" value={venue} onChange={(e) => setVenue(e.target.value)} />

                        <label htmlFor="capacity">Capacity:</label>
                        <input type="number" id="capacity" name="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />

                        <label htmlFor="venue-options">Options:</label>
                        <input type="checkbox" id="venue-options" name="venue-options" checked={venueOptions} onChange={(e) => setVenueOptions(e.target.checked)} /> Make Venue Information Public
                    </div>

                    <div className={styles.formGroup}>
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
