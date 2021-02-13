import CrsCoordinate from './crs_coordinate';
import CrsProjection from './crs_projection';

export {CrsProjection, CrsCoordinate};

// the above exported classes are generated into a file 'dist\swed_crs_transform_bundle.js'
// running the following command:
//  pnpm run dev
// at least it does so with the following (current when this comment was written) configurations:
// the file "package.json":
//      ... "dev":  "webpack --mode development",
// the file "webpack.config.js":
//  ...
//  entry: {
//     swed_crs_transform: './src/index.ts',
//  },  
//      ....
//   filename: '[name]_bundle.js',
//   path: path.resolve(__dirname, 'dist'),