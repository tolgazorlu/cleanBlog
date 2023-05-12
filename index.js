const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3001;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});

//ROUTES
app.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  console.log(blogs);
  res.render('index', {
    blogs
  });
});

app.get('/post/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('post', {
    blog
  })
})

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add_post');
});

app.post('/blogs', async (req, res) => {
  const addBLog = async (newTitle, newDetail) => {
    await Blog.create({title: newTitle, detail: newDetail,});
  };
  addBLog(req.body.title, req.body.detail);
  res.redirect('/');
});

// const showData = async () => {
//   const data = await Blog.find({})
//   console.log(data)
// }

// const addData = async () => {
//   await Blog.create({
//     title: "Blog 2",
//     detail: "İkinci blog yazım da çok güsel"
//   })
//   showData();
// }

// addData()
