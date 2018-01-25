export const getBrowser = (window) => {
  if (!getBrowser._browser) {
    getBrowser._browser = window.msBrowser || window.browser || window.chrome
  }

  return getBrowser._browser
}

export const sendMessage = (browser, message) => browser.runtime.sendMessage(message)
