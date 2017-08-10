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
    const people = fs.readFileSync(textFile, {encoding: 'utf-8'});
    console.log(collect(people.split('\n').length));
    res.send(people);
});

module.exports = router;
