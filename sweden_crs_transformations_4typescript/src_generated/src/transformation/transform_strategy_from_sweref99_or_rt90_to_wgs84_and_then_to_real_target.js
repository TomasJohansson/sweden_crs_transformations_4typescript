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
var crs_projection_1 = __importDefault(require("../crs_projection"));
var transformer_1 = __importDefault(require("./transformer"));
/**
 * Intended to be an internal class, i.e. not exported from the library
 * (i.e. not exported from the file 'src/index.ts')
 */
var TransFormStrategy_From_Sweref99OrRT90_to_WGS84_andThenToRealTarget = /** @class */ (function () {
    function TransFormStrategy_From_Sweref99OrRT90_to_WGS84_andThenToRealTarget() {
    }
    // Precondition: sourceCoordinate must be CRS SWEREF99 or RT90
    /** @override */
    TransFormStrategy_From_Sweref99OrRT90_to_WGS84_andThenToRealTarget.prototype.transform = function (sourceCoordinate, targetCrsProjection) {
        var wgs84coordinate = transformer_1.default.transform(sourceCoordinate, crs_projection_1.default.wgs84);
        return transformer_1.default.transform(wgs84coordinate, targetCrsProjection);
    };
    return TransFormStrategy_From_Sweref99OrRT90_to_WGS84_andThenToRealTarget;
}());
exports.default = TransFormStrategy_From_Sweref99OrRT90_to_WGS84_andThenToRealTarget;
//# sourceMappingURL=transform_strategy_from_sweref99_or_rt90_to_wgs84_and_then_to_real_target.js.map