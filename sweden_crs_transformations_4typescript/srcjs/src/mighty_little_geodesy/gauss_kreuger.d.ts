import CrsProjection from '../crs_projection';
import LatLon from './lat_lon';
declare type double = number;
export default class GaussKreuger {
    private _axis;
    private _flattening;
    private _central_meridian;
    private _scale;
    private _false_northing;
    private _false_easting;
    /**
     * Parameters for RT90 and SWEREF99TM.
     * Note: Parameters for RT90 are choosen to eliminate the
     * differences between Bessel and GRS80-ellipsoides.
     * Bessel-variants should only be used if lat/long are given as
     * RT90-lat/long based on the Bessel ellipsoide (from old maps).
     * Parameter: projection (string). Must match if-statement.
     */
    swedish_params(projection: CrsProjection): void;
    /** Sets of default parameters. */
    _grs80_params(): void;
    /** Sets default parameters for sweref99. */
    _sweref99_params(): void;
    /** Conversion from geodetic coordinates to grid coordinates. */
    geodetic_to_grid(latitude: double, longitude: double): LatLon;
    /** Conversion from grid coordinates to geodetic coordinates. */
    grid_to_geodetic(yLatitude: double, xLongitude: double): LatLon;
    _math_sinh(value: double): double;
    _math_cosh(value: double): double;
    _math_atanh(value: double): double;
}
export {};
//# sourceMappingURL=gauss_kreuger.d.ts.map