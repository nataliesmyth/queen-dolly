const express = require('express');
const { events } = require('../models/Event.js');
const router = express.Router();
const Event = require('../models/Event.js')

// Home (root route)

//put this above your show.ejs file
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

router.post('/', (req, res)=>{
    if(req.body.title = 'true'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.description = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.date = false; //do some data correction
    }
    events.push(req.body);
    console.log(events);
    res.redirect('/events');
});

// -------------- 404 Route ---------------- //

router.get('*', (req, res) => {
    res.send('<h1>404 Page Not Found</h1>');
  });

router.get('/', (req, res) => {
    res.render('index.ejs', {
        events: events
    });
});

router.get('/:id', (req, res) => {
    res.render('show.ejs', {
        event: events[req.params.index]
    })
});

router.delete('/:id', (req, res) => {
    events.splice(req.params.index, 1); //remove the item from the array
    res.redirect('/events');  //redirect back to index route
});

router.get('/:id/edit', function(req, res){
	res.render(
		'edit.ejs', //render views/edit.ejs
		{ //pass in an object that contains
			event: events[req.params.index], //the event object
			index: req.params.index //... and its index in the array
		}
	);
});


router.put('/:id', (req, res) => { //:index is the index of our event array that we want to change
    if(req.body.attending === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.attending = true;
    } else { //if not checked, req.body.attending is undefined
        req.body.attending = false;
    }
	events[req.params.index] = req.body; //in our events array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
	res.redirect('/events'); //redirect to the index page
});


module.exports = router;