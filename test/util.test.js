import { bookmarksTreeToArrayOfGroups } from '../src/util'
import * as bookmarksTree from './fixtures/bookmarks-tree'

describe('Unit: utils.js Tests', () => {
  it('bookmarksTreeToArrayOfGroups flattens the bookmarks tree to an array of groups', () => {
    const result = bookmarksTreeToArrayOfGroups(bookmarksTree)
    expect(result.legnth).toBeGreaterThan(0)
  })
})
