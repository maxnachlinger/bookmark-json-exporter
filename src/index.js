import { downloadBlob, getCurrentDateStr, jsonStringToBlob } from './util'

// cross browser bookmarks
window.browser = (() => window.msBrowser || window.browser || window.chrome)()

const getBookmarksJson = (callback) => {
  if (!window.browser) {
    return callback(new Error('No bookmarks API found.'))
  }
  return window.browser.bookmarks.getTree((nodes) => callback(null, JSON.stringify(nodes, null, 2)))
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
