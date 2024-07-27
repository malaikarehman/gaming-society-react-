const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const MemberModel = require('./models/Member');

const app= express();
const PORT = process.env.PORT || 5001; 

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));

mongoose.connect("mongodb://localhost:27017/GamingSociety")
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.post("/signup", (req, res) => {
    const {name, email, password, role, team} = req.body;
    
    bcrypt.hash(password, 10)
            .then(hash => {
                MemberModel.create({name: name, email: email, password: hash, role: role, team: team})
                .then(user => {
                    res.status(201).json(user);
                    res.send({message: "success"})
                })
                .catch(err => res.status(400).json({ error: err.message }));
            })
            .catch(err => res.send({message: err}))
})

app.post("/signin", (req, res) => {
    const { name, password } = req.body;
    MemberModel.findOne({ name: name })
        .then(user => {
            if (!user) {
                console.log('User not found');
                return res.status(404).json({ message: "User not found" });
            }
            // Compare the provided password with the hashed password stored in the database
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        console.log('Signin success');
                        return res.status(200).json({ message: "success" });
                    } else {
                        console.log('Incorrect password');
                        return res.status(401).json({ message: "The password is incorrect!" });
                    }
                })
                .catch(err => {
                    console.error('Password comparison error:', err);
                    res.status(500).json({ error: 'Internal server error' });
                });
        })
        .catch(err => {
            console.error('Signin error:', err);
            res.status(500).json({ error: 'Internal server error' });
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

app.listen(PORT, () => {
    console.log(`server is runnning on ${PORT}`);
})

// const http = require('http'); const server = http.createServer(app); server.listen(PORT);
