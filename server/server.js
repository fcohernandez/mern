const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

app.use(cors());
app.use(require('./routes/libro'));


mongoose.connect('mongodb://localhost:27017/libros', {useNewUrlParser: true, useFindAndModify: false}, (err, res) => {
    if(err) throw err;

    console.log('Base de datos online');
});


app.listen(3001, ()=> {
    console.log('Escuchando puerto 3001');
});