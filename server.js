const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();

});

app.use((req,rest,next) =>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append file');
        }
    });

    next();

});

app.use((req,res, next) => {
    res.render('maintenance.hbs');

});

app.use(express.static(__dirname + '/public'));

app.set('view enginge', 'hbs');

app.get('/',  (req, res) => {
    // res.send('Hello Express');
    res.render('home.hbs', {
        pageTitle: 'About Page',
        welcomeMessage: 'Hi there'
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs' , {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling request'
    })

})
app.listen(3000);