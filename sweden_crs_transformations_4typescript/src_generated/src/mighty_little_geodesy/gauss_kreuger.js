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
// Note that some of the comments below may still refer to a C#.NET or Dart class rather than this TypeScript class
// (the TypeScript have been 'ported' from corresponding C#/Dart projects, as mentioned above)
// This project is based on the library [MightyLittleGeodesy](https://github.com/bjornsallarp/MightyLittleGeodesy/)
// It started as a fork, but then most of the original code is gone.
// The main part that is still used is this file with the mathematical calculations i.e. the file "GaussKreuger.cs"
// Although there has been some modifications of this file too, as mentioned below.
// https://github.com/bjornsallarp/MightyLittleGeodesy/blob/83491fc6e7454f5d90d792610b317eca7a332334/MightyLittleGeodesy/Classes/GaussKreuger.cs
// The original version of the below class 'GaussKreuger' is located at the above URL.
// That original version has been modified below in this file below but not in a significant way (e.g. the mathematical calculations has not been modified).
// The modifications:
//      - changed the class from public to internal i.e. "public class GaussKreuger" ==> "internal class GaussKreuger"
//      - a new 'LatLon' class is used as return type from two methods instead of returning an array "double[]"
//              i.e. the two method signatures have changed as below:
//              "public double[] geodetic_to_grid(double latitude, double longitude)"  ==> "public LatLon geodetic_to_grid(double latitude, double longitude)"
//              "public double[] grid_to_geodetic(double x, double y)" ==> "public LatLon grid_to_geodetic(double yLatitude, double xLongitude)"
//      - renamed and changed order of the parameters for the method "grid_to_geodetic" (see the above line)
//      - changed the method "swedish_params" to use an enum as parameter instead of string, i.e. the method signature changed as below:
//              "public void swedish_params(string projection)" ==> "public void swedish_params(CrsProjection projection)"
//      - now the if/else statements in the implementation of the above method "swedish_params" compares with the enum values for CrsProjection instead of comparing with string literals
//      - removed the if/else statements in the above method "swedish_params" which used the projection strings beginning with "bessel_rt90"
//      - removed the now unused method 'bessel_params()'
// 
// For more details about exactly what has changed in this GaussKreuger class, you can also use a git client with "compare" or "blame" features to see the changes)
// Note that *most of* the above changes were copied from the C# project which modified the GaussKreuger class.
// But later this file has been ported to the programming languages Dart and then also TypeScript.
// Thus there have been some more modifications, but for those details about what has changed when porting from C# to Dart and TypeScript, please see the git repository with the source code.
// (also be aware that some further updates may have been made in the TypeScript project without being mentioned above in the above comments that mostly was copied from the C# library)
// ------------------------------------------------------------------------------------------
// The below comment block is kept from the original source file (see the above github URL)
/*
 * MightyLittleGeodesy
 * RT90, SWEREF99 and WGS84 coordinate transformation library
 *
 * Read my blog @ http://blog.sallarp.com
 *
 *
 * Copyright (C) 2009 Björn Sållarp
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// ------------------------------------------------------------------------------------------
/*
  * .NET-implementation of "Gauss Conformal Projection
  * (Transverse Mercator), Krügers Formulas".
  * - Parameters for SWEREF99 lat-long to/from RT90 and SWEREF99
  * coordinates (RT90 and SWEREF99 are used in Swedish maps).
  *
  * The calculations are based entirely on the excellent
  * javscript library by Arnold Andreassons.
  * Source: http://www.lantmateriet.se/geodesi/
  * Source: Arnold Andreasson, 2007. http://mellifica.se/konsult
  * Author: Björn Sållarp. 2009. http://blog.sallarp.com
  *
  * Modifications in this file were made 2021 by Tomas Johansson, first in a C# project.
  * But later more changes of course when it was ported to the programming language Dart,
  * and then later to TypeScript as in this ."ts" source file.
  * For details about changes, you should be able to use the github repository to see the git history where you found this source code file.
  */
var crs_projection_1 = __importDefault(require("../crs_projection"));
var lat_lon_1 = __importDefault(require("./lat_lon"));
var GaussKreuger = /** @class */ (function () {
    function GaussKreuger() {
        this._axis = 0.0; // Semi-major axis of the ellipsoid.
        this._flattening = 0.0; // Flattening of the ellipsoid.
        this._central_meridian = 0.0; // Central meridian for the projection.    
        this._scale = 0.0; // Scale on central meridian.
        this._false_northing = 0.0; // Offset for origo.
        this._false_easting = 0.0; // Offset for origo.
    }
    /**
     * Parameters for RT90 and SWEREF99TM.
     * Note: Parameters for RT90 are choosen to eliminate the
     * differences between Bessel and GRS80-ellipsoides.
     * Bessel-variants should only be used if lat/long are given as
     * RT90-lat/long based on the Bessel ellipsoide (from old maps).
     * Parameter: projection (string). Must match if-statement.
     */
    GaussKreuger.prototype.swedish_params = function (projection) {
        // RT90 parameters, GRS 80 ellipsoid.
        if (projection == crs_projection_1.default.rt90_7_5_gon_v) {
            this._grs80_params();
            this._central_meridian = 11.0 + 18.375 / 60.0;
            this._scale = 1.000006000000;
            this._false_northing = -667.282;
            this._false_easting = 1500025.141;
        }
        else if (projection == crs_projection_1.default.rt90_5_0_gon_v) {
            this._grs80_params();
            this._central_meridian = 13.0 + 33.376 / 60.0;
            this._scale = 1.000005800000;
            this._false_northing = -667.130;
            this._false_easting = 1500044.695;
        }
        else if (projection == crs_projection_1.default.rt90_2_5_gon_v) {
            this._grs80_params();
            this._central_meridian = 15.0 + 48.0 / 60.0 + 22.624306 / 3600.0;
            this._scale = 1.00000561024;
            this._false_northing = -667.711;
            this._false_easting = 1500064.274;
        }
        else if (projection == crs_projection_1.default.rt90_0_0_gon_v) {
            this._grs80_params();
            this._central_meridian = 18.0 + 3.378 / 60.0;
            this._scale = 1.000005400000;
            this._false_northing = -668.844;
            this._false_easting = 1500083.521;
        }
        else if (projection == crs_projection_1.default.rt90_2_5_gon_o) {
            this._grs80_params();
            this._central_meridian = 20.0 + 18.379 / 60.0;
            this._scale = 1.000005200000;
            this._false_northing = -670.706;
            this._false_easting = 1500102.765;
        }
        else if (projection == crs_projection_1.default.rt90_5_0_gon_o) {
            this._grs80_params();
            this._central_meridian = 22.0 + 33.380 / 60.0;
            this._scale = 1.000004900000;
            this._false_northing = -672.557;
            this._false_easting = 1500121.846;
        }
        // SWEREF99TM and SWEREF99ddmm  parameters.
        else if (projection == crs_projection_1.default.sweref_99_tm) {
            this._sweref99_params();
            this._central_meridian = 15.00;
            this._scale = 0.9996;
            this._false_northing = 0.0;
            this._false_easting = 500000.0;
        }
        else if (projection == crs_projection_1.default.sweref_99_12_00) {
            this._sweref99_params();
            this._central_meridian = 12.00;
        }
        else if (projection == crs_projection_1.default.sweref_99_13_30) {
            this._sweref99_params();
            this._central_meridian = 13.50;
        }
        else if (projection == crs_projection_1.default.sweref_99_15_00) {
            this._sweref99_params();
            this._central_meridian = 15.00;
        }
        else if (projection == crs_projection_1.default.sweref_99_16_30) {
            this._sweref99_params();
            this._central_meridian = 16.50;
        }
        else if (projection == crs_projection_1.default.sweref_99_18_00) {
            this._sweref99_params();
            this._central_meridian = 18.00;
        }
        else if (projection == crs_projection_1.default.sweref_99_14_15) {
            this._sweref99_params();
            this._central_meridian = 14.25;
        }
        else if (projection == crs_projection_1.default.sweref_99_15_45) {
            this._sweref99_params();
            this._central_meridian = 15.75;
        }
        else if (projection == crs_projection_1.default.sweref_99_17_15) {
            this._sweref99_params();
            this._central_meridian = 17.25;
        }
        else if (projection == crs_projection_1.default.sweref_99_18_45) {
            this._sweref99_params();
            this._central_meridian = 18.75;
        }
        else if (projection == crs_projection_1.default.sweref_99_20_15) {
            this._sweref99_params();
            this._central_meridian = 20.25;
        }
        else if (projection == crs_projection_1.default.sweref_99_21_45) {
            this._sweref99_params();
            this._central_meridian = 21.75;
        }
        else if (projection == crs_projection_1.default.sweref_99_23_15) {
            this._sweref99_params();
            this._central_meridian = 23.25;
        }
        else {
            this._central_meridian = Number.MIN_VALUE;
        }
    };
    /** Sets of default parameters. */
    GaussKreuger.prototype._grs80_params = function () {
        this._axis = 6378137.0; // GRS 80.
        this._flattening = 1.0 / 298.257222101; // GRS 80.
        this._central_meridian = Number.MIN_VALUE;
    };
    /** Sets default parameters for sweref99. */
    GaussKreuger.prototype._sweref99_params = function () {
        this._axis = 6378137.0; // GRS 80.
        this._flattening = 1.0 / 298.257222101; // GRS 80.
        this._central_meridian = Number.MIN_VALUE;
        this._scale = 1.0;
        this._false_northing = 0.0;
        this._false_easting = 150000.0;
    };
    /** Conversion from geodetic coordinates to grid coordinates. */
    GaussKreuger.prototype.geodetic_to_grid = function (latitude, longitude) {
        var x_y = [0.0, 0.0];
        // Prepare ellipsoid-based stuff.
        var e2 = this._flattening * (2.0 - this._flattening);
        var n = this._flattening / (2.0 - this._flattening);
        var a_roof = this._axis / (1.0 + n) * (1.0 + n * n / 4.0 + n * n * n * n / 64.0);
        var A = e2;
        var B = (5.0 * e2 * e2 - e2 * e2 * e2) / 6.0;
        var C = (104.0 * e2 * e2 * e2 - 45.0 * e2 * e2 * e2 * e2) / 120.0;
        var D = (1237.0 * e2 * e2 * e2 * e2) / 1260.0;
        var beta1 = n / 2.0 - 2.0 * n * n / 3.0 + 5.0 * n * n * n / 16.0 + 41.0 * n * n * n * n / 180.0;
        var beta2 = 13.0 * n * n / 48.0 - 3.0 * n * n * n / 5.0 + 557.0 * n * n * n * n / 1440.0;
        var beta3 = 61.0 * n * n * n / 240.0 - 103.0 * n * n * n * n / 140.0;
        var beta4 = 49561.0 * n * n * n * n / 161280.0;
        // Convert.
        var deg_to_rad = Math.PI / 180.0;
        var phi = latitude * deg_to_rad;
        var lambda = longitude * deg_to_rad;
        var lambda_zero = this._central_meridian * deg_to_rad;
        var phi_star = phi - Math.sin(phi) * Math.cos(phi) * (A +
            B * Math.pow(Math.sin(phi), 2) +
            C * Math.pow(Math.sin(phi), 4) +
            D * Math.pow(Math.sin(phi), 6));
        var delta_lambda = lambda - lambda_zero;
        var xi_prim = Math.atan(Math.tan(phi_star) / Math.cos(delta_lambda));
        var eta_prim = this._math_atanh(Math.cos(phi_star) * Math.sin(delta_lambda));
        var x = this._scale * a_roof * (xi_prim +
            beta1 * Math.sin(2.0 * xi_prim) * this._math_cosh(2.0 * eta_prim) +
            beta2 * Math.sin(4.0 * xi_prim) * this._math_cosh(4.0 * eta_prim) +
            beta3 * Math.sin(6.0 * xi_prim) * this._math_cosh(6.0 * eta_prim) +
            beta4 * Math.sin(8.0 * xi_prim) * this._math_cosh(8.0 * eta_prim)) +
            this._false_northing;
        var y = this._scale * a_roof * (eta_prim +
            beta1 * Math.cos(2.0 * xi_prim) * this._math_sinh(2.0 * eta_prim) +
            beta2 * Math.cos(4.0 * xi_prim) * this._math_sinh(4.0 * eta_prim) +
            beta3 * Math.cos(6.0 * xi_prim) * this._math_sinh(6.0 * eta_prim) +
            beta4 * Math.cos(8.0 * xi_prim) * this._math_sinh(8.0 * eta_prim)) +
            this._false_easting;
        x_y[0] = Math.round((x * 1000.0)) / 1000.0;
        x_y[1] = Math.round((y * 1000.0)) / 1000.0;
        return new lat_lon_1.default(x_y[0], x_y[1]);
    };
    /** Conversion from grid coordinates to geodetic coordinates. */
    GaussKreuger.prototype.grid_to_geodetic = function (yLatitude, xLongitude) {
        if (this._central_meridian == Number.MIN_VALUE) {
            return new lat_lon_1.default(0.0, 0.0);
        }
        var lat_lon = [0.0, 0.0];
        // Prepare ellipsoid-based stuff.
        var e2 = this._flattening * (2.0 - this._flattening);
        var n = this._flattening / (2.0 - this._flattening);
        var a_roof = this._axis / (1.0 + n) * (1.0 + n * n / 4.0 + n * n * n * n / 64.0);
        var delta1 = n / 2.0 - 2.0 * n * n / 3.0 + 37.0 * n * n * n / 96.0 - n * n * n * n / 360.0;
        var delta2 = n * n / 48.0 + n * n * n / 15.0 - 437.0 * n * n * n * n / 1440.0;
        var delta3 = 17.0 * n * n * n / 480.0 - 37 * n * n * n * n / 840.0;
        var delta4 = 4397.0 * n * n * n * n / 161280.0;
        var Astar = e2 + e2 * e2 + e2 * e2 * e2 + e2 * e2 * e2 * e2;
        var Bstar = -(7.0 * e2 * e2 + 17.0 * e2 * e2 * e2 + 30.0 * e2 * e2 * e2 * e2) / 6.0;
        var Cstar = (224.0 * e2 * e2 * e2 + 889.0 * e2 * e2 * e2 * e2) / 120.0;
        var Dstar = -(4279.0 * e2 * e2 * e2 * e2) / 1260.0;
        // Convert.
        var deg_to_rad = Math.PI / 180;
        var lambda_zero = this._central_meridian * deg_to_rad;
        var xi = (yLatitude - this._false_northing) / (this._scale * a_roof);
        var eta = (xLongitude - this._false_easting) / (this._scale * a_roof);
        var xi_prim = xi -
            delta1 * Math.sin(2.0 * xi) * this._math_cosh(2.0 * eta) -
            delta2 * Math.sin(4.0 * xi) * this._math_cosh(4.0 * eta) -
            delta3 * Math.sin(6.0 * xi) * this._math_cosh(6.0 * eta) -
            delta4 * Math.sin(8.0 * xi) * this._math_cosh(8.0 * eta);
        var eta_prim = eta -
            delta1 * Math.cos(2.0 * xi) * this._math_sinh(2.0 * eta) -
            delta2 * Math.cos(4.0 * xi) * this._math_sinh(4.0 * eta) -
            delta3 * Math.cos(6.0 * xi) * this._math_sinh(6.0 * eta) -
            delta4 * Math.cos(8.0 * xi) * this._math_sinh(8.0 * eta);
        var phi_star = Math.asin(Math.sin(xi_prim) / this._math_cosh(eta_prim));
        var delta_lambda = Math.atan(this._math_sinh(eta_prim) / Math.cos(xi_prim));
        var lon_radian = lambda_zero + delta_lambda;
        var lat_radian = phi_star + Math.sin(phi_star) * Math.cos(phi_star) *
            (Astar +
                Bstar * Math.pow(Math.sin(phi_star), 2) +
                Cstar * Math.pow(Math.sin(phi_star), 4) +
                Dstar * Math.pow(Math.sin(phi_star), 6));
        lat_lon[0] = lat_radian * 180.0 / Math.PI;
        lat_lon[1] = lon_radian * 180.0 / Math.PI;
        return new lat_lon_1.default(lat_lon[0], lat_lon[1]);
    };
    GaussKreuger.prototype._math_sinh = function (value) {
        return 0.5 * (Math.exp(value) - Math.exp(-value));
    };
    GaussKreuger.prototype._math_cosh = function (value) {
        return 0.5 * (Math.exp(value) + Math.exp(-value));
    };
    GaussKreuger.prototype._math_atanh = function (value) {
        return 0.5 * Math.log((1.0 + value) / (1.0 - value));
    };
    return GaussKreuger;
}());
exports.default = GaussKreuger;
//# sourceMappingURL=gauss_kreuger.js.map