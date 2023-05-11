const express = require('express');

const app = express();

const blog = { id: 1, title: 'Blog title', description: 'Blog description' };

//ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add_post');
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

const port = 3001;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
