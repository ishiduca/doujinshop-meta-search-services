# doujinshop-meta-search-services

```js
var yo = require('yo-yo')
var EcToranoanaJp = require('doujinshop-meta-search-service-ec-toranoana-jp')
var EcToranoanaJpJoshi = require('doujinshop-meta-search-service-ec-toranoana-jp-joshi')
var EcToranoanaJp = require('doujinshop-meta-search-service-ec-toranoana-jp')
var WwwMeaonbooksCoJp = require('doujinshop-meta-search-service-www-melonbooks-co-jp')

var Services = require('doujinshop-meta-search-services')
var client  = new Services({
  ecToranoanaJp: new EcToranoanaJp(),
  ecToranoanaJpJoshiJoshi: new EcToranoanaJpJoshi(),
  wwwMelonbooksCoJp: new WwwMelonbooksCoJp()
})

client.request(params, (errors, results) => {
  if (errors) Object.keys(errors).map(name => console.log(errors[name]))

  var list = Object.keys(results).map(service => (
    view({
      params,
      requestURI: client[service].createURI(params),
      result: results[service],
      service
    })
  ))
  var tree = yo`<main>${list}</main>`
  console.log(String(tree))
})

function view ({ params, requestUri, results, service }) {
  var { category, value, opts = {} } = params
  var header = yo`
  <header>
    <p>${service}</p>
    <h3>${category} => "${value}"</h3>
    <p>${JSON.stringify(opts)}</p>
    <a href=${requestUri} target="_blank">${requestUri}</a>
  </header>
  `
  var list = results.map(({ uri, title, links }) => yo`
  <article>
    <section>
      <cite>
        <a href=${uri} title=${tilte} target="_blank">${title}</a>
      </cite>
      <figure>
        <a href=${uri} title=${tilte} target="_blank">
          <img src=${thumbnail.src} />
        </a>
      </figure>
    </section>
    <aside>
      <ul>
        ${links.map(({ href, tilte } => yo`<a href=${href} title=${title} target="_blank">${title}</a>`)}}
      </ul>
    </aside>
  </article>
  `)
  return yo`<section>${header}${list}</section>`
}
```
