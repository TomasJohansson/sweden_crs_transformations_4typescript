/*
* https://github.com/TomasJohansson/sweden_crs_transformations_typescript
* Copyright (c) Tomas Johansson , http://www.programmerare.com
* The code in this 'sweden_crs_transformations_typescript' library is licensed with MIT.
* The library is based on the C#.NET library 'sweden_crs_transformations_4net' (https://github.com/TomasJohansson/sweden_crs_transformations_4net)
* and the Dart library 'sweden_crs_transformations_4dart' (https://github.com/TomasJohansson/sweden_crs_transformations_4dart)
* Both above libraries are based on the C#.NET library 'MightyLittleGeodesy' (https://github.com/bjornsallarp/MightyLittleGeodesy/) 
* which is also released with MIT.
* License information about 'sweden_crs_transformations_typescript' and 'MightyLittleGeodesy':
* https://github.com/TomasJohansson/sweden_crs_transformations_typescript/blob/typescript_SwedenCrsTransformations/LICENSE
*/

import CrsCoordinate from '../crs_coordinate';
import CrsProjection from '../crs_projection';
import TransformStrategy from './transform_strategy';
import Transformer from './transformer';

/** 
 * Intended to be an internal class, i.e. not exported from the library
 * (i.e. not exported from the file 'src/index.ts') 
 */
export default class TransFormStrategy_From_Sweref99OrRT90_to_WGS84_andThenToRealTarget implements TransformStrategy {
  // Precondition: sourceCoordinate must be CRS SWEREF99 or RT90
  
  /** @override */
  transform(
    sourceCoordinate: CrsCoordinate,
    targetCrsProjection: CrsProjection
  ): CrsCoordinate {
    const wgs84coordinate = Transformer.transform(sourceCoordinate, CrsProjection.wgs84);
    return Transformer.transform(wgs84coordinate, targetCrsProjection);
  }
}
