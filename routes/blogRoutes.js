const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Moving all blog routes to a new folder to clean up code.
// Using express method Router() for the routes, it creates an instance of express app then we export this instance to be used in the main app.

// Blog routes - All the routes related to Blogs
// Outputting the document data into the view.
router.get('/', blogController.blogIndex);

// Adding a blog
router.post('/', blogController.blogCreatePost);


// Creating a Blog
router.get('/create', blogController.blogCreateGet);

// Detailing a blog
// Route Parameters - Basically part of the route which is a variable, can be implemented using :variable name.
router.get('/:id', blogController.blogDetails);

// Deleting a blog
router.delete('/:id', blogController.blogDelete);

module.exports = router;