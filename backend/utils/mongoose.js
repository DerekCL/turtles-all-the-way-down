'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function () {

    const db = mongoose.connect('mongodb://localhost:27017/social-auth-example');

    const UserSchema = new Schema({
        email: {
            type: String, required: true,
            trim: true, unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        facebookProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        twitterProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        googleProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        }
    });

    UserSchema.set('toJSON', {getters: true, virtuals: true});

    UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
        let that = this;
        return this.findOne({
            'twitterProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                let newUser = new that({
                    email: profile.emails[0].value,
                    twitterProvider: {
                        id: profile.id,
                        token: token,
                        tokenSecret: tokenSecret
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
        let that = this;
        return this.findOne({
            'facebookProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                let newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
        let that = this;
        return this.findOne({
            'googleProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            if (!user) {
                let newUser = new that({
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    googleProvider: {
                        id: profile.id,
                        token: accessToken
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    mongoose.model('User', UserSchema);

    return db;
};