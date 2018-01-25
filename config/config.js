const path = require('path')

const srcDirectory = path.join(__dirname, '/../src')
const outputDirectory = path.join(__dirname, '/../build')

module.exports = {
  indexEntryPath: path.join(srcDirectory, '/index.js'),
  backgroundEntryPath: path.join(srcDirectory, '/background.js'),
  sourceAssetsDirectory: path.join(srcDirectory, '/assets'),
  srcDirectory,
  outputDirectory
}
