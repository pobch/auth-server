const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config')

const User = mongoose.model('User')

const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  let user
  try {
    user = await User.findOne({ email: email })
    if (!user) { return done(null, false) }
  } catch (error) {
    return done(error)
  }
  user.comparePassword(password, (err, isMatch) => {
    if (err) { return done(err) }
    if (!isMatch) { return done(null, false) }
    return done(null, user)
  })
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub)
    if (!user) { return done(null, false) }
    return done(null, user)
  } catch (error) {
    return done(error)
  }
})

passport.use(localLogin)
passport.use(jwtLogin)
