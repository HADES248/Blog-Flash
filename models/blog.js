// Schemas define the document, it's properties & property types.
const mongoose = require('mongoose');

// Requiring Schema attribute from mongoose
const Schema = mongoose.Schema;

// Creating a Schmea for the blogs.
const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }

  // Adding a constructor for the schema to add timestamps for the blogs (will help updating them.)
}, { timestamps: true })


// Models are the structures that actually allow is to communicate with a db collection. Eg:- If we create a blog model of a blog schema it will have static & instance methods to save, update, read data from the blogs collection.
// We use .model() from mongoose with two params collection name(which needs to be singular eg:- blogs to blog) and schema name
const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
