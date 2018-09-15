const mongoose = require('mongoose')

const User = mongoose.model('User')

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
    return res.send(newUser)
  
  } catch(err) {
    console.log('>>>>>>>>> My error was caught <<<<<<<<<<<')
    return next(err)
  }
}
