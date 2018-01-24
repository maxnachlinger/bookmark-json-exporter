import { bookmarksTreeToArrayOfGroups } from '../src/util'
import { bookmarksTree } from './fixtures/bookmarks-tree'

describe('Unit: utils.js Tests', () => {
  it('bookmarksTreeToArrayOfGroups flattens the bookmarks tree to an array of groups', () => {
    const result = bookmarksTreeToArrayOfGroups(bookmarksTree)
    expect(result.length).toEqual(5)
    expect(result.map((o) => o.title)).toEqual([
      'Bookmarks Bar',
      'Other Bookmarks',
      'Mobile Bookmarks',
      'folder-0',
      'sub-folder-0'
    ])
  })
})
