const getBookmarksJson = (callback) => chrome.bookmarks.getTree((nodes) => callback(JSON.stringify(nodes, null, 2)))

const jsonStringToBlob = (str) => new Blob([str], {type: 'application/json'})

const zeroPadLessThan10 = (i) => i < 10 ? `0${i}` : i;

const getCurrentDateStr = () => {
  const today = new Date();
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
  return getBookmarksJson((json) => {
    const filename = `bookmarks-export-${getCurrentDateStr()}.json`
    return downloadBlob(filename, jsonStringToBlob(json))
  })
})
