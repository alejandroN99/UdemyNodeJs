require("dotenv").config();
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT;


//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));


app.get('/', (_req, res) => {
    res.render('home', {
        nombre: 'Alejandro Rodriguez',
        titulo: 'Curso de node'
    });
});

app.get('/generic', (_req, res) => {
    res.render('generic', {
        nombre: 'Alejandro Rodriguez',
        titulo: 'Curso de node'
    });
});
app.get('/elements', (_req, res) => {
    res.render('elements', {
        nombre: 'Alejandro Rodriguez',
        titulo: 'Curso de node'
    });
});

app.get('/generic', (_req, res) => {
    res.sendFile(__dirname+'/public/generic.html');
});

app.get('/elements', (_req, res) => {
    res.sendFile(__dirname+'/public/elements.html');
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
    console.log('App listenning in port: '+ port)
});