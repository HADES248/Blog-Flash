const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// Moving all blog routes to a new folder to clean up code.
// Using express method Router() for the routes, it creates an instance of express app then we export this instance to be used in the main app.

// Blog routes - All the routes related to Blogs
// Outputting the document data into the view.
router.get('/', (req, res) => {
  // Fetching all blogs and rendering them in index.ejs
  // using .sort() method with the field createdAt(added automatically by mongoose) & -1 is newest to oldest sorting order.
  Blog.find().sort({ createdAt: -1 }).then((result) => {
    res.render('index', { title: 'All Blogs', blogs: result })
  }).catch(err => console.log(err));
})

// Adding a blog
router.post('/', (req, res) => {

  // We can directly send the req.body since req.body & blog schema is same.
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    // After saving the blog, redirected to home page to see the new blog.
    res.redirect('/blogs');
  }).catch(err => console.log(err));
});


// Creating a Blog
router.get('/create', (req, res) => {
  res.render('create', { title: 'New Blog' });
})

// Detailing a blog
// Route Parameters - Basically part of the route which is a variable, can be implemented using :variable name.
router.get('/:id', (req, res) => {
  const id = req.params.id;

  console.log(id);
  Blog.findById(id).then((result) => {
    res.render('details', { title: 'Details', blog: result })
  }).catch(err => console.log(err));
})

// Deleting a blog
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then((result) => {
    // When sending a Ajax request we cannot directly use a redirect as a res in node. So, we can send a res.json back to browser with a redirect property, then that property is sent to browser & then we will use Front-End to redirect to the next web page.
    res.json({ redirect: '/blogs' })
  }).catch(err => console.log(err));
})

module.exports = router;