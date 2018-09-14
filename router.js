module.exports = app => {
  app.get('/', (req, res, done) => {
    res.send({ hi: 'there' })
  })
}
