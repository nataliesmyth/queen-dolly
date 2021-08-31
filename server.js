const express = require('express');
const app = express();

const events = [
    {
        title: 'party',
        description: 'My birthday party',
        date: '09/02/2021'
    },
    {
        title: 'Dinner',
        description: 'Dinner with friends',
        date: '09/04/2021'
    },
    {
        title: 'Movie',
        description: 'Movie at a drive in theater',
        date: '09/10/2021'
    }
];

app.get('/events/', (req, res) => { //this will never be reached
    res.send(events);
});

app.get('/events/:index', (req, res) => {
    res.send(events[req.params.index]);
});

app.listen(3000, () => {
    console.log('i am listening')
});