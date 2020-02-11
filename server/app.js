const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// import routes
const instaRoutes = require('./routes/insta');
const userRoutes = require('./routes/user');

// app
const app = express();

// database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(() => {
  console.log("DB Connected")
})

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes middleware
app.use('/insta', instaRoutes);
app.use('/user', userRoutes);

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})