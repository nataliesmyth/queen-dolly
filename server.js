const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
//include the method-override package
var methodOverride = require('method-override');
const PORT = process.env.PORT || 4000;


// Events Controller
const eventsController = require('./controllers/events.js');
app.use('/events', eventsController);

// set the view engine to ejs
app.set('view engine', 'ejs');



// -------------- Middleware ---------------- //


app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});


// Method Override- changes GET requests to DELETE if the request includes a method override query param
// We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));

// BodyParser: Parses the request object and puts the data into a property called 'body'
// .use() method responds to ALL requests (GET, PUT/PATCH/,POST, DELETE)
app.use(express.urlencoded({extended: false}));

// -------------- Routes ---------------- //


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


