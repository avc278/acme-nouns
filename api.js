const app = require('express').Router();
const db = require('./db');
const path = require('path');
const { Person, Place, Thing } = db.models;

app.get('/people', (req, res, next) => {
    Person.findAll()
        .then( people => res.send(people))
        .catch(ex => console.log(ex));
});
app.get('/places', (req, res, next) => {
    Place.findAll()
        .then( places => res.send(places))
        .catch(ex => console.log(ex));
});
app.get('/things', (req, res, next) => {
    Thing.findAll()
        .then( things => res.send(things))
        .catch(ex => console.log(ex));
});

module.exports = app;
