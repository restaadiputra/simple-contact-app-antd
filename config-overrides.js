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
        'font-size-base': '12px',
      },
    },
  }),
);
