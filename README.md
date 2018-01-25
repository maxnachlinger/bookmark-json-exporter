### bookmark-json-exporter
A bookmark JSON exporter.

![Silly UI](https://raw.github.com/maxnachlinger/bookmark-json-exporter/master/docs/silly-ui.png)

### Getting started
```shell
npm i
```

### Building
```
npm run build
```

### Add the extension to Chrome
- Build the extension (see above)
- Open a new browser tab and go to: `chrome://extensions/`
- At the top right of the screen, make sure `Developer Mode` is checked.
- Drag and drop the `/build` folder on to the `chrome://extensions/` page

### Developing
Build for dev (with source-maps)
```
npm run build-dev
```
Add the extension to chrome (see above)
[Follow this guide for debugging the popup and background pages](https://developer.chrome.com/extensions/tut_debugging)
