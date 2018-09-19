const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true }
})

userSchema.pre('save', function(next) {
  bcrypt.genSalt(10, (error, salt) => {
    if (error) { return next(error) }
    
    // `this` is the user document that gonna be saved to mongoDB
    bcrypt.hash(this.password, salt, null, (error, result) => {
      if (error) { return next(error) }

      this.password = result
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err) }
    
    callback(null, isMatch)
  })
}

mongoose.model('User', userSchema)
