const mongoose = require("mongoose");
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const error_handler = require('./common/middlewares/error-handler')
const {NotFoundError} = require('./common/errors/not_found')

const Online = require('./routes/online')
const signInRouter = require('./routes/signin')
const signUpRouter = require('./routes/signup')
const currentUser = require('./routes/current-user')

const app = express();

app.use(bodyParser.json());
const corsOptions = {
    exposedHeaders: ['token', 'Authorization ', 'Content-Type', 'Host']
};
app.use(cors(corsOptions));
app.set('trust proxy', true)

app.use('/auth', [signInRouter, signUpRouter, currentUser, Online]);

app.all("*", async (req, res, next) => {
    const error = new NotFoundError()
    next(error)
})

app.use(error_handler);

const start = async () => {
    // if (!process.env.JWT_KEY) {
    //     throw new Error('JWT_KEY must be defined');
    // }
    //
    // if (!process.env.MONGO_URI) {
    //     throw new Error('MONGO_URI must be defined');
    // }

    try {
        await mongoose.connect('mongodb://auth-mongo-svc:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
};

app.listen(3000, () => {
    console.log(`Listening at port : 3000`)
});
start();