var test = require('tape')
var Services = require('./services')
var EcToranoanaJp = require('doujinshop-meta-search-service-ec-toranoana-jp')
var EcToranoanaJpJoshi = require('doujinshop-meta-search-service-ec-toranoana-jp-joshi')
var WwwMelonbooksCoJp = require('doujinshop-meta-search-service-www-melonbooks-co-jp')

function setUpServices () {
  var tora = new EcToranoanaJp()
  var joshi = new EcToranoanaJpJoshi()
  var melonbooks = new WwwMelonbooksCoJp()
  return { tora, joshi, melonbooks }
}

test('create instance', t => {
  t.test('var client = new Services(services)', t => {
    var s = new Services(setUpServices())
    var { tora, joshi, melonbooks } = s.services
    t.ok(s instanceof Services, 's instanceof Services')
    t.is(s.services.tora, tora, 's.services.tora eq new EcToranoanaJp')
    t.is(s.services.joshi, joshi, 's.services.joshi eq new EcToranoanaJpJoshi')
    t.is(s.services.melonbooks, melonbooks, 's.services.melonbooks eq new WwwMelonbooksCoJp')
    t.end()
  })
  t.test('var client = Services(services)', t => {
    var s = Services(setUpServices())
    var { tora, joshi, melonbooks } = s.services
    t.ok(s instanceof Services, 's instanceof Services')
    t.is(s.services.tora, tora, 's.services.tora eq new EcToranoanaJp')
    t.is(s.services.joshi, joshi, 's.services.joshi eq new EcToranoanaJpJoshi')
    t.is(s.services.melonbooks, melonbooks, 's.services.melonbooks eq new WwwMelonbooksCoJp')
    t.end()
  })
  t.end()
})

test('client.request(params, (error, results) => { ... }', t => {
  var s = Services(setUpServices())
  var category = 'act'
  var value = '桐下悠司'
  var params = { category, value }
  s.request(params, (errors, results) => {
    t.error(errors, 'no errors')
    t.ok(results.tora)
    t.ok(results.joshi)
    t.ok(results.melonbooks)
    console.log(JSON.stringify(results))
    t.end()
  })
})
