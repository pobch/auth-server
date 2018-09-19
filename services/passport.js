const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')

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

passport.use(localLogin)
