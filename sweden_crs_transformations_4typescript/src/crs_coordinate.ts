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

import CrsProjection from './crs_projection';
import Transformer from './transformation/transformer';

/** This function type definition is used for supporting a custom toString implementation */
type CrsCoordinateToString = (crsCoordinate: CrsCoordinate) => string;

type double = number;
type int = number;

/** Coordinate, defined by the three parameters for the constructor. */
export default class CrsCoordinate {

  /**
   * Private constructor. Client code must instead use the factory constructors.
   * 
   * @param crsProjection - The coordinate reference system that defines the location 
   *                        together with the other two properties (xLongitude and yLatitude).
   * @param yLatitude - The coordinate value representing the latitude or Y or Northing.
   * @param xLongitude - The coordinate value representing the longitude or X or Easting.
   */
  private constructor(
    readonly crsProjection: CrsProjection,
    readonly yLatitude: double,
    readonly xLongitude: double
  ) {}

  /**
   * Static factory method for creating an instance.
   * 
   * @param epsgNumber - The coordinate reference system that defines the location 
   *                     together with the other two parameters (xLongitude and yLatitude).
   * @param yLatitude - The coordinate position value representing the latitude or Y or Northing
   * @param xLongitude - The coordinate position value representing the longitude or X or Easting
   */
  static createCoordinateByEpsgNumber(
    epsgNumber: int,
    yLatitude: double,
    xLongitude: double
  ): CrsCoordinate {
    const crsProjection: CrsProjection = CrsProjection.getCrsProjectionByEpsgNumber(epsgNumber);
    return CrsCoordinate.createCoordinate(crsProjection, yLatitude, xLongitude);
  }

  /**
   * Static factory method for creating an instance.
   * 
   * @param crsProjection - The coordinate reference system that defines the location 
   *                        together with the other two parameters.
   * @param yLatitude - The coordinate position value representing the latitude or Y or Northing
   * @param xLongitude - The coordinate position value representing the longitude or X or Easting
   */
  static createCoordinate(
    crsProjection: CrsProjection,
    yLatitude: double,
    xLongitude: double
  ): CrsCoordinate {
    return new CrsCoordinate(crsProjection, yLatitude, xLongitude);
  }
  // -----------------------------------------------

  /**
   * Transforms the coordinate to another coordinate reference system.
   * @param targetCrsProjection - The coordinate reference system that you want to transform to.
   */
  transform(targetCrsProjection: CrsProjection): CrsCoordinate {
    return Transformer.transform(this, targetCrsProjection);
  }

  /**
   * Transforms the coordinate to another coordinate reference system.
   * 
   * @param targetEpsgNumber - The coordinate reference system that you want to transform to.
   */
  transformByEpsgNumber(targetEpsgNumber: int): CrsCoordinate {
    const targetCrsProjection: CrsProjection = CrsProjection.getCrsProjectionByEpsgNumber(targetEpsgNumber);
    return this.transform(targetCrsProjection);
  }

  // Two methods/properties from Dart below  ('operator ==' and 'hashCode') 
  // @override
  // bool operator ==(Object other) {
  //   if (identical(this, other)) return true; // Checks whether two references are to the same object.
  //   return (other is CrsCoordinate) && 
  //       crsProjection == other.crsProjection &&
  //       xLongitude == other.xLongitude &&
  //       yLatitude == other.yLatitude;
  // }
  // // Regarding the missing (i.e. not implemented or overridden here) method "!=" it is "just syntactic sugar.
  // //  For example, the expression e1 != e2 is syntactic sugar for !(e1 == e2).""
  // // quoted from https://dart.dev/guides/language/language-tour#methods

  // @override
  // int get hashCode {
  //   var result = xLongitude.hashCode;
  //   result = 31 * result + yLatitude.hashCode;
  //   result = 31 * result + crsProjection.hashCode;
  //   return result;
  // }  


  /**
   * Returns a string representation of the object.
   * See also the method {@link defaultToStringImplementation} or the type {@link CrsCoordinateToString}
   * and the method {@link setToStringImplementation} if you want to change to a custom implementation of toString.
   * @override
   */
  toString(): string {
    return CrsCoordinate._toStringImplementation(this);
  }

  /** See also {@link CrsCoordinateToString} */
  static _toStringImplementation: CrsCoordinateToString = CrsCoordinate.defaultToStringImplementation;

  /** 
   * Renders a coordinate as a string.
   * @param coordinate - The coordinate that should be rendered as a string.
   * @returns See below two examples of the string that can be returned:
   *    "CrsCoordinate [ Y: 6579457.649 , X: 153369.673 , CRS: SWEREF_99_18_00 ]"
   *    "CrsCoordinate [ Latitude: 59.330231 , Longitude: 18.059196 , CRS: WGS84 ]"
   */
  static defaultToStringImplementation(coordinate: CrsCoordinate): string {
    const isWgs84 =  coordinate.crsProjection.isWgs84();
    const yOrLatitude = isWgs84 ? 'Latitude' : 'Y';
    const  xOrLongitude = isWgs84 ? 'Longitude' : 'X';
    return `CrsCoordinate [ ${yOrLatitude}: ${coordinate.yLatitude} , ${xOrLongitude}: ${coordinate.xLongitude} , CRS: ${coordinate.crsProjection.getAsString()} ]`;
  }

  /**
   * Sets a custom method to be used for rendering an instance when the 'toString' method is used.
   * @param toStringImplementation - The custom method
   */
  static setToStringImplementation(toStringImplementation: CrsCoordinateToString): void {
    CrsCoordinate._toStringImplementation = toStringImplementation;
  }  

  /**
   * Sets the default method to be used for rendering an instance when the 'toString' method is used.
   */
  static setToStringImplementationDefault(): void { 
    CrsCoordinate._toStringImplementation = CrsCoordinate.defaultToStringImplementation;
  }

}