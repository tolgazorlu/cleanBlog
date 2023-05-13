const express = require('express');
const methodOverride = require('method-override');
const postController = require('./controllers/postControllers');
const pageControllers = require('./controllers/pageControllers');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const app = express();

// MIDDLEWARES
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//PORT
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/post/:id', postController.getPost);
app.post('/blogs', postController.addPost);
app.put('/post/edit/:id', postController.updatePost);
app.delete('/post/:id', postController.deletePost);

app.get('/about', pageControllers.getAbout);
app.get('/add', pageControllers.getAdd);
app.get('/post/edit/:id', pageControllers.getEdit);
