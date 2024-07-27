const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'member' }
});

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;
