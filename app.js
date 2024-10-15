// Creating an express app
const express = require('express');
const app = express();
// First we get the function back from require then we invoke that function to create an instance of express app.


//listening for requests
app.listen(3000);

//HOME PAGE
// To respond we use app.(type of request get,post)
// Takes 2 arguements path and an call back function with req,res
app.get('/', (req, res) => {

  // Automatically sets the content-type so no setheader required & the statusCode.
  //res.send('<h1>Welcome to the Football Frontier International</h1>');

  res.sendFile('./views/index.html', { root: __dirname });

})

//ABOUT PAGE
app.get('/about', (req, res) => {
  // To send an html file in res we can use .sendFile()
  // One Problem, sendFile looks for an absolute file as a parameter from the root file computer, to define a relative path we have to specify where it is relative from using a second params
  res.sendFile('./views/about.html', { root: __dirname });
})


// Redirects in express
app.get('./about-us', (req, res) => {
  res.redirect('/about');
})

// 404 Page
// In cases of 404 page we use .use() in express, this function fires for every request coming but only if the request reaches this point in the code (meaning if request finds the correct match it will send back the res and the req will end otherwise 404 page). Therefore, this should always be in the bottom of the code.
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
  // Also need to status here as express does not realize that anything is wrong here.
})



