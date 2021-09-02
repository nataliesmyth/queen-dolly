const express = require('express');
const db = require('./../models');
const router = express.Router();

// EVENT MODEL
const EVENT = require('./../models/Event.js');


// CURRENT PATH = '/events'


// New Event (This is the Form page to crate a new event)
router.get('/new', (req, res) => {
  // res.send('New Event Route');
  res.render('new');
});


// Create Event
router.post('/', (req, res) => {
  // Data can be found in the request object on the body property
  console.log(req.body);
  
  if (req.body.attending === 'on') {
    req.body.attending = true;
    // req.body.isSweet = false
  } else {
    req.body.attending = false;
  }

  db.Event.create(req.body, (err, newEvent) => {
    if (err) return console.log(err);


    res.redirect('/events');
  });
});


// One Single Event Route (Show)
router.get('/:id', (req, res) => {

  db.Event.findById(req.params.id, (err, foundEvent) => {
    if (err) return console.log(err);

    res.render('show', {
      event: foundEvent,
    });
  });

});


// All Events Route (Index)
router.get('/', (req, res) => {
  // Step 1: Get the data
  db.Event.find({}, (err, allEvents) => {
    if (err) return console.log(err);

    console.log('All Events = ', allEvents);

    res.render('index', {
      events: allEvents,
    });
    
  });
});


// Edit One Event (Edit)
router.get('/:id/edit', (req, res) => {
  // Find Event in Database by ID
  db.Event.findById(req.params.id, (err, foundEvent) => {
    if (err) return console.log(err);

    res.render('edit', {
      // event, // Shorthand object notation: Same as below
      event: foundEvent,
    });

  })

});


// Update One Event (Update)
router.put('/:id', (req, res) => {
  // res.send(req.body);

  // EVENT[req.params.index] = req.body;

  if (req.body.attending === 'on') {
    req.body.attending = true;
  } else {
    req.body.attending = false;
  }

  db.Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}, // Original or Modified record (true = modified record)
    (err, updatedEvent) => {
      if (err) return console.log(err);

      updatedEvent.update({})

      res.redirect('/events');
    }
  );
});


// Delete One Event (Destroy)
router.delete('/:id', (req, res) => {
  db.Event.findByIdAndDelete(req.params.id, (err, deletedEvent) => {
    if (err) return console.log(err);

    console.log('Deleted Event = ', deletedEvent);

    // The last thing we do is respond
    res.redirect('/events');
  });

});


module.exports = router