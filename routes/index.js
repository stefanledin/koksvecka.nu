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
    people = collect(people).shuffle().split(2);

    let startWeek = 34;
    const endWeek = 51;
    const weeks = endWeek - startWeek;
    const schedule = [];

    let i = 0;
    while (schedule.length <= weeks) {
        if (!people[0][i]) {
            i = 0;
        }
        schedule.push({
            week: startWeek,
            person1: people[0][i],
            person2: people[1][i]
        });
        startWeek++;
        i++;
    }
    res.send(people);
});

module.exports = router;
