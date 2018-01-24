import { bookmarksTreeToArrayOfGroups, downloadBlob, getCurrentDateStr, identity, jsonStringToBlob } from './util'

// cross browser bookmarks
window.browser = (() => window.msBrowser || window.browser || window.chrome)()

const getBookmarksJson = (transform, callback) => {
  if (!window.browser) {
    return callback(new Error('No bookmarks API found.'))
  }
  return window.browser.bookmarks.getTree((nodes) => callback(null, JSON.stringify(transform(nodes), null, 2)))
}

const getExportUiElements = () => [
  {type: 'tree', transform: identity, elementId: 'export-tree'},
  {type: 'flattened', transform: bookmarksTreeToArrayOfGroups, elementId: 'export-array'}
]

const showError = (text) => {
  const message = document.getElementById('message')
  message.setAttribute('class', 'error')
  message.innerText = text
}

const exportBookmarks = (type, transform) => {
  console.log('exportBookmarks')
  return getBookmarksJson(transform, (error, json) => {
    if (error) {
      showError(error.message)
      return
    }

    const filename = `bookmarks-${type}-${getCurrentDateStr()}.json`
    return downloadBlob(window, filename, jsonStringToBlob(window, json))
  })
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded')
  getExportUiElements(document)
    .forEach(({type, transform, elementId}) => {
      console.log('adding listener for elementId', elementId)
      document.getElementById(elementId).addEventListener('click', () => exportBookmarks(type, transform))
    })
})
