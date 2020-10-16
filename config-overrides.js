const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const { addReactRefresh } = require('customize-cra-react-refresh');

module.exports = override(
  addReactRefresh(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        'font-size-base': '14px',
        'font-family': `'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji'`,
      },
    },
  }),
);
