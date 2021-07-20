require('dotenv').config();

const mongoose = require('mongoose');

const { NOTE_APP_MONGODB_HOST, NOTE_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${NOTE_APP_MONGODB_HOST}/${NOTE_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(db => console.log('is connected'))
    .catch(err => console.log(err));