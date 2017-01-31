"use strict";
module.exports = {
    session: {
        secret: 'Your cookie secret goes here',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            signed: true
        }
    }
};