const path = require('path')

const srcDirectory = path.join(__dirname, '/../src')
const outputDirectory = path.join(__dirname, '/../build')

module.exports = {
  sourceEntryPath: path.join(srcDirectory, '/index.js'),
  sourceAssetsDirectory: path.join(srcDirectory, '/assets'),
  srcDirectory,
  outputDirectory
}
