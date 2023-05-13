const Blog = require('../models/Blog');

exports.getAllPosts = async (req, res) => {
  const blogs = await Blog.find({}).sort('-dateCreated');
  res.render('index', {
    blogs,
  });
};

exports.getPost = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('post', {
    blog,
  });
};

exports.addPost = async (req, res) => {
  const addBLog = async (newTitle, newDetail) => {
    await Blog.create({ title: newTitle, detail: newDetail });
  };
  addBLog(req.body.title, req.body.detail);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.title = req.body.title;
  blog.detail = req.body.detail;
  blog.save();

  res.redirect(`/post/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
