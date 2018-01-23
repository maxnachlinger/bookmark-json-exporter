const getBookmarksApi = () => (chrome || browser || {}).bookmarks

const getBookmarksJson = (callback) => {
  const api = getBookmarksApi()
  if (!api) {
    return callback(new Error('No bookmarks API found.'))
  }
  return api.getTree((nodes) => callback(null, JSON.stringify(nodes, null, 2)))
}

const jsonStringToBlob = (str) => new Blob([str], {type: 'application/json'})

const zeroPadLessThan10 = (i) => i < 10 ? `0${i}` : i

const getCurrentDateStr = () => {
  const today = new Date()
  const day = zeroPadLessThan10(today.getDate())
  const month = zeroPadLessThan10(today.getMonth() + 1)
  return `${today.getFullYear()}-${month}-${day}`
}

const downloadBlob = (filename, blob) => {
  const url = URL.createObjectURL(blob)

  // all this to get a nicer name for the downloaded file
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

document.addEventListener('DOMContentLoaded', () => {
  return getBookmarksJson((error, json) => {
    if (error) {
      document.body.innerText = error.message
      return
    }

    const filename = `bookmarks-export-${getCurrentDateStr()}.json`
    return downloadBlob(filename, jsonStringToBlob(json))
  })
})
