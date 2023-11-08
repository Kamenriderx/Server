const express = require('express') ;
const app = express();
const http = require('http').createServer(app);
const configCors = require('./config/cors');
const path = require('path');
const bodyParser = require('body-parser');



app.use(configCors);
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


const imagesPath = path.join(__dirname, 'public', 'images');
const docsPath = path.join(__dirname, 'public', 'docs');

app.use(express.static('./public'));
app.use('/docs', express.static(docsPath));
app.use('/images', express.static(imagesPath));



app.use('/mastergym', require('./app/routes'));


http.listen(3000, () => {
  console.log('API lista en el puerto ', 3000)

});