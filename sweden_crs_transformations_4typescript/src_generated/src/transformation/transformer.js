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
var transform_strategy_from_sweref99_or_rt90_to_wgs84_1 = __importDefault(require("./transform_strategy_from_sweref99_or_rt90_to_wgs84"));
var transform_strategy_from_wgs84_to_sweref99_or_rt90_1 = __importDefault(require("./transform_strategy_from_wgs84_to_sweref99_or_rt90"));
var transform_strategy_from_sweref99_or_rt90_to_wgs84_and_then_to_real_target_1 = __importDefault(require("./transform_strategy_from_sweref99_or_rt90_to_wgs84_and_then_to_real_target"));
/**
 * Intended to be an internal class, i.e. not exported from the library
 * (i.e. not exported from the file 'src/index.ts')
 */
var Transformer = /** @class */ (function () {
    function Transformer() {
    }
    /**
     * Transforms a source {@link CrsCoordinate} (which includes the coordinate reference system as a property)
     * to a coordinate in another coordinate reference system i.e. the target {@link CrsProjection}
     * @param sourceCoordinate - The coordinate to become transformed.
     * @param targetCrsProjection - The coordinate reference system you want to transform to.
     */
    Transformer.transform = function (sourceCoordinate, targetCrsProjection) {
        if (sourceCoordinate.crsProjection == targetCrsProjection)
            return sourceCoordinate;
        var _transFormStrategy = null;
        // Transform FROM wgs84:
        if (sourceCoordinate.crsProjection.isWgs84()
            &&
                (targetCrsProjection.isSweref() || targetCrsProjection.isRT90())) {
            _transFormStrategy = Transformer._transformStrategy_from_WGS84_to_SWEREF99_or_RT90;
        }
        // Transform TO wgs84:
        else if (targetCrsProjection.isWgs84()
            &&
                (sourceCoordinate.crsProjection.isSweref() || sourceCoordinate.crsProjection.isRT90())) {
            _transFormStrategy = Transformer._transformStrategy_from_SWEREF99_or_RT90_to_WGS84;
        }
        // Transform between two non-wgs84:
        else if ((sourceCoordinate.crsProjection.isSweref() || sourceCoordinate.crsProjection.isRT90())
            &&
                (targetCrsProjection.isSweref() || targetCrsProjection.isRT90())) {
            // the only direct transform supported is to/from WGS84, so therefore first transform to wgs84
            _transFormStrategy = Transformer._transFormStrategy_From_Sweref99OrRT90_to_WGS84_andThenToRealTarget;
        }
        if (_transFormStrategy != null) {
            return _transFormStrategy.transform(sourceCoordinate, targetCrsProjection);
        }
        throw new Error("Unhandled source/target projection transformation: " + sourceCoordinate.crsProjection + " ==> " + targetCrsProjection);
    };
    /** Implementation of transformations from WGS84 */
    Transformer._transformStrategy_from_WGS84_to_SWEREF99_or_RT90 = new transform_strategy_from_wgs84_to_sweref99_or_rt90_1.default();
    /** Implementation of transformations to WGS84 */
    Transformer._transformStrategy_from_SWEREF99_or_RT90_to_WGS84 = new transform_strategy_from_sweref99_or_rt90_to_wgs84_1.default();
    /** Implementation first transforming to WGS84 and then to the real target */
    Transformer._transFormStrategy_From_Sweref99OrRT90_to_WGS84_andThenToRealTarget = new transform_strategy_from_sweref99_or_rt90_to_wgs84_and_then_to_real_target_1.default();
    return Transformer;
}());
exports.default = Transformer;
//# sourceMappingURL=transformer.js.map