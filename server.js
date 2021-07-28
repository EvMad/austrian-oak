const express = require('express');
const mongoose = require('mongoose');
const logger = require("morgan");
require('dotenv').config();

const Port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/boot-camp-fitness', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

