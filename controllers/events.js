const express = require('express');
const router = express.Router();

//put this above your show.ejs file
app.get('/events/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/events', (req, res)=>{
    if(req.body.attending = 'true'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.description = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.date = false; //do some data correction
    }
    events.push(req.body);
    console.log(events);
    res.redirect('/events');
});



module.exports = router;