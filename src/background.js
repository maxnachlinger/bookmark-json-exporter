import {
  bookmarksTreeToArrayOfGroups, downloadBlob, getBrowser, getCurrentDateStr, identity, jsonStringToBlob,
  sendMessage
} from './util'
import { exportTypes, messageTypes } from './consts'

const getBookmarksJson = (window, transform, callback) => {
  const browser = getBrowser(window)
  if (!browser) {
    return callback(new Error('No bookmarks API found.'))
  }
  return browser.bookmarks.getTree((nodes) => callback(null, JSON.stringify(transform(nodes), null, 2)))
}

const exportTypeTransformMap = {
  [exportTypes.tree]: identity,
  [exportTypes.flattened]: bookmarksTreeToArrayOfGroups
}

const exportBookmarks = (window, browser, type) => {
  const transform = exportTypeTransformMap[type]

  return getBookmarksJson(window, transform, (error, json) => {
    if (error) {
      sendMessage(browser, {action: messageTypes.exportFailed, payload: {error: error.message}})
      return
    }

    const filename = `bookmarks-${type}-${getCurrentDateStr()}.json`
    downloadBlob(window, filename, jsonStringToBlob(window, json))
    return sendMessage(browser, {action: messageTypes.exportOk, payload: {type}})
  })
}

const browser = getBrowser(window)
browser.runtime.onMessage
  .addListener(({action, payload: {type}}) => {
    if (action !== messageTypes.exportRequested) {
      return
    }

    return exportBookmarks(window, browser, type)
  })
