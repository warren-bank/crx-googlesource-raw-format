var payload = function(){
  const enable_debugger = true

  const download_raw_format = function(event) {
    if (enable_debugger) debugger;

    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    const url = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?format=TEXT'

    // Promise
    return fetch(url)
    .then(response => {
      if (
           (!response.ok)
        || (!response.status === 200)
      ) {
        throw 'error'
      }

      return response.text()
    })
    .then(base64 => {
      if (!base64) {
        throw 'error'
      }

      if (enable_debugger) console.log(base64)

      // decode base64
      return atob(base64)
    })
    .then(byteString => {
      if (!byteString) {
        throw 'error'
      }

      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)

      for (let i=0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }

      // convert to blob
      const blob = new Blob([ab], {type: 'application/octet-stream'})

      // object URL
      return URL.createObjectURL(blob)
    })
    .then(obj_url => {
      if (!obj_url) {
        throw 'error'
      }

      const name = window.location.pathname.replace(/^.*\/([^\/]+)$/, '$1')

      // construct an in-memory download link
      const anchor = document.createElement('a')
      anchor.setAttribute('download', name)
      anchor.setAttribute('href',     obj_url)

      // trigger download dialog
      anchor.click()
    })
    .catch(error => {})
  }

  const inject_link = function() {
    if (enable_debugger) debugger;

    const links_container = document.querySelector('body > footer > div.Footer > span.Footer-formats')

    // sanity check
    if (!links_container) return

    const existing_link = links_container.querySelector('a')
    if (!existing_link) return

    const new_link = existing_link.cloneNode()
    new_link.style.marginLeft = '20px'
    new_link.innerText = 'raw'
    new_link.setAttribute('href', '?format=RAW')
    new_link.addEventListener('click', download_raw_format, false)

    links_container.appendChild(new_link)
  }

  const init = function() {
    const qs_pattern = /[\?&]format=RAW(?:[&]|$)/i

    if (
         (qs_pattern.test(window.location.search))
      && (document.body.innerText.trim() === '400: Bad Request')
    ) {
      document.body.innerHTML = '<h3>Downloading&hellip;</h3>'
      download_raw_format()
      .then(() => {
        document.body.innerHTML = '<h3>Download complete!</h3>'
      })
    }
    else {
      inject_link()
    }
  }

  init()
}

var get_hash_code = function(str){
  var hash, i, char
  hash = 0
  if (str.length == 0) {
    return hash
  }
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i)
    hash = ((hash<<5)-hash)+char
    hash = hash & hash  // Convert to 32bit integer
  }
  return Math.abs(hash)
}

var inject_function = function(_function){
  var inline, script, head

  inline = _function.toString()
  inline = '(' + inline + ')()' + '; //# sourceURL=crx_extension.' + get_hash_code(inline)
  inline = document.createTextNode(inline)

  script = document.createElement('script')
  script.appendChild(inline)

  head = document.head
  head.appendChild(script)
}

inject_function(payload)
