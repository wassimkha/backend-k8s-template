const express = require('express');
const bodyParser = require('body-parser');
const Online = require('./routes/online')

const app = express();

app.use(bodyParser.json());
app.use('/auth', Online);


app.listen(3000, () => console.log(`Listening at port : 8080`));