const mongoose = require("mongoose");

const URI = process.env.MONGODB_URL;

console.log(URI)

mongoose.connect(URI, {

useNewUrlParser: true, 

useUnifiedTopology: true 

}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});
module.exports = mongoose.connection;