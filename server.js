const express = require('express');
const app = express();
const events = require('./models/events.js');
const bodyParser = require('body-parser');
//include the method-override package
var methodOverride = require('method-override');
const PORT = process.env.PORT || 4000;


// Events Controller
const eventsController = require('./controllers/eventsController.js');
const { response } = require('express');

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

// Home (root route)
app.get('/', (req, res) => {
    response.send('<h1>Welcome to Express Family App!')
});

app.get('/events', (req, res) => {
    res.render('index.ejs');
});
// -------------- 404 Route ---------------- //

app.get('*', (req, res) => {
    res.send('<h1>404 Page Not Found</h1>');
  });

//put this above your show.ejs file
app.get('/events/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/events/:index', function(req, res) {
    res.render('show.ejs', {
        event: events[req.params.index]
    })
});

app.get('/events/:index/edit', function(req, res){
	res.render(
		'edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
			event: events[req.params.index], //the event object
			index: req.params.index //... and its index in the array
		}
	);
});


app.post('/events', (req, res)=>{
    if(req.body.title = 'true'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.description = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.date = false; //do some data correction
    }
    events.push(req.body);
    console.log(events);
    res.redirect('/events');
});

app.delete('/events/:index', (req, res) => {
	events.splice(req.params.index, 1); //remove the item from the array
	res.redirect('/events');  //redirect back to index route
});

app.put('/events/:index', (req, res) => { //:index is the index of our event array that we want to change
    if(req.body.attending === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.attending = true;
    } else { //if not checked, req.body.attending is undefined
        req.body.attending = false;
    }
	events[req.params.index] = req.body; //in our events array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
	res.redirect('/events'); //redirect to the index page
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


