const Blog = require('../models/blog');
// Controllers is link between our models and our views, uses models to get data and then pass that data into a view.
// Implementing controller functions such as
// blogIndex, blogDetails, blogCreateGet, blogCreatePost, blogDelete

const blogIndex = (req, res) => {

  // Fetching all blogs and rendering them in index.ejs
  // using .sort() method with the field createdAt(added automatically by mongoose) & -1 is newest to oldest sorting order.
  Blog.find().sort({ createdAt: -1 }).then((result) => {
    res.render('index', { title: 'All Blogs', blogs: result })
  }).catch(err => console.log(err));

}

const blogDetails = (req, res) => {
  const id = req.params.id;

  Blog.findById(id).then((result) => {
    res.render('details', { title: 'Details', blog: result })
  }).catch(err => {
    console.log(err);
    res.status(404).render('404', { title: '404' });
  });

}

const blogCreateGet = (req, res) => {
  res.render('create', { title: 'New Blog' });
}

const blogCreatePost = (req, res) => {
  // We can directly send the req.body since req.body & blog schema is same.
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    // After saving the blog, redirected to home page to see the new blog.
    res.redirect('/blogs');
  }).catch(err => console.log(err));
}

const blogDelete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then(() => {
    // When sending a Ajax request we cannot directly use a redirect as a res in node. So, we can send a res.json back to browser with a redirect property, then that property is sent to browser & then we will use Front-End to redirect to the next web page.
    res.json({ redirect: '/blogs' })
  }).catch(err => console.log(err));
}

module.exports = {
  blogIndex,
  blogDetails,
  blogCreateGet,
  blogCreatePost,
  blogDelete
}