const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.set('view engin' , 'hbs'); //for rendering views file 

//middleware
app.use(express.static(__dirname + '/public'));  //static middleware for declaring the static path 

app.use((req,res,next) =>  {

	var now = new Date().toString();
	var log = `${now} : ${req.url} ${req.path}`;

	fs.appendFile('server.log', log + '\n');
	next();

});

app.use((req,res,next) => {
	res.render('maintainance.hbs');  //hrlp.html now also running because the middleware cannot execute as help.html middleware is above this function
});
//end middleware

//helper

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('ScreamIt' , (text) => {
	return text.toUpperCase();
})
//end helper

app.get('/',(req,res) => {
	//res.send('Hello');

	//passing the json file

	// res.send({
	// 	name :'Urvashi',
	// 	Likes : [
	// 		'singing',
	// 		'Dancing'
	// 	]
	// });

	res.render('home.hbs', {
		pageTitle:'Home Page',
		CurrentYear: new Date().getFullYear(),
		username:'Urvashi'
	});
});

app.get('/about' , (req,res) => {
	//res.send('About Page');

	res.render('about.hbs',{
		pageTitle:'About Page',
		CurrentYear: new Date().getFullYear()
	});
});

app.get('/bad' ,(req,res) => {

	res.send({
		errorMsg:'Unable to handle the request'
	});
});

app.listen(3000 , () => {
	console.log('server 3000 is start now');
});