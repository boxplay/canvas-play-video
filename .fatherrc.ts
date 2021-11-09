import { IBundleOptions } from 'father';
import 'babel-polyfill';

const options: IBundleOptions = {
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    name: 'canvas-play-video',
    globals: {
      react: 'React',
    },
  },
  // runtimeHelpers: true,
  autoprefixer: {
    overrideBrowserslist: [
      'last 2 versions',
      'Firefox ESR',
      '> 1%',
      'ie >= 11',
    ],
  },
  extraPostCSSPlugins: [],
};

export default options;
