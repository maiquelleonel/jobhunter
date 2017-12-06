import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'
import hbs from 'express-hbs'
import session from 'express-session'
import morgan from 'morgan'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import 'mongoose-type-email'
import User from './../../models/user'
import passport from 'passport'
import { Strategy } from 'passport-local'

module.exports = (app) => {
    app.set('port', 9000)
    app.set('views', path.join(__dirname,'./../../views/'))
    app.set('view engine', 'hbs')

    app.use( express.static(path.join(__dirname, './../../public/')) )
    app.use( morgan('env') )
    app.use( bodyParser.urlencoded({ extended: false }) )
    app.use( bodyParser.json() )
    app.use( methodOverride('_method') )
    app.use( session({
        secret: '@#IQUWWQ*(!@#!@N@!@%@^cJUD',
        resave: false ,
        saveUninitialized: false
    }))

    app.use( passport.initialize() )
    app.use( passport.session() )

    passport.use( new Strategy( User.authenticate() ))
    passport.serializeUser( User.serializeUser() )
    passport.deserializeUser( User.deserializeUser() )

    app.engine('hbs', hbs.express4({
        defaultLayout: path.join( app.get('views'),'layouts/main.hbs'),
        partialsDir: path.join( app.get('views'), 'partials'),
        layoutsDir: path.join( app.get('views'), 'layouts')
    }))

    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost:27017/indexador', { useMongoClient: true })
}
