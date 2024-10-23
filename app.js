// Creating an express app
const express = require('express');
const app = express();
// First we get the function back from require then we invoke that function to create an instance of express app.


//listening for requests
app.listen(3000);


// View Engines - they help us inject dynamic data (like blogs - every one has different blogs) in our html page.
// Express apps can use view engines very easily.
// We will use EJS for this project.
// To set up our view engine we use .set()
app.set('view engine', 'ejs');
// we can also store our views in different folder but we would need to specify the location of that folder.
// app.set('view', 'myViews');



//HOME PAGE
// To respond we use app.(type of request get,post)
// Takes 2 arguements, path and an call back function with req,res
app.get('/', (req, res) => {
  /*
    Automatically sets the content-type so no setheader required & the statusCode.
    res.send('<h1>Welcome to the Football Frontier International</h1>');
    res.sendFile('./views/index.html', { root: __dirname });
  */

  const blogs = [
    { title: 'Axel has Fire Element', snippet: 'Fire Tornado' },
    { title: 'Shawn has Ice Element', snippet: 'Eternal Blizzard' },
    { title: 'Jordan has Nature Element', snippet: 'Astro Break' },
  ]

  // To send a view as a response back to the browser we can use res.render().
  // To render dynamic data in index html we can send an object as a second params.
  res.render('index', { title: 'Home', blogs });
  // This object is passed to index.ejs & can be accessed there.

  // How Does This work? 
  // Ejs file is passed into ejs view engine, that engine checks for the dynamic data, figures out the html for that part then sends that complete html page(with dynamic data) back to the browser.(This process is called server-side rendering).



})

//ABOUT PAGE
app.get('/about', (req, res) => {
  /*
    To send an html file in res we can use .sendFile()
    One Problem, sendFile looks for an absolute path as a parameter from the root file computer, to define a relative path we have to specify where it is relative from using a second params
    res.sendFile('./views/about.html', { root: __dirname });
  */
  res.render('about', { title: 'About' });
})


// Redirects in express
app.get('./about-us', (req, res) => {
  res.redirect('/about');
})


// Creating a Blog
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'New Blog' });
})



// 404 Page
// In cases of 404 page we use .use() in express, this function fires for every request coming but only if the request reaches this point in the code (meaning if request finds the correct match it will send back the res and the req will end otherwise 404 page). Therefore, this should always be in the bottom of the code.
app.use((req, res) => {
  /*
  res.status(404).sendFile('./views/404.html', { root: __dirname });
  // Also need to set status here as express does not realize that anything is wrong here.
  */
  res.status(404).render('404', { title: '404' });
})



