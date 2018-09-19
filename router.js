const passport = require('passport')
const { signUp, signIn } = require('./controllers/authen')

const requireSignIn = passport.authenticate('local', { session: false })

module.exports = app => {
  app.get('/', (req, res, next) => {
    res.send({ hi: 'there' })
  })

  app.post('/signup', signUp)

  app.post('/signin', requireSignIn, signIn)
}
