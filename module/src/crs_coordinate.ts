/*
* Copyright (c) Tomas Johansson , http://www.programmerare.com
* The code in this library is licensed with MIT.
* The library is based on the C#.NET library 'sweden_crs_transformations_4net' (https://github.com/TomasJohansson/sweden_crs_transformations_4net)
* which in turn is based on 'MightyLittleGeodesy' (https://github.com/bjornsallarp/MightyLittleGeodesy/) 
* which is also released with MIT.
* License information about 'sweden_crs_transformations_4dart' and 'MightyLittleGeodesy':
* https://github.com/TomasJohansson/sweden_crs_transformations_4dart/blob/dart_SwedenCrsTransformations/LICENSE
* For more information see the webpage below.
* https://github.com/TomasJohansson/sweden_crs_transformations_4dart
*/

import CrsProjection from './crs_projection';
import Transformer from './transformation/transformer';
//import 'transformation/transformer.dart';

/// Used for supporting a custom toString implementation
type CrsCoordinateToString = (crsCoordinate: CrsCoordinate) => string;
type double = number;
type int = number;


/// Coordinate, defined by the three parameters for the factory methods.
export default class CrsCoordinate {

  // /// The coordinate reference system that defines the location together with the other two properties (xLongitude and yLatitude).
  // readonly crsProjection: CrsProjection;

  // /// The coordinate value representing the longitude or X or Easting.
  // readonly xLongitude: double;

  // /// The coordinate value representing the latitude or Y or Northing.
  // readonly yLatitude: double;

  // -----------------------------------------------
  // Three constructors (one private, and two public factory constructors):

  /// Private constructor. Client code must instead use the factory constructors.
  private constructor(
    readonly crsProjection: CrsProjection,
    readonly yLatitude: double,
    readonly xLongitude: double
  ) {}

  /// Factory constructor for creating an instance.
  /// [epsgNumber] represents the coordinate reference system that defines the location together with the other two parameters.
  /// [xLongitude] is the coordinate position value representing the longitude or X or Easting
  /// [yLatitude] is the coordinate position value representing the latitude or Y or Northing
  static createCoordinateByEpsgNumber(
    epsgNumber: int,
    yLatitude: double,
    xLongitude: double
  ): CrsCoordinate {
    const crsProjection: CrsProjection = CrsProjection.getCrsProjectionByEpsgNumber(epsgNumber);
    return CrsCoordinate.createCoordinate(crsProjection, yLatitude, xLongitude);
  }

  /// Factory constructor for creating an instance.
  /// [crsProjection] represents the coordinate reference system that defines the location together with the other two parameters.
  /// [xLongitude] is the coordinate position value representing the longitude or X or Easting
  /// [yLatitude] is the coordinate position value representing the latitude or Y or Northing
  /// See also [CrsProjection]
  static createCoordinate(
    crsProjection: CrsProjection,
    yLatitude: double,
    xLongitude: double
  ): CrsCoordinate {
    return new CrsCoordinate(crsProjection, yLatitude, xLongitude);
  }
  // -----------------------------------------------


  /// Transforms the coordinate to another coordinate reference system.
  /// [targetCrsProjection] represents the coordinate reference system that you want to transform to.
  transform(targetCrsProjection: CrsProjection): CrsCoordinate {
    return Transformer.transform(this, targetCrsProjection);
  }

  /// Transforms the coordinate to another coordinate reference system.
  /// [targetEpsgNumber] represents the coordinate reference system that you want to transform to.
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


  /// Returns a string representation of the object.
  /// See also the method [defaultToStringImplementation] or the type [CrsCoordinateToString] 
  /// and the method [setToStringImplementation] if you want to change to a custom implementation of toString.
  // @override
  toString(): string {
    return CrsCoordinate._toStringImplementation(this);
  }

  /// See also [CrsCoordinateToString]
  static _toStringImplementation: CrsCoordinateToString = CrsCoordinate.defaultToStringImplementation;

  /// Two examples of the string that can be returned:
  /// "CrsCoordinate [ Y: 6579457.649 , X: 153369.673 , CRS: SWEREF_99_18_00 ]"
  /// "CrsCoordinate [ Latitude: 59.330231 , Longitude: 18.059196 , CRS: WGS84 ]"
  static defaultToStringImplementation(coordinate: CrsCoordinate): string {
    const isWgs84 =  coordinate.crsProjection.isWgs84();
    const yOrLatitude = isWgs84 ? 'Latitude' : 'Y';
    const  xOrLongitude = isWgs84 ? 'Longitude' : 'X';
    return `CrsCoordinate [ ${yOrLatitude}: ${coordinate.yLatitude} , ${xOrLongitude}: ${coordinate.xLongitude} , CRS: ${coordinate.crsProjection.getAsString()} ]`;
  }

  /// Sets a custom method to be used for rendering an instance when the 'toString' method is used.
  static setToStringImplementation(toStringImplementation: CrsCoordinateToString): void {
    CrsCoordinate._toStringImplementation = toStringImplementation;
  }  

  /// Sets the default method to be used for rendering an instance when the 'ToString' method is used.
  static setToStringImplementationDefault(): void { 
    CrsCoordinate._toStringImplementation = CrsCoordinate.defaultToStringImplementation;
  }

}