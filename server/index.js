const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const MemberModel = require('./models/Member');
const EventModel = require('./models/Event');
const EventRequestModel = require("./models/EventRequest");



const app= express();
const PORT = process.env.PORT || 5001; 

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173", // Adjust the origin to match your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
console.log('Applying bodyParser middleware with increased payload limits');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
    secret: 'malaika',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 *24
    }
}));

mongoose.connect("mongodb://localhost:27017/GamingSociety")
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.get('/dashboard', (req, res) => {
    if(req.session.username){
        return res.json({valid: true, username: req.session.username });
    }else {
        return res.json({valid: false});
    }
})

app.post("/signup", (req, res) => {
    const {name, email, password, role, team} = req.body;
    
    bcrypt.hash(password, 10)
            .then(hash => {
                MemberModel.create({name: name, email: email, password: hash, role: role, team: team})
                .then(user => {
                    res.status(201).json(user);
                    req.session.username = user.name;
                    console.log(req.session.username);
                    res.send({message: "success", SignIn: true})
                })
                .catch(err => res.status(400).json({ error: err.message , SignIn: false}));
            })
            .catch(err => res.send({message: err, SignIn: false}))
})

app.post("/signin", (req, res) => {
    const { name, password } = req.body;
    MemberModel.findOne({ name: name })
        .then(user => {
            if (!user) {
                console.log('User not found');
                return res.status(404).json({ message: "User not found" , SignIn: false});
            }
            // Compare the provided password with the hashed password stored in the database
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        console.log('Signin success');
                        req.session.username = user.name;
                        req.session.userId = user._id;
                        console.log(req.session.username);
                        return res.status(200).json({SignIn: true});
                    } else {
                        console.log('Incorrect password');
                        return res.status(401).json({ message: "The password is incorrect!", SignIn: false });
                    }
                })
                .catch(err => {
                    console.error('Password comparison error:', err);
                    res.status(500).json({ error: 'Internal server error', SignIn: false });
                });
        })
        .catch(err => {
            console.error('Signin error:', err);
            res.status(500).json({ error: 'Internal server error', SignIn: false });
        });
});


app.post("/forgot-password", (req, res) => {
    const {email} = req.body; 
    MemberModel.findOne({email: email})
    .then(user => {
        if(!user){
            // MemberModel.findAll.map(member => console.log(member.email));
            return res.send({message: "User not found"});
        }
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"});
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'i222605@nu.edu.pk',
                pass: '5n3damalaika'
            }
        });
        var mailOptions = {
            from: 'i222605@nu.edu.pk',
            to: '000malaika@gmail.com',
            subject: 'Reset your password',
            text: `http://localhost:5173/reset-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else {
                return res.send({message: "success"});
                // return res.status(200).json({ message: "success" });
            }
        })
    })
})

app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({message: "Error with token"})
        }else {
            bcrypt.hash(password, 10)
            .then(hash => {
                MemberModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({message: "success"}))
                .catch(err => res.send({message: err}))
            })
            .catch(err => res.send({message: err}))
        }
    })
});

app.post('/addevent', (req, res) => {
    console.log('Received POST request on /addevent with data:', req.body);
    const { startDate, duration, eventTimes, eventTitle, eventSummary, eventPhoto, venue, capacity, infoUrl } = req.body;

    EventModel.create({
        startDate,
        duration,
        eventTimes,
        eventTitle,
        eventSummary,
        eventPhoto,
        venue,
        capacity,
        infoUrl
    })
    .then(event => {
        console.log('Event created successfully:', event);
        res.status(201).json(event);
    })
    .catch(err => {
        console.error('Error creating event:', err);
        res.status(400).json({ error: err.message });
    });
});

app.post("/request-event", (req, res) => {
    const { startDate, duration, eventTitle, eventSummary,  venue, capacity, infoUrl } = req.body;
    EventRequestModel.create({ 
        startDate: startDate,
        duration: duration,
        eventTitle: eventTitle,
        eventSummary:eventSummary,
        venue:venue,
        capacity:capacity,
        infoUrl:infoUrl })
        .then(event => {  res.status(201).json(event) })
        .catch(err => res.status(400).json({  error: err.message  }));
  
});

app.get("/events", async (req, res) => {
    try {
        const events = await EventModel.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/event/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json({event, userId : req.session.userId});
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the event' });
    }
});

app.post('/bookings', async (req, res) => {
    try {
        const { eventId, userId } = req.body;
        const newBooking = new Booking({ eventId, userId });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the booking' });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('eventId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the bookings' });
    }
});


app.listen(PORT, () => {
    console.log(`server is runnning on ${PORT}`);
})
// const http = require('http'); const server = http.createServer(app); server.listen(PORT);







