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

import CrsCoordinate from '../crs_coordinate';
import CrsProjection from '../crs_projection';
import TransformStrategy from './transform_strategy';
import GaussKreuger from '../mighty_little_geodesy/gauss_kreuger';
import LatLon from '../mighty_little_geodesy/lat_lon';

/** 
 * Intended to be an internal class, i.e. not exported from the library
 * (i.e. not exported from the file 'src/index.ts') 
 */
export default class TransformStrategy_from_WGS84_to_SWEREF99_or_RT90 implements TransformStrategy {
  // Precondition: sourceCoordinate must be CRS WGS84
  
  /** @override */
  transform(
    sourceCoordinate: CrsCoordinate,
    targetCrsProjection: CrsProjection
  ): CrsCoordinate {
    const gkProjection = new GaussKreuger();
    gkProjection.swedish_params(targetCrsProjection);
    const latLon: LatLon = gkProjection.geodetic_to_grid(sourceCoordinate.yLatitude, sourceCoordinate.xLongitude);
    return CrsCoordinate.createCoordinate(targetCrsProjection, latLon.yLatitude, latLon.xLongitude);
  }
}
