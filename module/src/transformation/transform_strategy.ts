/*
// TODO update the below Dart comments for this TypeScript project (ported from Dart/C#)
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

import CrsCoordinate from '../crs_coordinate';
import CrsProjection from '../crs_projection';

/// Intended to be an internal class, i.e. not exported from the library (i.e. in the file 'sweden_crs_transformations_4dart.dart')
export default interface TransformStrategy {

  /// Transforms a [sourceCoordinate] (which includes the coordinate reference system as a property)
  /// to a coordinate in another coordinate reference system i.e. the [targetCrsProjection]  
  transform(
    sourceCoordinate: CrsCoordinate,
    targetCrsProjection: CrsProjection
  ): CrsCoordinate;
}
