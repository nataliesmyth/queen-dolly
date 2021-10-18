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


// app.use(express.urlencoded({extended: false}));



// Method Override- changes GET requests to DELETE if the request includes a method override query param
// We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));


app.get('/events/', (req, res) => {
    res.render('index.ejs', {
        events: events,

    });
});



app.get('/events/:index', function(req, res) {
    res.render('show.ejs', {
        event: events[req.params.index]
    })
});

// BodyParser: Parses the request object and puts the data into a property called 'body'
// .use() method responds to ALL requests (GET, PUT/PATCH/,POST, DELETE)
app.use(express.urlencoded({extended: false}));

// -------------- Routes ---------------- //



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


app.delete('/events/:index', (req, res) => {
	events.splice(req.params.index, 1); //remove the item from the array
	res.redirect('/events');  //redirect back to index route
});

app.put('/events/:index', (req, res) => { //:index is the index of our event array that we want to change
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
	events[req.params.index] = req.body; //in our events array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
	res.redirect('/events'); //redirect to the index page
});

app.listen(3000, () => {
    console.log('i am listening')
});
