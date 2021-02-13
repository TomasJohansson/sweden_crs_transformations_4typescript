import CrsCoordinate from '../crs_coordinate';
import CrsProjection from '../crs_projection';
import TransformStrategy from './transform_strategy';
/**
 * Intended to be an internal class, i.e. not exported from the library
 * (i.e. not exported from the file 'src/index.ts')
 */
export default class TransformStrategy_from_SWEREF99_or_RT90_to_WGS84 implements TransformStrategy {
    /** @override */
    transform(sourceCoordinate: CrsCoordinate, targetCrsProjection: CrsProjection): CrsCoordinate;
}
//# sourceMappingURL=transform_strategy_from_sweref99_or_rt90_to_wgs84.d.ts.map