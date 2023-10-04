const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config();
const mongoose = require('mongoose');


// add routes
const apiRouter = require("./routes/apiRouter")

// add controllers
const PORT = 3000;
const MONGO_URI = `mongodb+srv://${process.env.MDBLOGIN}:${process.env.MDBPWD}@citycommuters.8it9lcw.mongodb.net/`;

mongoose.connect(MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
})

app.use(express.urlencoded());
app.use(express.json());
// app.use(cookieParser());

// new user
app.use('/api', apiRouter)

//unknown route
app.use('*', (req, res) => {
    console.log('unknown route handler')
    res.status(500).json('unknown route handler')
})

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));


