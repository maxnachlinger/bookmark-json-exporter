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

export const jsonStringToBlob = (window, str) => new window.Blob([str], {type: 'application/json'})

export const identity = (i) => i

// flattens bookmarks tree to a simple array of link-groups
export const bookmarksTreeToArrayOfGroups = (tree) => {
  const toProcess = [tree.shift()]
  const result = {}

  while (toProcess.length > 0) {
    const {id, parentId = 0, title, children, dateAdded, url} = toProcess.shift()

    const parent = result[parentId] || {}
    const parentTitle = parent ? parent.title : ''

    const item = {id, parentId, parentTitle, title, dateAdded}

    // leaf node
    if (!children) {
      parent.links.push({...item, url})
    } else {
      // group
      result[id] = {...item, links: []}
      toProcess.push(...children)
    }
  }

  return Object.values(result)
  // omit empty groups
    .filter((g) => g.links.length > 0)
}
