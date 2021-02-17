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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper class for the 'GaussKreuger' class.
 * This class was not part of the corresponding original C#.NET class in 'MightyLittleGeodesy'
 * but the class 'GaussKreuger' has later been changed to return this 'LatLon' instead of array 'double[]'
 */
var LatLon = /** @class */ (function () {
    function LatLon(yLatitude, xLongitude) {
        this.yLatitude = yLatitude;
        this.xLongitude = xLongitude;
    }
    return LatLon;
}());
exports.default = LatLon;
//# sourceMappingURL=lat_lon.js.map