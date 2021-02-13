"use strict";
/*
* https://github.com/TomasJohansson/sweden_crs_transformations_4typescript
* Copyright (c) Tomas Johansson , http://www.programmerare.com
* The code in this 'sweden_crs_transformations_4typescript' library is licensed with MIT.
* The library is based on the C#.NET library 'sweden_crs_transformations_4net' (https://github.com/TomasJohansson/sweden_crs_transformations_4net)
* and the Dart library 'sweden_crs_transformations_4dart' (https://github.com/TomasJohansson/sweden_crs_transformations_4dart)
* Both above libraries are based on the C#.NET library 'MightyLittleGeodesy' (https://github.com/bjornsallarp/MightyLittleGeodesy/)
* which is also released with MIT.
* License information about 'sweden_crs_transformations_4typescript' and 'MightyLittleGeodesy':
* https://github.com/TomasJohansson/sweden_crs_transformations_4typescript/blob/typescript_SwedenCrsTransformations/LICENSE
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crs_coordinate_1 = __importDefault(require("../crs_coordinate"));
var gauss_kreuger_1 = __importDefault(require("../mighty_little_geodesy/gauss_kreuger"));
/**
 * Intended to be an internal class, i.e. not exported from the library
 * (i.e. not exported from the file 'src/index.ts')
 */
var TransformStrategy_from_SWEREF99_or_RT90_to_WGS84 = /** @class */ (function () {
    function TransformStrategy_from_SWEREF99_or_RT90_to_WGS84() {
    }
    // Precondition: sourceCoordinate must be CRS SWEREF99 or RT90
    /** @override */
    TransformStrategy_from_SWEREF99_or_RT90_to_WGS84.prototype.transform = function (sourceCoordinate, targetCrsProjection) {
        var gkProjection = new gauss_kreuger_1.default();
        gkProjection.swedish_params(sourceCoordinate.crsProjection);
        var latLon = gkProjection.grid_to_geodetic(sourceCoordinate.yLatitude, sourceCoordinate.xLongitude);
        return crs_coordinate_1.default.createCoordinate(targetCrsProjection, latLon.yLatitude, latLon.xLongitude);
    };
    return TransformStrategy_from_SWEREF99_or_RT90_to_WGS84;
}());
exports.default = TransformStrategy_from_SWEREF99_or_RT90_to_WGS84;
//# sourceMappingURL=transform_strategy_from_sweref99_or_rt90_to_wgs84.js.map