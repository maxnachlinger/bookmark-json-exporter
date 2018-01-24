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

// flattens bookmarks tree to a simple array of link-groups
export const bookmarksTreeToArrayOfGroups = (tree) => {
  const root = tree.shift();
  const toProcess = root.children;
  const result = {};

  while (toProcess.length > 0) {
    const {id, parentId, title, children, dateAdded} = toProcess.shift()
    const parent = result[parentId];

    // leaf node
    if (parent && !children) {
      parent.links.push({id, parentId, title, dateAdded})
    }

    // group
    if (children) {
      result[id] = {id, parentId, title, dateAdded, links: []}
      toProcess.push(...children)
    }
  }

  return Object.values(result);
}
