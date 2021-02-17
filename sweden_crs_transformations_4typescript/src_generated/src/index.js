"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrsCoordinate = exports.CrsProjection = void 0;
var crs_coordinate_1 = __importDefault(require("./crs_coordinate"));
exports.CrsCoordinate = crs_coordinate_1.default;
var crs_projection_1 = __importDefault(require("./crs_projection"));
exports.CrsProjection = crs_projection_1.default;
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
//# sourceMappingURL=index.js.map