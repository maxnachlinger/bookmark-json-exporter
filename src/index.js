import { getBrowser, sendMessage } from './util'
import { exportTypes, messageTypes } from './consts'

const showError = (text) => {
  const message = document.getElementById('message')
  message.setAttribute('class', 'error')
  message.innerText = text
}

const exportUiElements = [
  {type: exportTypes.tree, elementId: 'export-tree'},
  {type: exportTypes.flattened, elementId: 'export-array'}
]

document.addEventListener('DOMContentLoaded', () => {
  const browser = getBrowser(window)

  browser.runtime.onMessage
    .addListener(({action, payload}) => {
      if (action === messageTypes.exportFailed) {
        return showError(payload.error)
      }
      // OK - perhaps show a green check which fades out
    })

  exportUiElements.forEach(({type, elementId}) => {
    document.getElementById(elementId)
      .addEventListener('click', () => sendMessage(browser, {
        action: messageTypes.exportRequested,
        payload: {type}
      }))
  })
})
