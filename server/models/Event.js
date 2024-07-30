
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    eventTimes: [{
        startTime: { type: String},
        endTime: { type: String}
    }],
    eventTitle: { type: String, required: true },
    eventSummary: { type: String },
    eventPhoto: { type: String },
    venue: { type: String},
    capacity: { type: Number },
    venueOptions: { type: Boolean, default: false },
    infoUrl: { type: String }
});

const EventModel = mongoose.model('Event', EventSchema);
module.exports = EventModel;
