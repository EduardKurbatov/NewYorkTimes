const {override, fixbabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  fixbabelImports('import', {
    libraryName: 'antd',
    libraryDirection: 'es',
    style: true,
  }),
  addLessLoader({
    javaScriptEnabled: true
  })

