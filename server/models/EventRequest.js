
const mongoose = require('mongoose');

const EventRequestSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    eventTitle: { type: String, required: true },
    eventSummary: { type: String, required: true },
    venue: { type: String},
    capacity: { type: Number },
    infoUrl: { type: String }
});

const EventRequestModel = mongoose.model('EventRequest', EventRequestSchema);
module.exports = EventRequestModel;
