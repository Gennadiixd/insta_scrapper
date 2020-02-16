const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// import routes
const threadsRoutes = require('./components/threads');
const directRoutes = require('./components/direct');
const userRoutes = require('./components/user');

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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes middleware
app.use('/threads', threadsRoutes);
app.use('/direct', directRoutes);
app.use('/user', userRoutes);

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})