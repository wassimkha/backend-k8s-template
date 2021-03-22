const express = require('express');
const bodyParser = require('body-parser');
const Online = require('./routes/online')

const app = express();

app.use(bodyParser.json());
app.use('/payment', Online);


app.listen(4000, () => console.log(`Listening at port : 4000`));