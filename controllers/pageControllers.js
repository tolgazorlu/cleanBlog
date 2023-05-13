const Blog = require('../models/Blog');

exports.getAbout = (req, res) => {
  res.render('about');
};

exports.getAdd = (req, res) => {
  res.render('add_post');
};

exports.getEdit = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('edit', {
    blog,
  });
};
