const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    team:  String
})

const MemberModel = mongoose.model("Member", MemberSchema);
module.exports = MemberModel