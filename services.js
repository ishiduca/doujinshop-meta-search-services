var { through, duplex } = require('mississippi')

function Services (services) {
  if (!(this instanceof Services)) return new Services(services)
  this.services = { ...services }
}

module.exports = Services

Services.prototype.request = function request (params, done) {
  var i = 0
  var results = null
  var errors = null
  Object.keys(this.services).map(name => {
    this.services[name].request(params, (error, result) => {
      if (error) {
        ;(errors || (errors = {}))[name] = error
      }
      if (result) {
        ;(results || (results = {}))[name] = result
      }
      ;((i -= 1) || done(errors, results))
    })
    i += 1
  })
}

Services.prototype.createDuplex = function createDuplex () {
  var sink = through.obj()
  var source = through.obj()

  var i = 0
  source.on('pipe', () => (i += 1))
  source.on('unpipe', () => ((i -= 1) || source.end()))

  sink.pipe(through.obj((params, _, done) => {
    Object.keys(this.services).map(service => {
      var client = this.services[service]
      var dup = client.createDuplex()
      var mid = through.obj((result, _, done) => done(
        null,
        {
          result,
          params,
          service,
          requestURI: client.createURI(params)
        }
      ))

      dup.on('error', error => source.emit('error', error))
      mid.on('unpipe', () => mid.unpipe(source))
      dup.pipe(mid).pipe(source, { end: false })
      dup.end(params)
    })

    done()
  }))

  return duplex.obj(sink, source)
}
