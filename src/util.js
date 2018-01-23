export const downloadBlob = (window, filename, blob) => {
  const url = window.URL.createObjectURL(blob)

  // all this to get a nicer name for the downloaded file
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

const zeroPadLessThan10 = (i) => i < 10 ? `0${i}` : i

export const getCurrentDateStr = () => {
  const today = new Date()
  const day = zeroPadLessThan10(today.getDate())
  const month = zeroPadLessThan10(today.getMonth() + 1)
  return `${today.getFullYear()}-${month}-${day}`
}

export const jsonStringToBlob = (window, str) => new window.Blob([str], { type: 'application/json' })

// TODO - flatten tree to array of groups and links, keep ancestry as a new "path" property, name groups as
// parent-group-name : child-group-names

export const bookmarksTreeToArrayOfGroups = (tree) => {
  //
}
