const { signUp } = require('./controllers/authen')

module.exports = app => {
  app.get('/', (req, res, next) => {
    res.send({ hi: 'there' })
  })

  app.post('/signup', signUp)
}
