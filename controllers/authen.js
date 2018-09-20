const mongoose = require('mongoose')
const jwt = require('jwt-simple')
const config = require('../config')

const User = mongoose.model('User')

const genTokenForUser = userDocument => {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: userDocument.id, iat: timestamp }, config.secret)
}

exports.signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res.status(422).json({ 'error': 'this user already exist' })
    }
    
    const newUser = await new User({
      email: email,
      password: password
    }).save()
    return res.send({ token: genTokenForUser(newUser) })
  
  } catch(err) {
    console.log('>>>>>>>>> My error was caught <<<<<<<<<<<')
    return next(err)
  }
}

exports.signIn = (req, res, next) => {
  // No need to check if(!req.user) because if the authorization fails,
  // passport middleware will send an error response beforehand therefore this function
  // will not be called

  // If this function is called, it means the authorization was passed and completed
  return res.send({ token: genTokenForUser(req.user) })
}
