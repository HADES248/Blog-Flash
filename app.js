// Creating an express app
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


const app = express();
// First we get the function back from require then we invoke that function to create an instance of express app.

// Connection String to Mongodb Atlas (MongDB API)
const MongoURI = 'mongodb+srv://Shiva:ShivanshSingh@mongodb.3e7nf.mongodb.net/Node?retryWrites=true&w=majority&appName=MongoDb'

// Mongoose is a 3rd party ODM (Object Document Mapping) Library, It wraps the MongoDb API & provides us an easier way to connect & communicate with the database. 
mongoose.connect(MongoURI).then((result) => {
  //listening for requests after the connected to db is established, not before as if there is Db content on the home page it wont be loaded.
  app.listen(3000);
  console.log('Connected to Db');
}).catch((err) => {
  console.log(err);
});

// Using 3rd party middleware (morgan in this case), directly use morgan with options as params(dev,tiny)
// morgan is used to log several values (req sent by the browser, etc) in the console.
app.use(morgan('dev'));

// middleware & static files (Static files- images,css) Express also has middleware functions which allows the browser to access static files .
app.use(express.static("public"));
// Using express middleware .urlencoded() to parse the data of the req sent into a workable format.
// .urlencoded() takes all the data from the request sent & passes that data in the request object.
// extneded: true means that you can send more complex data in the request body.
app.use(express.urlencoded({ extended: true }))


/*
// mongoose & mongo sandbox routes(testing routes)
//1. Adding a new Blog
app.get('/add-blog', (req, res) => {
  // Using blog model to create a new instance of the blog(following the schema).
  const blog = new Blog({
    title: 'FFI Tournament (Update 2)',
    snippet: 'Football Frontier International Match Rescheduled',
    body: 'The Match for 20th Nov has been rescheduled for 21st Nov.'
  })

  // When we use the instance of the blog model(blog constant) it gives us various methods that we can use.
  blog.save().then((result) => {
    res.send(result)
  }).catch(err => console.log(err));
})

//2. retrive all blogs from the collection.
app.get('/all-blogs', (req, res) => {
  Blog.find().then((result) => {
    res.send(result)
  }).catch(err => console.log(err));
})

//3. retrive single blog from the collection.
app.get('/single-blog', (req, res) => {
  Blog.findById('6728915f5e87f8e44ffce0e1').then((result) => {
    res.send(result)
  }).catch(err => console.log(err));
})
*/



/*
 Middleware - it is the code that runs between the request made by the browser and the response sent by the server. 
Some Uses - logger middleware:- to run the for every request and log the request details
Authentication checks for protected routes
Middleware to parse JSON data from requests
Return 404 pages (like the bottom of this code)

All the code runs until the response(res) is sent back by the server, Example:-

app.use((req,res, next) => {
 console.log("New Request Made");
 console.log("host:", req.hostname);
 console.log("path:", req.path);
 console.log("method:", req.method);
 // If we don't want to send a response back to the browser we will need to use the next() function to move to the next line of code as Express does not move on to the next line of code by itself.
 next();
})

*/

// View Engines - they help us inject dynamic data (like blogs - every one has different blogs) in our html page.
// Express apps can use view engines very easily.
// We will use EJS for this project.
// To set up our view engine we use .set()
app.set('view engine', 'ejs');
// we can also store our views in different folder but we would need to specify the location of that folder.
// app.set('view', 'myViews');


//HOME PAGE
// To respond we use app.(type of request get,post)
// Routes for different types of request can be same (/) can be for both app.get & app.post
// Takes 2 arguements, path and an call back function with req,res
app.get('/', (req, res) => {
  res.redirect('/blogs');

  /*
    Automatically sets the content-type so no setheader required & the statusCode.
    res.send('<h1>Welcome to the Football Frontier International</h1>');
    res.sendFile('./views/index.html', { root: __dirname });

    Sandbox array for index.ejs
    const blogs = [
    { title: 'Axel has Fire Element', snippet: 'Fire Tornado' },
    { title: 'Shawn has Ice Element', snippet: 'Eternal Blizzard' },
    { title: 'Jordan has Nature Element', snippet: 'Astro Break' },
  ]
  

  To send a view as a response back to the browser we can use res.render().
  To render dynamic data in view we can send an object as a second params.
  res.render('index', { title: 'Home', blogs });
  This object is passed to index.ejs & can be accessed there.

  How Does This work? 
  Ejs file is passed into ejs view engine, that engine checks for the dynamic data, figures out the html for that part then sends that complete html page(with dynamic data) back to the browser.(This process is called server-side rendering).
  */
});


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


// Blog routes - All the routes related to Blogs
// Outputting the document data into the view.
app.get('/blogs', (req, res) => {
  // Fetching all blogs and rendering them in index.ejs
  // using .sort() method with the field createdAt(added automatically by mongoose) & -1 is newest to oldest sorting order.
  Blog.find().sort({ createdAt: -1 }).then((result) => {
    res.render('index', { title: 'All Blogs', blogs: result })
  }).catch(err => console.log(err));
})

// Adding a blog
app.post('/blogs', (req, res) => {

  // We can directly send the req.body since req.body & blog schema is same.
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    // After saving the blog, redirected to home page to see the new blog.
    res.redirect('/blogs');
  }).catch(err => console.log(err));
});


// Creating a Blog
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'New Blog' });
})

// Detailing a blog
// Route Parameters - Basically part of the route which is a variable, can be implemented using :variable name.
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;

  console.log(id);
  Blog.findById(id).then((result) => {
    res.render('details', { title: 'Details', blog: result })
  }).catch(err => console.log(err));
})

// Deleting a blog
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then((result) => {
    // When sending a Ajax request we cannot directly use a redirect as a res in node. So, we can send a res.json back to browser with a redirect property, then that property is sent to browser & then we will use Front-End to redirect to the next web page.
    res.json({ redirect: '/blogs' })
  }).catch(err => console.log(err));
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



