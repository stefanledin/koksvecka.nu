'use strict'

const express = require('express');
const router = express.Router();
const collect = require('collect.js');
const fs = require('fs');
const path = require('path');
const textFile = path.resolve(__dirname, '../public/people.txt');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/folket', (req, res, next) => {
    fs.open(textFile, 'r', (err, fd) => {
        const people = (err) ? '' : fs.readFileSync(textFile, {encoding: 'utf-8'});
        res.render('create', {
            title: 'Schemalägg',
            people
        });
    });
});

router.post('/folket', (req, res, next) => {
    let people = req.body.people;
    fs.writeFile(textFile, people);
    res.redirect('/folket');
});

router.get('/nytt', (req, res) => {
    let people = fs.readFileSync(textFile, {encoding: 'utf-8'});
    people = people.split('\n');
    
    const schedule = collect(people).shuffle().split(2);
    const weeks = 6;
    for (var i = 0; i < weeks; i++) {
        console.log(schedule[0][i]);
        console.log(schedule[1][i]);
        console.log('======');
    }
    res.send(people);
});

module.exports = router;
