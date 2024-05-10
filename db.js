

const mongoose = require('mongoose');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/', {  // Replace with your actual URI
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully.')) 
.catch(err => console.error('MongoDB connection error:', err)); 

module.exports = mongoose;
