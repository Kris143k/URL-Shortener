const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());
const {connect} = require('./connection');
const URL = require('./models/url');

const mongodburl = process.env.MONGODB_URL || 'mongodb://localhost:27017/URLShortner';
connect(mongodburl)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error(err);
    });


const Port = 8001;

app.use(express.static('public'));

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/static');
const userRoute = require('./routes/user');

const path = require('path');
const {checkForAuth,restrictTo} = require('./middlewares/auth');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuth)

app.use('/url',restrictTo(["NORMAL","PRO"]), urlRoute);
app.use('/',staticRoute);
app.use('/user', userRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  });


app.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`);
});