const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
userName: {type: String, required: true},
email: String,
book: String,
password: {type: String, required: true}
});
mongoose.model('Users', userSchema);