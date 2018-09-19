const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config')

const User = mongoose.model('User')

const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, async (email, password, next) => {
  let user
  try {
    user = await User.findOne({ email: email })
    if (!user) { return next(null, false) }
  } catch (error) {
    return next(error)
  }
  user.comparePassword(password, (err, isMatch) => {
    if (err) { return next(err) }
    if (!isMatch) { return next(null, false) }
    return next(null, user)
  })
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, next) => {
  try {
    const user = await User.findById(payload.sub)
    if (!user) { return next(null, false) }
    return next(null, user)
  } catch (error) {
    return next(error)
  }
})

passport.use(localLogin)
passport.use(jwtLogin)
