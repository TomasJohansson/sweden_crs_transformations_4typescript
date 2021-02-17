import CrsProjection from './crs_projection';
/** This function type definition is used for supporting a custom toString implementation */
declare type CrsCoordinateToString = (crsCoordinate: CrsCoordinate) => string;
declare type double = number;
declare type int = number;
/** Coordinate, defined by the three parameters for the constructor. */
export default class CrsCoordinate {
    readonly crsProjection: CrsProjection;
    readonly yLatitude: double;
    readonly xLongitude: double;
    /**
     * Private constructor. Client code must instead use the factory constructors.
     *
     * @param crsProjection - The coordinate reference system that defines the location
     *                        together with the other two properties (xLongitude and yLatitude).
     * @param yLatitude - The coordinate value representing the latitude or Y or Northing.
     * @param xLongitude - The coordinate value representing the longitude or X or Easting.
     */
    private constructor();
    /**
     * Static factory method for creating an instance.
     *
     * @param epsgNumber - The coordinate reference system that defines the location
     *                     together with the other two parameters (xLongitude and yLatitude).
     * @param yLatitude - The coordinate position value representing the latitude or Y or Northing
     * @param xLongitude - The coordinate position value representing the longitude or X or Easting
     */
    static createCoordinateByEpsgNumber(epsgNumber: int, yLatitude: double, xLongitude: double): CrsCoordinate;
    /**
     * Static factory method for creating an instance.
     *
     * @param crsProjection - The coordinate reference system that defines the location
     *                        together with the other two parameters.
     * @param yLatitude - The coordinate position value representing the latitude or Y or Northing
     * @param xLongitude - The coordinate position value representing the longitude or X or Easting
     */
    static createCoordinate(crsProjection: CrsProjection, yLatitude: double, xLongitude: double): CrsCoordinate;
    /**
     * Transforms the coordinate to another coordinate reference system.
     * @param targetCrsProjection - The coordinate reference system that you want to transform to.
     */
    transform(targetCrsProjection: CrsProjection): CrsCoordinate;
    /**
     * Transforms the coordinate to another coordinate reference system.
     *
     * @param targetEpsgNumber - The coordinate reference system that you want to transform to.
     */
    transformByEpsgNumber(targetEpsgNumber: int): CrsCoordinate;
    /**
     * Returns a string representation of the object.
     * See also the method {@link defaultToStringImplementation} or the type {@link CrsCoordinateToString}
     * and the method {@link setToStringImplementation} if you want to change to a custom implementation of toString.
     * @override
     */
    toString(): string;
    /** See also {@link CrsCoordinateToString} */
    static _toStringImplementation: CrsCoordinateToString;
    /**
     * Renders a coordinate as a string.
     * @param coordinate - The coordinate that should be rendered as a string.
     * @returns See below two examples of the string that can be returned:
     *    "CrsCoordinate [ Y: 6579457.649 , X: 153369.673 , CRS: SWEREF_99_18_00 ]"
     *    "CrsCoordinate [ Latitude: 59.330231 , Longitude: 18.059196 , CRS: WGS84 ]"
     */
    static defaultToStringImplementation(coordinate: CrsCoordinate): string;
    /**
     * Sets a custom method to be used for rendering an instance when the 'toString' method is used.
     * @param toStringImplementation - The custom method
     */
    static setToStringImplementation(toStringImplementation: CrsCoordinateToString): void;
    /**
     * Sets the default method to be used for rendering an instance when the 'toString' method is used.
     */
    static setToStringImplementationDefault(): void;
}
export {};
//# sourceMappingURL=crs_coordinate.d.ts.map