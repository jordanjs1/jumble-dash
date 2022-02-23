require("dotenv").config();

const express      = require("express");
const passport     = require('passport'); 
const session      = require('express-session'); // cookie session


const app  = express();
const PORT = process.env.PORT || 8000;

const routes = require("./routes");
const db     = require("./models");

require('./config/passport')(passport); // pass passport for configuration

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

  app.use(session({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 10800000, // 3 HRS
        httpOnly: false
    }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(routes);

// Launch Server ==============================================
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    })
})